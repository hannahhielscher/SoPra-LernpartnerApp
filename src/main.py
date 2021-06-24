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

test = api.inherit('Lernfach', {
    'lernfach_id': fields.Integer(attribute='_lernfachid', description='ID des Lernfachs'),
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

lernfaecher = api.inherit('Lernfaecher', test, {
    'bezeichnung': fields.String(attribute='_bezeichnung', description='Bezeichnung'),
})

profil = api.inherit('Profil', bo, {
    'gruppe': fields.Boolean(attribute='_gruppe', description='Teilnahme an einer Gruppe'),
    'lernfaecher': fields.List(fields.Nested(lernfaecher)),
    'lernvorlieben_id': fields.Integer(attribute='_lernvorlieben_id', description='Lernvorlieben der Person'),
})

lerngruppe = api.inherit('Lerngruppe', nbo, {
    'gruppenprofil': fields.Integer(attribute='_gruppenprofil', description='Profil ID der Lerngruppe'),
})

vorschlag = api.inherit('Vorschlag', bo, {
    'main_person_id': fields.Integer(attribute='_main_person_id', description='Person ID zu der Matches berechnet werden'),
    'match_quote': fields.Float(attribute='_match_quote', description='Prozentzahl des Matches'),
    'lernfaecher_id': fields.Integer(attribute='_lernfaecher_id', description='Gesuchte Lernfach bezogen auf das Match'),
    'match_profil_id': fields.Integer(attribute='_match_profil_id', description='Profil ID der gematchten Person'),
})

nachricht = api.inherit('Nachricht', bo, {
    'nachricht_inhalt': fields.String(attribute='_nachricht_inhalt', description='Inhalt der Nachricht'),
    'person_id': fields.Integer(attribute='_person_id', description='ID des Senders'),
    'konversation_id': fields.Integer(attribute='_konversation_id', description='ID der Konversation, in der die Nachricht gesendet wurde'),
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
    'lerngruppe': fields.Integer(attribute='_lerngruppe', description='ID der Lerngruppe')
})

lernvorlieben = api.inherit('Lernvorlieben', bo, {
    "tageszeiten": fields.Integer(attribute='_tageszeiten', description='Bevorzugte Tageszeit'),
    'tage': fields.Integer(attribute='_tage', description='Bevorzugte Tage'),
    'frequenz': fields.Integer(attribute='_frequenz', description='Bevorzugte Frequenz'),
    'lernart': fields.Integer(attribute='_lernart', description='Bevorzugte Lernart'),
    'gruppengroesse': fields.Integer(attribute='_gruppengroesse', description='Bevorzugte Gruppengroesse'),
    'lernort': fields.Integer(attribute='_lernort', description='Bevorzugter Lernort'),
})

@lernApp.route('/personen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonenOperationen(Resource):
    @lernApp.marshal_list_with(person)
    #@secured
    def get(self):
        """Auslesen aller Personen-Objekte.
        Sollten keine Personen-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        persons = adm.get_all_persons()
        return persons

    @secured
    def put(self):
        """Update des User-Objekts."""

        personId = request.args.get("id")
        name = request.args.get("name")
        vorname = request.args.get("vorname")
        semester = request.args.get("semester")
        studiengang = request.args.get("studiengang")
        alter = request.args.get("alter")
        geschlecht = request.args.get("geschlecht")
        lerngruppe= request.args.get("lerngruppe")
        adm = AppAdministration()
        person = adm.get_person_by_id(personId)
        person.set_name(name)
        person.set_vorname(vorname)
        person.set_semester(semester)
        person.set_studiengang(studiengang)
        person.set_alter(alter)
        person.set_geschlecht(geschlecht)
        person.set_lerngruppe(lerngruppe)
        adm.update_person_by_id(person)

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
    @secured
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
        id = request.args.get("id")
        gruppe = request.args.get("gruppe")
        lernfaecher = request.args.get("lernfaecher")
        lernvorlieben_id = request.args.get("lernvorlieben_id")
        adm = AppAdministration()
        adm.create_profil( gruppe, lernfaecher, lernvorlieben_id)

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

@lernApp.route('/profile/<int:id>')
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

    @lernApp.marshal_with(profil)
    @lernApp.expect(profil, validate=True)
    @secured
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

@lernApp.route('/profile-test/<int:profilid>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilByIDTestOperationen(Resource):
    @lernApp.marshal_list_with(profil)

    #secured
    def get(self, profilid):
        """Auslesen eines bestimmten Profil-Objekts.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = AppAdministration()
        profil = adm.get_profil_test(profilid)
        
        return profil

"""Lerngruppenspezifisch"""
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

    #@secured
    def delete(self, id):
        """Löschen eines bestimmten Lerngruppen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = AppAdministration()
        adm.delete_ById(id)
        return '', 200


"""Vorschlagspezifisch"""
#notwendig?
#@lernApp.route('/vorschlaege')
#@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class VorschlaegeListOperations(Resource):
 #   @lernApp.marshal_list_with(vorschlag)
    #@secured
  #  def get(self):
   #     """Auslesen aller Vorschlag-Objekte.
    #    Sollten kein Vorschlag-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
     #   adm = AppAdministration()
      #  vorschlaege = adm.get_all_vorschlaege()
       # return vorschlaege

    #@lernApp.marshal_with(vorschlag, code=200)
    #@lernApp.expect(vorschlag)
    #@secured
    #def post(self):
     #   """Anlegen eines neuen Vorschlag-Objekts.
      #  """
       # adm = AppAdministration()

        #proposal = Vorschlag.from_dict(api.payload)

        #"""RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        #if proposal is not None:
         #   """ Das serverseitig erzeugte Objekt ist das maßgebliche und
          #  wird auch dem Client zurückgegeben.
           # """
            #c = adm.create_vorschlag(proposal.get_id(), proposal.get_main_person_id(), proposal.get_match_quote(), proposal.get_lernfaecher_id(), proposal.get_match_profil_id())
            #return c, 200
        #else:
             #Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
         #   return '', 500


@lernApp.route('/vorschlag/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VorschlagByIDOperationen(Resource):
    @lernApp.marshal_list_with(vorschlag)
    @secured
    def get(self, id):
        """Auslesen aller Vorschlag-Objekte einer main_person_id.
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """

        adm = AppAdministration()
        vorschlag = adm.get_vorschlaege_by_main_person_id(id)
        return vorschlag

    def delete(self, id):
        """Löschen eines bestimmten Nachrichtenobjekts."""
        s
        adm = AppAdministration()
        adm.delete_vorschlag_by_id(id)

@lernApp.route('/vorschlaege/<int:mainpersonid>/<int:lernfachid>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class VorschlaegeByPersonByLernfachOperations(Resource):
    @lernApp.marshal_list_with(vorschlag)
    @secured
    def get(self, mainpersonid, lernfachid):
        """Auslesen aller Vorschlag-Objekte nach Person und Lernfach.
        Sollten kein Vorschlag-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""

        adm = AppAdministration()
        vorschlaege = adm.match_berechnen(mainpersonid, lernfachid)
        return vorschlaege

"""Nachrichtspezifisch"""        
@lernApp.route('/nachrichten')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtenOperation(Resource):

    #Brauchen wir das überhaupt? Komplett alle Nachrichten ist ja unnötig
    @lernApp.marshal_list_with(nachricht)
    def get(self):
        """Auslesen aller Nachrichten-Objekte.

        Sollten keine Nachrichten-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        nachricht = adm.get_all_nachrichten()
        return nachricht

    @lernApp.marshal_with(nachricht)
    def post(self):
        """Anlegen/schreiben einer Nachricht."""
        adm = AppAdministration()

        proposal = Nachricht.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_nachricht(proposal.get_inhalt(), proposal.get_empfaenger())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@lernApp.route('/nachricht/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByIDOperation(Resource):

    @lernApp.marshal_with(nachricht)
    def get (self, id):
        """Auslesen einer bestimmten Nachricht."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_id(id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

    #Kann man Nachrichten später updaten?
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
        nachricht = adm.get_nachricht_by_person_id(person_id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.

@lernApp.route('/nachricht-by-konversation/<int:konversation_id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByKonversationIdOperation(Resource):

    @lernApp.marshal_with(nachricht)
    @secured
    def get (self, konversation_id):
        """Auslesen einer bestimmten Nachricht anhand der Id der Konversation."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_konversation_id(konversation_id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.
    
    @lernApp.marshal_with(nachricht)
    @secured
    def delete(self, konversation_id):
        """Löschen aller Nachrichten anhand der Id der Konversation."""
        adm = AppAdministration()
        nachrichten = adm.delete_by_konversation_id(konversation_id)

        if nachrichten is not None:
            return nachrichten
        else:
            return '', 500

@lernApp.route('/nachricht-by-konversation-by-person/<int:konversation_id>/<int:person_id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class NachrichtByKonversationByPersonOperation(Resource):

    @lernApp.marshal_with(nachricht)
    @secured
    def get (self, konversation_id, person_id):
        """Auslesen einer bestimmten Nachricht anhand der Id der Konversation."""
        adm = AppAdministration()
        nachricht = adm.get_nachricht_by_konversation_by_person(konversation_id, person_id)

        if nachricht is not None:
            return nachricht
        else:
            return '', 500 #Wenn es keine Nachricht mit der id gibt.


"""Konversationspezifische"""
@lernApp.route('/konversationen')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationenOperation(Resource):

    @lernApp.marshal_list_with(konversation)
    def get(self):
        """Auslesen aller Konversations-Objekte.

        Sollten keine Konversations-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        konversationen = adm.get_all_konversationen()
        return konversationen
    
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

@lernApp.route('/konversationen/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationByIdOperation(Resource):

    @lernApp.marshal_with(konversation)
    @secured
    def get (self, id):
        """Auslesen einer bestimmten Konversation."""
        adm = AppAdministration()
        konversation = adm.get_konversation_by_id(id)

        if konversation is not None:
            return konversation
        else:
            return '', 500 #Wenn es keine Konversation mit der id gibt.

    @lernApp.marshal_with(konversation)
    @secured
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

@lernApp.route('/konversationen/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationByPersonOperation(Resource):
    
    @lernApp.marshal_with(konversation)
    @secured
    def get (self, personid):
        """Auslesen einer bestimmten Konversation."""
        adm = AppAdministration()
        konversation = adm.get_konversation_by_personid(personid)

        if konversation is not None:
            return konversation
        else:
            return '', 500 #Wenn es keine Konversation mit der id gibt.

#notwendig?
@lernApp.route('/konversationen/<string:name>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KonversationByNameOperation(Resource):

    @lernApp.marshal_with(konversation)
    @secured
    def get (self, name):
        """Auslesen einer bestimmten Konversation."""
        adm = AppAdministration()
        konversation = adm.get_konversation_by_name(name)

        if konversation is not None:
            return konversation
        else:
            return '', 500 #Wenn es keine Konversation mit der id gibt.


@lernApp.route('/teilnahmeChat-by-id/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeChatByIdOperation(Resource):

    @lernApp.marshal_with(konversation)
    def get(self, id):
        """Auslesen einer bestimmten Teilnahme anhand der Id."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahmeChat_by_id(id)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.


@lernApp.route('/teilnahmenChat')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmenChatOperation(Resource):

    @lernApp.marshal_list_with(teilnahmechat)
    def get(self):
        """Auslesen aller Teilnahme-Objekte des Chats.

        Sollten keine Teilnahme-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = AppAdministration()
        teilnahmen = adm.get_all_teilnahmenChat()
        return teilnahmen
    @lernApp.marshal_with(teilnahmechat)
    def post(self):
        """Anlegen einer Teilnahme im Chat."""
        adm = AppAdministration()
        tl = adm.create_teilnahmeChat(teilnahmechat)

        if tl is not None:
            result = adm.create_teilnahme(tl)
            return result
        else:
            return "", 500

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
    def delete(self, id):
        """Löschen eines bestimmten TeilnahmeChat-objekts."""
        adm = AppAdministration()
        t = adm.get_teilnahme_by_id(id)
        adm.delete_teilnahme(t)
        return '', 200

@lernApp.route('/teilnahmeChat-by-person-id/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeChatByPersonIdOperation(Resource):

    @lernApp.marshal_with(teilnahmechat)
    def get(self, personid):
        """Auslesen einer bestimmten Teilnahme anhand der Personen-Id."""
        adm = AppAdministration()
        teilnahme = adm.get_teilnahmeChat_by_person_id(personid)

        if teilnahme is not None:
            return teilnahme
        else:
            return '', 500  # Wenn es keine Teilnahme mit der id gibt.

@lernApp.route('/teilnahmeChat-by-konversation-id/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeChatByKonversationIdOperation(Resource):

    @lernApp.marshal_with(teilnahmechat)
    def get(self, konversationid):
        """Auslesen einer bestimmten Teilnahme anhand der Konversations-Id."""
        adm = AppAdministration()
        teiln = adm.get_teilnahme_by_konversation_id(konversationid)

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
        teilnahme = adm.get_teilnahmegruppe_by_person_id(id)

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

    @lernApp.marshal_list_with(lernvorlieben)
    @lernApp.expect(lernvorlieben, validate=True)

    @secured
    def put(self, id):
        """Update des Lernvorlieben-Objekts."""

        adm = AppAdministration()
        c = Lernvorlieben.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Lernvorlieben-Objekts gesetzt."""
            c.set_id(id)
            adm.save_lernvorlieben(c)
            return '', 200
        else:
            return '', 500


    @secured
    def delete(self, id):
        """Löschen eines bestimmten Lernvorlieben-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = AppAdministration()
        lernvorlieben = adm.get_lernvorlieben_by_id(id)
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

"""Test-Methoden START"""
@lernApp.route('/profil-by-lernfach/<int:id>')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilByIDOperationen(Resource):
    @lernApp.marshal_list_with(profil)

    def get(self, id):
        """Auslesen eines Profiles nach einem bestimmten Lernfach
        """
        adm = AppAdministration()
        profil = adm.get_profil_by_lernfach_id(id)
        return profil

@lernApp.route('/profil-lernfach')
@lernApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfilByIDOperationen(Resource):
    @lernApp.marshal_list_with(profil)
    #@secured
    def post(self):
        """Anlegen eines neuen Profil-Objekts."""
        id = request.args.get("id")
        adm = AppAdministration()
        adm.create_lernfaecher(id)

"""Test-Methoden STOP"""

if __name__ == '__main__':
    app.run(debug=True)