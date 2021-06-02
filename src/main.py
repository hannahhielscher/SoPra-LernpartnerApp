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

profil = api.inherit('Profil', nbo, {
    'hochschule': fields.String(attribute='_hochschule', description='Hochschule der Person'),
    'studiengang': fields.String(attribute='_studiengang', description='Studiengang der Person'),
    'semester': fields.Integer(attribute='_semester', description='Semester der Person'),
    'lernfaecher': fields.String(attribute='_lernfaecher', description='Lernfächer der Person'),
})

vorschlag = api.inherit('Vorschlag', nbo, {
    'match_quote': fields.String(attribute='_match_quote', description='Prozentzahl des Matches'),
    'profil_id': fields.Integer(attribute='_profil_id', description='Profil ID der Person'),
})

nachricht = api.inherit('Nachricht', nbo, {
    'inhalt': fields.String(attribute='_inhalt', description='Inhalt der Nachricht'),
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
class Profil>Operationen(Resource):
    @lernApp.marshal_list_with(profile)
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

@lernApp.route('/vorschlaege')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VorschlaegeListOperations(Resource):
    @banking.marshal_list_with(vorschlaege)
    @secured
    def get(self):
        """Auslesen aller Vorschlag-Objekte.

        Sollten kein Vorschlag-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        vorschlaege = adm.get_all_vorschlaege()
        return vorschlaege

    @secured
    def put(self):
        """Update des Vorschlag-Objekts."""

        personId = request.args.get("id")
        name = request.args.get("name")
        vorname = request.args.get("vorname")

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

    @lernApp.marshal_with(vorschlag, code=200)
    @secured
    def post(self):
        """Anlegen eines neuen Vorschlag-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = AppAdministration()

        proposal = Vorschlag.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.match_berechnen(proposal.get_match_quote(), proposal.get_person_id())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@learnApp.route('/nachricht')
@learnApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtListOperation(Resource):

    @learnApp.marshal_list_with(nachricht)
    def get(self):
        """Auslesen aller Nachrichten-Objekte.

        Sollten keine Nachrichten-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        nachricht = adm.get_all_nachrichten()
        return nachricht

    @learnApp.marshal_list_with(nachricht, envelope='response')
    def post(self):
        """Anlegen eines neuen Nachrichtenobjekts."""
        adm = AppAdministration()
        n = nachricht.from_dict(api.payload) #api.payload?

        if n is not None:
            insert_n = adm.create_nachricht(n)
            nachricht = adm.get_nachricht_by_id(insert_n.get_id())
            return nachricht, 200
        else:
            return '', 500


@learnApp.route('/nachricht/<int:id>')
@learnApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtOperation(Resource):

    @learnApp.marshal_with(nachricht)
    def get (self, id):
        """Auslesen einer bestimmten Nachricht."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_id(id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.


    @learnApp.marshal_with(nachricht)
    def put(self, id):
        """Update eines bestimmten Nachrichtenenobjekts."""
        adm = AppAdministration()
        nachr = nachricht.from_dict(api.payload) #was anderes statt payload

        if nachr is not None:
            nachr.set_id(id)
            adm.save_nachricht(nachr)
            nachricht = adm.get_nachricht_by_id(id)
            return nachricht, 200
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

    @learnApp.marshal_with(nachricht)
    def delete(self, id):
        """Löschen eines bestimmten Nachrichtenobjekts."""
        adm = AppAdministration()
        na = adm.get_nachricht_by_id(id)
        adm.delete_nachricht(na)
        return '', 200

    @learnApp.marshal_with(nachricht)
    def post(self, id):
        """Anlegen/schreiben einer Nachricht."""
        adm = AppAdministration()
        n = pra.get_person_by_id(id)

        if n is not None:
            result = adm.create_nachricht(n)
            return result
        else:
            return "", 500

@learnApp.route('/nachricht-by-inhalt/<string:inhalt>')
@learnApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByInhaltOperation(Resource):

    @learnApp.marshal_with(nachricht)
    def get (self, inhalt):
        """Auslesen einer bestimmten Nachricht anhand des Inhalts."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_inhalt(inhalt)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

# noch nachricht-by-profil-id und nachricht-by-person-id?

if __name__ == '__main__':
    app.run(debug=True)