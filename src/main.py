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
from server.bo.Profil import Profil

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
    'studiengang': fields.String(attribute='_studiengang', description='Studiengang der Person'),
    'alter': fields.Integer(attribute='_alter', description='Alter der Person'),
    'geschlecht': fields.String(attribute='_geschlecht', description='Geschlecht der Person'),
    'lerngruppe': fields.String(attribute='_lerngruppe', description='Lerngruppe der Person'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google user ID der Person'),
    'email': fields.String(attribute='_email', description='Email der Person'),
    'personenprofil': fields.Integer(attribute='_personenprofil', description='Profil ID der Person'),
})

profil = api.inherit('Profil', bo, {
    #hier String oder Boolean?
    'gruppe': fields.String(attribute='_gruppe', description='Teilnahme an einer Gruppe'),
    'lernfaecher': fields.List(cls_or_instance=fields.Integer, attribute='_lernfaecher', description='Lernfaecher der Person'),
    #'lernfaecher': fields.String(attribute='_lernfaecher', description='Lernfaecher der Person'),
    'lernvorlieben': fields.Integer(attribute='_lernvorlieben', description='Lernvorlieben der Person'),
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
    'teilnehmer': fields.Integer(attribute='_teilnehmer', description='ID des Teilnehmers'),
    'konversation': fields.Integer(attribute='_konversation', description='ID der Konversation'),
})

teilnahmegruppe = api.inherit('TeilnahmeGruppe', bo, {
    'teilnehmer': fields.Integer(attribute='_teilnehmer', description='ID des Teilnehmers'),
    'lerngruppe': fields.Integer(attribute='_teilnehmer', description='ID der Lerngruppe')
})

lernvorlieben = api.inherit('Lernvorlieben', bo, { #String oder Boolean?
    'tageszeiten': fields.String(attribute='_tageszeiten', description='Bevorzugte Tageszeit'),
    'tage': fields.String(attribute='_tage', description='Bevorzugte Tage'),
    'frequenz': fields.String(attribute='_frequenz', description='Bevorzugte Frequenz'),
    'lernart': fields.String(attribute='_lernart', description='Bevorzugte Lernart'),
    'gruppengroesse': fields.Integer(attribute='_gruppengroesse', description='Bevorzugte Gruppengroesse'),
    'lernort': fields.String(attribute='_lernort', description='Bevorzugter Lernort'),
})

