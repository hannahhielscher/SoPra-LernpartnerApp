# Die LernpartnerApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request
import json

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.AppAdministration import AppAdministration
from server.bo.TeilnahmeGruppe import TeilnahmeGruppe
from server.bo.TeilnahmeChat import TeilnahmeChat
from server.bo.Vorschlag import Vorschlag
from server.bo.Nachricht import Nachricht
from server.bo.Lernvorlieben import Lernvorlieben
from server.bo.Konversation import Konversation

#SecurityDecorator
from SecurityDecorator import secured

class NullableInteger(fields.Integer):
    """Diese Klasse ermöglicht die Umsetzung eines Integers, welcher auch den Wert null bzw. None haben kann 
    """
    __schema_type__ = ['integer', 'null']
    __schema_example__ = 'nullable integer'

"""Flask wird hiermit instanziert"""
app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/lernApp/*': {"origins": "*"}})

api = Api(app, version='1.0', title='lernApp API',
          description='Web App for meeting StudyBuddys for university')

"""Namespaces"""
lernApp = api.namespace('lernApp', description='Functions of lernApp')

"""Hier wird definiert, wie die Businessobjects beim Marshelling definiert 
werden sollen"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID des BOs'),
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

person = api.inherit('Person', nbo, {
    'vorname': fields.String(attribute='_vorname', description='Vorname der Person'),
    'semester': fields.String(attribute='_semester', description='Semester der Person'),
    'alter': fields.Integer(attribute='_alter', description='Alter der Person'),
    'geschlecht': fields.String(attribute='_geschlecht', description='Geschlecht der Person'),
    'lerngruppe': fields.String(attribute='_lerngruppe', description='Lerngruppe der Person'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google user ID der Person'),
    'email': fields.String(attribute='_email', description='Email der Person'),
    'personenprofil': fields.Integer(attribute='_personenprofil', description='Profil ID der Person'),
})

profil = api.inherit('Profil', bo, {
    'studiengang': fields.String(attribute='_studiengang', description='Studiengang der Person'),
    'semester': fields.String(attribute='_semester', description='Semester der Person'),
    'lernfaecher': fields.Integer(attribute='_lernfaecher', description='Lernfaecher der Person'),
    'lernvorlieben': fields.String(attribute='_lernvorlieben', description='Lernvorlieben der Person'),
})

lerngruppe = api.inherit('Lerngruppe', nbo, {
    'gruppenprofil': fields.Integer(attribute='_gruppenprofil', description='Profil ID der Lerngruppe'),
})

vorschlag = api.inherit('Vorschlag', bo, {
    'match_quote': fields.String(attribute='_match_quote', description='Prozentzahl des Matches'),
    'profil_id': fields.Integer(attribute='_profil_id', description='Profil ID der Person'),
})

nachricht = api.inherit('Nachricht', bo, {
    'inhalt': fields.String(attribute='_inhalt', description='Inhalt der Nachricht'),
})

konversation = api.inherit('Konversation', bo, {
    'nachrichten': fields.String(attribute='_nachrichten', description='Enthaltene Nachrichten der Konversation'),
    'teilnehmer': fields.String(attribute='_teilnehmer', description='Enthaltene Teilnehmer der Konversation'),
})

teilnahmechat = api.inherit('TeilnahmeChat', bo, {
    'teilnehmer': fields.String(attribute='_teilnehmer', description='Enthaltene Teilnehmer des (Gruppen-)Chats'),
    'konversation': fields.String(attribute='_konversation', description='Konversation des (Gruppen-)Chats'),
})

lernvorlieben = api.inherit('Lernvorlieben', bo, {
    'tageszeiten': fields.String(attribute='_tageszeiten', description='Vorname der Person'),
    'tage': fields.String(attribute='_tage', description='Semester der Person'),
    'frequenz': fields.Integer(attribute='_frequenz', description='Alter der Person'),
    'lernart': fields.String(attribute='_lernart', description='Geschlecht der Person'),
    'gruppengroesse': fields.String(attribute='_gruppengroesse', description='Lerngruppe der Person'),
    'lernort': fields.String(attribute='_lernort', description='Google user ID der Person'),
})

@lernApp.route('/person/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByIDOperationen(Resource):
    @lernApp.marshal_list_with(person)
   
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        person = adm.get_person_by_id(id)
        return person

@lernApp.route('/personen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperationen(Resource):
    @lernApp.marshal_list_with(person)
    
    @secured
    def get(self):
        """Auslesen aller Personen-Objekte.
        Sollten keine Personen-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        persons = adm.get_all_persons()
        return persons

    @secured
    def put(self):
        """Update des Personen-Objekts."""

        personId = request.args.get("id")
        name = request.args.get("name")
        vorname = request.args.get("vorname")
        semester = request.args.get("semester")
        alter = request.args.get("alter")
        geschlecht = request.args.get("geschlecht")
        lerngruppe = request.args.get("lerngruppe")
        email = request.args.get("email")
        adm = AppAdministration()
        user = adm.get_person_by_id(personId)
        user.set_name(name)
        user.set_vorname(vorname)
        user.set_semester(semester)
        user.set_alter(alter)
        user.set_geschlecht(geschlecht)
        user.set_lerngruppe(lerngruppe)
        user.set_email(email)
        adm.update_person_by_id(user)

@lernApp.route('/personbygoogle/<string:google_user_id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByGoogleIDOperationen(Resource):
    @lernApp.marshal_list_with(person)
    
    @secured
    def get(self, google_user_id):
        """Auslesen eines bestimmten User-Objekts.
        Das auszulesende Objekt wird durch die google_user_id in dem URI bestimmt.
        """
        adm = AppAdministration()
        person = adm.get_person_by_google_user_id(google_user_id)
        return person

@lernApp.route('/profil/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilByIDOperationen(Resource):
    @lernApp.marshal_list_with(profil)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Profil-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        profil = adm.get_profil_by_id(id)
        return profil

@lernApp.route('/profile')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilOperationen(Resource):
    @lernApp.marshal_list_with(profil)
    @secured
    def get(self):
        """Auslesen aller Profil-Objekte.
        Sollte kein Profil-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        profile = adm.get_all_profil()
        return profile

    @secured
    def put(self):
        """Update des Profil-Objekts."""

        profilId = request.args.get("id")
        hochschule = request.args.get("hochschule")
        semester = request.args.get("semester")
        studiengang = request.args.get("studiengang")
        lernfaecher = request.args.get("lernfaecher")

        adm = AppAdministration()
        profil = adm.get_profil_by_id(profilId)
        profil.set_hochschule(hochschule)
        profil.set_semester(semester)
        profil.set_studiengang(studiengang)
        profil.set_lernfaecher(lernfaecher)

        adm.update_profil_by_id(profil)


@lernApp.route('/lerngruppe/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LerngruppeByIDOperationen(Resource):
    @lernApp.marshal_list_with(lerngruppe)
   
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Lerngruppen-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        lerngruppe = adm.get_lerngruppe_by_id(id)
        return lerngruppe

@lernApp.route('/lerngruppen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LerngruppeOperationen(Resource):
    @lernApp.marshal_list_with(lerngruppen)
    
    @secured
    def get(self):
        """Auslesen aller Lerngruppen-Objekte.
        Sollten keine Lerngruppen-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        lerngruppen = adm.get_all_lerngruppen()
        return lerngruppen

    @secured
    def put(self):
        """Update des Lerngruppen-Objekts."""

        lerngruppeId = request.args.get("id")
        name = request.args.get("name")
    
        adm = AppAdministration()
        gruppe = adm.get_lerngruppe_by_id(lerngruppenId)
        gruppe.set_name(name)
        adm.update_lerngruppe_by_id(gruppe)



@lernApp.route('/vorschlag/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VorschlagByIDOperationen(Resource):
    @lernApp.marshal_list_with(vorschlag)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Vorschlag-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        vorschlag = adm.get_vorschlag_by_id(id)
        return vorschlag

    @secured
    def put(self):
        """Update des Vorschlag-Objekts."""
        vorschlagId = request.args.get("id")
        main_person_id = request.args.get("main_person_id")
        match_quote = request.args.get("match_quote")
        lernfach = request.args.get("lernfach")
        person_id = request.args.get("person_id")

        adm = AppAdministration()
        vorschlag = adm.get_profil_by_id(vorschlagId)
        vorschlag.set_hochschule(main_person_id)
        vorschlag.set_semester(match_quote)
        vorschlag.set_studiengang(lernfach)
        vorschlag.set_lernfaecher(person_id)

        adm.update_vorschlag_by_id(vorschlag)

    def delete(self, id):
        """Löschen eines bestimmten Nachrichtenobjekts."""
        adm = AppAdministration()
        vorschlag = adm.get_vorschlag_by_id(id)
        adm.delete_nachricht(vorschlag)
        return '', 200

@lernApp.route('/vorschlaege')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VorschlaegeListOperations(Resource):
    @lernApp.marshal_list_with(vorschlag)
    @secured
    def get(self):
        """Auslesen aller Vorschlag-Objekte.

        Sollten kein Vorschlag-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        vorschlaege = adm.get_all_vorschlaege()
        return vorschlaege


@lernApp.route('/nachricht')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtListOperation(Resource):

    @lernApp.marshal_list_with(nachricht)
    def get(self):
        """Auslesen aller Nachrichten-Objekte.

        Sollten keine Nachrichten-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        nachricht = adm.get_all_nachrichten()
        return nachricht

    @lernApp.marshal_list_with(nachricht, envelope='response')
    def post(self):
        """Anlegen eines neuen Nachrichtenobjekts."""
        adm = AppAdministration()
        n = nachricht.from_dict(api.payload)

        if n is not None:
            insert_n = adm.create_nachricht(n)
            nachricht = adm.get_nachricht_by_id(insert_n.get_id())
            return nachricht, 200
        else:
            return '', 500


@lernApp.route('/nachricht/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtOperation(Resource):

    @lernApp.marshal_with(nachricht)
    def get (self, id):
        """Auslesen einer bestimmten Nachricht."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_id(id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.


    @lernApp.marshal_with(nachricht)
    def put(self, id):
        """Update eines bestimmten Nachrichtenenobjekts."""
        adm = AppAdministration()
        nachr = nachricht.from_dict(api.payload)

        if nachr is not None:
            nachr.set_id(id)
            adm.save_nachricht(nachr)
            nachricht = adm.get_nachricht_by_id(id)
            return nachricht, 200
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

    @lernApp.marshal_with(nachricht)
    def delete(self, id):
        """Löschen eines bestimmten Nachrichtenobjekts."""
        adm = AppAdministration()
        na = adm.get_nachricht_by_id(id)
        adm.delete_nachricht(na)
        return '', 200

    @lernApp.marshal_with(nachricht)
    def post(self, id):
        """Anlegen/schreiben einer Nachricht."""
        adm = AppAdministration()
        n = adm.get_nachricht_by_id(id)

        if n is not None:
            result = adm.create_nachricht(n)
            return result
        else:
            return "", 500

@lernApp.route('/nachricht-by-inhalt/<string:inhalt>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByInhaltOperation(Resource):

    @lernApp.marshal_with(nachricht)
    def get (self, inhalt):
        """Auslesen einer bestimmten Nachricht anhand des Inhalts."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_inhalt(inhalt)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

@lernApp.route('/nachricht-by-person-id/<string:person_id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByPersonIdOperation(Resource):

    @lernApp.marshal_with(nachricht)
    def get (self, person_id):
        """Auslesen einer bestimmten Nachricht anhand der Id der Person."""
        adm = AppAdministration()
        message = adm.get_nachricht_by_person_id(person_id)

        if message is not None:
            return message
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

@lernApp.route('/nachricht-by-profil-id/<string:profil_id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByProfilIdOperation(Resource):

    @lernApp.marshal_with(nachricht)
    def get (self, profil_id):
        """Auslesen einer bestimmten Nachricht anhand der Id des Profils."""
        adm = AppAdministration()
        mes = adm.get_nachricht_by_profil_id(profil_id)

        if mes is not None:
            return mes
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

@lernApp.route('/konversation')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationListOperation(Resource):

    @lernApp.marshal_list_with(konversation)
    def get(self):
        """Auslesen aller Konversations-Objekte.

        Sollten keine Konversations-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        konversation = adm.get_all_konversationen()
        return konversation


@lernApp.route('/konversation/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationOperation(Resource):

    @lernApp.marshal_with(konversation)
    def get (self, id):
        """Auslesen einer bestimmten Konversation."""
        adm = AppAdministration()
        konversation = adm.get_konversation_by_id(id)

        if konversation is not None:
            return konversation
        else:
            return '', 500 #Wenn es keine Konversation mit der id gibt.



    @lernApp.marshal_with(konversation)
    def put(self, id):
        """Update eines bestimmten Konversationobjekts."""
        adm = AppAdministration()
        konv = konversation.from_dict(api.payload)

        if konv is not None:
            konv.set_id(id)
            adm.save_konversation(konv)
            konversation = adm.get_konversation_by_id(id)
            return konversation, 200
        else:
            return '', 500  # Wenn es keine Konversation mit der id gibt.

    @lernApp.marshal_with(konversation)
    def delete(self, id):
        """Löschen eines bestimmten Konversationobjekts."""
        adm = AppAdministration()
        k = adm.get_konversation_by_id(id)
        adm.delete_konversation(k)
        return '', 200

    @lernApp.marshal_with(konversation)
    def post(self, id):
        """Anlegen einer Konversation."""
        adm = AppAdministration()
        ko = adm.get_konversation_by_id(id)

        if ko is not None:
            result = adm.create_konversation(ko)
            return result
        else:
            return "", 500


@lernApp.route('/nachrichten-by-id/<string:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByIdOperation(Resource):

    @lernApp.marshal_with(konversation)
    def get(self, id):
        """Auslesen einer bestimmten Nachricht anhand der Id."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_id(id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500  # Wenn es keine Nachricht mit der id gibt.

@lernApp.route('/teilnehmer-by-id/<string:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnehmerByIdOperation(Resource):

    @lernApp.marshal_with(konversation)
    def get(self, id):
        """Auslesen einer bestimmten Teilnahme anhand der Id."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahme_by_id(id)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.


@lernApp.route('/lernvorlieben/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LernvorliebenByIDOperationen(Resource):
    @lernApp.marshal_list_with(lernvorlieben)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Lernvorlieben-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        lernvorlieben = adm.get_lernvorlieben_by_id(id)
        return lernvorlieben

@lernApp.route('/lernvorlieben')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LernvorliebenOperationen(Resource):
    @lernApp.marshal_list_with(lernvorlieben)

    @secured
    def put(self):
        """Update des Lernvorlieben-Objekts."""

        lernvorliebenId = request.args.get("id")
        tageszeiten = request.args.get("tageszeiten")
        tage = request.args.get("tage")
        frequenz = request.args.get("frequenz")
        lernart = request.args.get("lernart")
        gruppengroesse = request.args.get("gruppengroesse")
        lernort = request.args.get("lernort")
        adm = AppAdministration()
        lernvorlieben = adm.get_lernvorlieben_by_id(lernvorliebenId)
        lernvorlieben.set_tageszeiten(tageszeiten)
        lernvorlieben.set_tage(tage)
        lernvorlieben.set_frequenz(frequenz)
        lernvorlieben.set_lernart(lernart)
        lernvorlieben.set_gruppengroesse(gruppengroesse)
        lernvorlieben.set_lernort(lernort)
        adm.update_lernvorlieben_by_id(lernvorlieben)

if __name__ == '__main__':
    app.run(debug=True)