@lernApp.route('/personen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonenListOperationen(Resource):
    @lernApp.marshal_list_with(person)
    @secured
    def get(self):
        """Auslesen aller Personen-Objekte.
        Sollten keine Personen-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        persons = adm.get_all_persons()
        return persons

    

    @lernApp.marshal_with(person, code=200)
    @lernApp.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Person-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der AppAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = AppAdministration()

        proposal = Person.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_person(proposal.get_name(), proposal.get_vorname(), proposal.get_semester(), proposal.get_studiengang(), proposal.get_alter(), proposal.get_geschlecht(), proposal.get_lerngruppe(),
                                proposal.get_google_user_id(), proposal.get_email(), proposal.get_personenprofil())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@lernApp.route('/personen/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperationen(Resource):
    @lernApp.marshal_list_with(person)
   
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        person = adm.get_person_by_id(id)
        return person
    
    @lernApp.marshal_with(person)
    @lernApp.expect(person, validate=True)
    #@secured
    def put(self, id):
        """Update eines bestimmten Person-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Person-Objekts.
        """
        adm = AppAdministration()
        c = Person.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            c.set_id(id)
            adm.save_person(c)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Personen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = AppAdministration()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return '', 200

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

@lernApp.route('/profile')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilListOperationen(Resource):
    @lernApp.marshal_list_with(profil)

    #@secured
    def get(self):
        """Auslesen aller Profil-Objekte.
        Sollte kein Profil-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        profile = adm.get_all_profil()
        return profile

    #@secured
    def post(self):
        """Anlegen eines neuen Profil-Objekts."""
        #id = request.args.get("id")
        gruppe = request.args.get("gruppe")
        lernfaecher = request.args.get("lernfaecher")
        lernvorlieben_id = request.args.get("lernvorlieben_id")
        adm = AppAdministration()
        adm.create_profil(gruppe, lernfaecher, lernvorlieben_id)

    #@secured
    #def put(self):
     #   """Updaten eines Profil-Objekts."""

      #  id = request.args.get("id")
       # gruppe = request.args.get("gruppe")
        #lernfaecher = request.args.get("lernfaecher")
        #lernvorlieben_id = request.args.get("lernvorlieben_id")

        #adm = AppAdministration()

        #liste = adm.get_profil_by_id(id)
        #for i in liste:
         #   i.set_gruppe(gruppe)
          #  i.set_lernfaecher(lernfaecher)
           # i.set_lernvorlieben_id(lernvorlieben_id)
            #adm.update(i)

@lernApp.route('/profil/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilByIDOperationen(Resource):
    @lernApp.marshal_list_with(profil)

    #@secured
    def get(self, id):
        """Auslesen eines bestimmten Profil-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        profil = adm.get_profil_by_id(id)
        return profil

    @lernApp.marshal_with(profil)
    @lernApp.expect(profil, validate=True)
    #@secured
    def put(self, id):
        """Update des Profil-Objekts."""

        adm = AppAdministration()
        c = Profil.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Profil-Objekts gesetzt."""
            c.set_id(id)
            adm.save_profil(c)
            return '', 200
        else:
            return '', 500

@lernApp.route('/lerngruppen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LerngruppeListOperationen(Resource):
    @lernApp.marshal_list_with(lerngruppe)
    
    @secured
    def get(self):
        """Auslesen aller Lerngruppen-Objekte.
        Sollten keine Lerngruppen-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        lerngruppen = adm.get_all_lerngruppen()
        return lerngruppen

    @lernApp.marshal_with(lerngruppe, code=200)
    @lernApp.expect(lerngruppe)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Lerngruppen-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der AppAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = AppAdministration()

        proposal = Lerngruppe.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_lerngruppe(proposal.get_name(), proposal.get_gruppenprofil())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500
    
@lernApp.route('/lerngruppen/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LerngruppeOperationen(Resource):
    @lernApp.marshal_list_with(lerngruppe)
   
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Lerngruppen-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        lerngruppe = adm.get_lerngruppe_by_id(id)
        return lerngruppe
        
    @lernApp.marshal_with(lerngruppe)
    @lernApp.expect(lerngruppe, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Lerngruppen-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Person-Objekts.
        """
        adm = AppAdministration()
        c = Lerngruppe.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Lerngruppe-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            c.set_id(id)
            adm.save_lerngruppe(c)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Lerngruppen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = AppAdministration()
        adm.delete_ById(id)
        return '', 200

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

@lernApp.route('/konversationen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationListOperation(Resource):

    @lernApp.marshal_list_with(konversation)
    def get(self):
        """Auslesen aller Konversations-Objekte.

        Sollten keine Konversations-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        konversationen = adm.get_all_konversationen()
        return konversationen

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
    def post(self, id):
        """Anlegen einer Konversation."""
        adm = AppAdministration()
        ko = adm.get_konversation_by_id(id)

        if ko is not None:
            result = adm.create_konversation(ko)
            return result
        else:
            return "", 500

    @lernApp.marshal_with(konversation)
    def delete(self, id):
        """Löschen eines bestimmten Konversationobjekts."""
        adm = AppAdministration()
        k = adm.get_konversation_by_id(id)
        adm.delete_konversation(k)
        return '', 200

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


@lernApp.route('/teilnahmeChat')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeChatListOperation(Resource):

    @lernApp.marshal_list_with(teilnahmechat)
    def get(self):
        """Auslesen aller Teilnahme-Objekte des Chats.

        Sollten keine Teilnahme-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        teilnahmen = adm.get_all_teilnahmenChat()
        return teilnahmen

@lernApp.route('/teilnahmeChat/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeChatOperation(Resource):

    @lernApp.marshal_with(teilnahmechat)
    def get (self, id):
        """Auslesen einer bestimmten Teilnahme."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahme_by_id(id)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500 #Wenn es keine Teilnahme im Chat mit der id gibt.

    @lernApp.marshal_with(teilnahmechat)
    def put(self, id):
        """Update eines bestimmten TeilnahmeChat-objekts."""
        adm = AppAdministration()
        teil = teilnahmechat.from_dict(api.payload)

        if teil is not None:
            teil.set_id(id)
            adm.save_teilnahmechat(teil)
            teilnahmechat = adm.get_teilnahme_by_id(id)
            return teilnahmechat, 200
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.

    @lernApp.marshal_with(teilnahmechat)
    def post(self, id):
        """Anlegen einer Teilnahme im Chat."""
        adm = AppAdministration()
        tl = adm.get_teilnahme_by_id(id)

        if tl is not None:
            result = adm.create_teilnahme(tl)
            return result
        else:
            return "", 500

    @lernApp.marshal_with(teilnahmechat)
    def delete(self, id):
        """Löschen eines bestimmten TeilnahmeChat-objekts."""
        adm = AppAdministration()
        t = adm.get_teilnahme_by_id(id)
        adm.delete_teilnahme(t)
        return '', 200

@lernApp.route('/teilnehmer-by-student-id/<string:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnehmeChatByStudentIdOperation(Resource):

    @lernApp.marshal_with(teilnahmechat)
    def get(self, id):
        """Auslesen einer bestimmten Teilnahme anhand der Personen-Id."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahme_by_id(id)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.

@lernApp.route('/teilnehmer-by-konversation-id/<string:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnehmeChatByKonversationIdOperation(Resource):

    @lernApp.marshal_with(teilnahmechat)
    def get(self, id):
        """Auslesen einer bestimmten Teilnahme anhand der Konversations-Id."""
        adm = AppAdministration()
        teiln = adm.get_teilnahme_by_id(id)

        if teiln is not None:
            return teiln
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.

@lernApp.route('/teilnahmenGruppe')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeGruppeListOperation(Resource):

    @lernApp.marshal_list_with(teilnahmegruppe)
    def get(self):
        """Auslesen aller TeilnahmeGruppe-Objekte.

        Sollten keine TeilnahmeGruppe-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        teilnahme = adm.get_all_teilnahmen()
        return teilnahme

    @lernApp.marshal_list_with(teilnahmegruppe, envelope='response')
    def post(self):
        """Anlegen eines neuen Teilnahmeobjekts."""
        adm = AppAdministration()
        t = teilnahme.from_dict(api.payload)

        if t is not None:
            insert_t = adm.create_teilnahmegruppe(n)
            teilnahme = adm.get_teilnahmegruppe_by_id(insert_t.get_id())
            return nachricht, 200
        else:
            return '', 500

@lernApp.route('/teilnahmenGruppe/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeGruppeOperation(Resource):

    @lernApp.marshal_with(teilnahmegruppe)
    def get (self, id):
        """Auslesen einer bestimmten Teilnahme."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahmegruppe_by_id(id)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500 #Wenn es keine Teilnahme im Chat mit der id gibt.

    

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

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Lernvorlieben-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = AppAdministration()
        lernvorlieben = adm.get_lernvorliebe_by_id(id)
        adm.delete_lernvorlieben(lernvorlieben)
        return '', 200

@lernApp.route('/lernvorlieben')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class LernvorliebenListOperationen(Resource):
    @lernApp.marshal_list_with(lernvorlieben)

    @lernApp.marshal_with(lernvorlieben, code=200)
    @lernApp.expect(lernvorlieben)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Lernvorlieben-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der AppAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = AppAdministration()

        proposal = Lernvorlieben.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_lernvorlieben(proposal.get_tageszeiten(), proposal.get_tage(), proposal.get_frequenz(), proposal.get_lernart(), proposal.get_gruppengroesse(), proposal.get_lernort())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


if __name__ == '__main__':
    app.run(debug=True)