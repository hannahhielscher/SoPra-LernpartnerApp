from .bo.Konversation import Konversation
from .bo.Lerngruppe import Lerngruppe
from .bo.Nachricht import Nachricht
from .bo.Person import Person
from .bo.Profil import Profil
from .bo.TeilnahmeChat import TeilnahmeChat
from .bo.TeilnahmeGruppe import TeilnahmeGruppe
from .bo.Vorschlag import Vorschlag
from .bo.Lernvorlieben import Lernvorlieben
from .bo.Lernfach import Lernfach


from .db.KonversationMapper import KonversationMapper
from .db.NachrichtMapper import NachrichtMapper
from .db.PersonMapper import PersonMapper
from .db.ProfilMapper import ProfilMapper
from .db.TeilnahmeChatMapper import TeilnahmeChatMapper
from .db.TeilnahmeGruppeMapper import TeilnahmeGruppeMapper
from .db.LerngruppeMapper import LerngruppeMapper
from .db.VorschlagMapper import VorschlagMapper
from .db.LernvorliebenMapper import LernvorliebenMapper
from .db.LernfachMapper import LernfachMapper


class AppAdministration (object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    Sie verbindet die API Anbindung via Flask (main.py) mit der Datenbankanbindung (Mapper-Klassen)
    AppAdministration bilden nur die Server-seitige Sicht der Applikationslogik ab. Diese basiert vollständig auf synchronen
    Funktionsaufrufen.
    Die Klasse hat spezifische Methoden für jedes BO.
    """
    def __init__(self):
        pass

    """
    Person-spezifische Methoden
    """
    def create_person(self, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe, google_user_id, email, profil_id):
        """Eine Person anlegen"""

        person = Person()
        person.set_name(name)
        person.set_vorname(vorname)
        person.set_semester(semester)
        person.set_studiengang(studiengang)
        person.set_alter(alter)
        person.set_geschlecht(geschlecht)
        person.set_lerngruppe(lerngruppe)
        person.set_google_user_id(google_user_id)
        person.set_email(email)
        person.set_profil(profil_id)
        
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_id(self, id):
        """Eine Person mit einer bestimmten ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_person_by_profilid(self, profilid):
        """Eine Person mit einer bestimmten ProfilID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_profilid(profilid)

    def get_all_persons(self):
        """Alle Personen auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def get_person_by_google_user_id(self, id):
        """Eine Person mit einer bestimmten Google User ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def save_person(self, person):
        """Eine Person speichern"""
        with PersonMapper() as mapper:
            mapper.update(person)

    def update_person_by_id(self, person):
        """Eine Person speichern"""
        with PersonMapper() as mapper:
            mapper.update_by_id(person)
    
    def delete_person(self, person):
        """Eine Person löschen"""
        with PersonMapper() as mapper:
            return mapper.delete(person)


    """
    Profil-spezifische Methoden
    """

    def create_profil(self, gruppe, lernfaecher, lernvorlieben_id):
        """Ein Profil anlegen"""

        profil = Profil()

        profil.set_gruppe(gruppe)
        profil.set_lernfaecher(lernfaecher)
        profil.set_lernvorlieben_id(lernvorlieben_id)
        profil.set_id(1)

        with ProfilMapper() as mapper:
            return mapper.insert(profil)

   # """def insert_lernfaecher(self, profil_id, lernfach):

    #    with ProfilMapper as mapper:
     #       return mapper.insert_lernfaecher(profil_id, lernfach)"""

    def get_all_profil(self):
        """Auslesen aller Profile"""
        with ProfilMapper() as mapper:
            return mapper.find_all()

    def get_profil_by_id(self, id):
        """Profil mit einer bestimmten ID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_by_id(id)

    def get_lernfaecher_by_profil_id(self, profil_id):
        """Lernfaecher mit einer bestimmten ProfilID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_lernfaecher_by_profil_id(profil_id)
    
    def get_profil_test(self, profil_id):
        """Ein Profil mit einer bestimmten ProfilID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_profil_test(profil_id)

    def get_profil_by_lernfach_id(self, lernfach_id):
        """Profil mit einer bestimmten Lernfach ID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_by_lernfach_id(lernfach_id)

    def get_lernfaecher_id_by_profil_id(self, profil_id):
        """Lernfaecher ID zu bestimmtem Profil auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_lernfaecher_id_by_profil_id(profil_id)

    def save_profil(self, profil):
        """Profil speichern"""
        with ProfilMapper() as mapper:
            mapper.update(profil)

    def update_profil_by_id(self, profil):
        """Ein Profil speichern"""
        with ProfilMapper() as mapper:
            mapper.update(profil)

    def delete(self, profil):
        """Profil löschen"""
        with ProfilMapper() as mapper:
            return mapper.deleteByID(profil)


    """
    Lernvorlieben-spezifische Methoden
    """
    #def create_lernvorlieben(self, lernvorlieben):
    def create_lernvorlieben(self, tageszeiten_id, tageszeiten_bez, tage_id, tage_bez, frequenz_id, frequenz_bez, lernart_id, lernart_bez, gruppengroesse_id, gruppengroesse_bez, lernort_id, lernort_bez):
        """Lernvorlieben anlegen"""

        lernvorlieben = Lernvorlieben()

        lernvorlieben.set_tageszeiten_id(tageszeiten_id)
        lernvorlieben.set_tageszeiten_bez(tageszeiten_bez)
        lernvorlieben.set_tage_id(tage_id)
        lernvorlieben.set_tage_bez(tage_bez)
        lernvorlieben.set_frequenz_id(frequenz_id)
        lernvorlieben.set_frequenz_bez(frequenz_bez)
        lernvorlieben.set_lernart_id(lernart_id)
        lernvorlieben.set_lernart_bez(lernart_bez)
        lernvorlieben.set_gruppengroesse_id(gruppengroesse_id)
        lernvorlieben.set_gruppengroesse_bez(gruppengroesse_bez)
        lernvorlieben.set_lernort_id(lernort_id)
        lernvorlieben.set_lernort_bez(lernort_bez)
        lernvorlieben.set_id(1)

        print(lernvorlieben)

        with LernvorliebenMapper() as mapper:
            return mapper.insert(lernvorlieben)

    def get_lernvorlieben_by_id(self, id):
        """Lernvorlieben mit einer bestimmten ID auslesen"""
        with LernvorliebenMapper() as mapper:
            return mapper.find_by_id(id)

    def save_lernvorlieben(self, lernvorlieben):
        """Lernvorlieben speichern"""

        with LernvorliebenMapper() as mapper:
            mapper.update(lernvorlieben)

    def update_lernvorlieben_by_id(self, lernvorlieben):
        """Lernvorlieben speichern"""
        with LernvorliebenMapper() as mapper:
            mapper.update_by_id(lernvorlieben)
    
    def delete_lernvorlieben(self, lernvorlieben):
        """Eine Lernvorliebe löschen"""
        with LernvorliebenMapper() as mapper:
            return mapper.delete(lernvorlieben)


    """
    Lerngruppen-spezifische Methoden
    """

    def create_lerngruppe(self, name, profil):
        """Eine Lerngruppe anlegen"""

        lerngruppe = Lerngruppe()

        lerngruppe.set_name(name)
        lerngruppe.set_profil(profil)
        lerngruppe.set_id(1)

        with LerngruppeMapper() as mapper:
            return mapper.insert(lerngruppe)

    def get_lerngruppe_by_id(self, id):
        """Eine Lerngruppe mit einer bestimmten ID auslesen"""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_id(id)

    def get_lerngruppe_by_profil_id(self, id):
        """Eine Lerngruppe mit einer bestimmten ProfilID auslesen"""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_profil_id(id)

    def get_lerngruppe_by_person_id(self, id):
        """Eine Lerngruppe mit einer bestimmten PersonID auslesen"""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_person_id(id)

    def get_all_lerngruppen(self):
        """Alle Lerngruppe auslesen"""
        with LerngruppeMapper() as mapper:
            return mapper.find_all()

    def save_lerngruppe(self, lerngruppe):
        """Eine Lerngruppe speichern"""
        with LerngruppeMapper() as mapper:
            mapper.update(lerngruppe)

    def update_lerngruppe_by_id(self, lerngruppe):
        """Eine Lerngruppe speichern"""
        with LerngruppeMapper() as mapper:
            mapper.update(lerngruppe)

    def delete_ById(self, gruppenId):
        """Eine Lerngruppe löschen"""
        with LerngruppeMapper() as mapper:
            return mapper.delete(gruppenId)

    
    """
    TeilnahmeGruppe-spezifische Methoden
    """
    def create_teilnahmegruppe(self, teilnehmer, lerngruppe):
        """Eine Teilnahme an einer Gruppe anlegen"""

        teilnahme = TeilnahmeGruppe()

        teilnahme.set_teilnehmer(teilnehmer)
        teilnahme.set_lerngruppe(lerngruppe)           
        teilnahme.set_id(1)

        with TeilnahmeGruppeMapper() as mapper:
            return mapper.insert(teilnahme)
    
    def get_all_teilnahmengruppe(self):
        """Alle Teilnahmen an Gruppen auslesen"""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_all()

    def get_teilnahmegruppe_by_person_id(self, person_id):
        """Gibt die Teilnahme einer gegebenen PersonId zurück."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    def get_teilnahmegruppe_by_lerngruppen_id(self, lerngruppe_id):
        """Gibt die Teilnahme einer gegebenen Lerngruppen Id zurück."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_lerngruppe_id(lerngruppe_id)
    
    def get_teilnahmegruppe_by_id(self, id):
        """Gibt die Teilnahme einer gegebenen Id zurück."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_teilnahmegruppe_by_person_by_gruppe(self, person_id, lerngruppe_id):
        """Gibt die Teilnahme einer gegebenen PersonId und einer gegebenen Lerngruppen Id zurück."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_person_and_lerngruppe(person_id, lerngruppe_id)

    def update_teilnahmegruppe(self,teilnahme):
        """Speichert die Teilnahme."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.update(teilnahme)

    def delete_teilnahmegruppe(self, person_id):
        """Löscht die TeilnahmeGruppe nach Person."""
        with TeilnahmeGruppeMapper() as mapper:
            mapper.delete(person_id)
    
    
    """
    Nachricht-spezifische Methoden
    """

    def get_all_nachrichten(self):
        """Gibt alle Nachrichten zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_all()

    def get_nachricht_by_id(self, id):
        """Gibt die Nachricht mit der gegebenen Id zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_id(id)

    def get_nachricht_by_inhalt(self, inhalt):
        """Gibt die Nachricht mit dem gegebenen Inhalt zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_inhalt(inhalt)

    def get_nachricht_by_person_id(self, person_id):
        """Gibt die Nachricht mit der gegebenen Id der Person zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    def get_nachricht_by_konversation_id(self, konversation_id):
        """Gibt die Nachrichten nach Konversation zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_konversation_id(konversation_id)

    def get_nachricht_by_konversation_by_person(self, konversation_id, person_id):
        """Gibt die Nachrichten nach Konversation und Sender zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_konversation_by_person(konversation_id, person_id)

    def create_nachricht(self, nachricht_inhalt, person_id, konversation_id):
        """Speichert die Nachricht."""
        nachricht = Nachricht()

        nachricht.set_nachricht_inhalt(nachricht_inhalt)
        nachricht.set_person_id(person_id)
        nachricht.set_konversation_id(konversation_id)
        nachricht.set_id(1)

        with NachrichtMapper() as mapper:
            return mapper.insert(nachricht)

    def save_nachricht(self, nachricht):
        """Speichert die Nachricht."""
        with NachrichtMapper() as mapper:
            return mapper.update(nachricht)

    def delete_nachricht(self, nachricht):
        """Löscht die Nachricht."""
        with NachrichtMapper() as mapper:
            mapper.delete(nachricht)
    
    def delete_by_konversation_id(self, konversation_id):
        """Löscht alle Nachrichten einer Konversation"""
        with Nachricht.Mapper() as mapper:
            mapper.delete_by_konversation_id(konversation_id)

    """
    Konversation-spezifische Methoden
    """

    def create_konversation(self, name, anfragestatus):
        """Speichert die Konversation."""

        konversation = Konversation()

        konversation.set_name(name)
        konversation.set_anfragestatus(anfragestatus)
        konversation.set_id(1)

        with KonversationMapper() as mapper:
            return mapper.insert(konversation)

    def get_all_konversationen(self):
        """Gibt alle Konversationen zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_all()

    def get_konversation_by_id(self, id):
        """Gibt die Konversation mit der gegebenen Id zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_konversation_by_personid(self, personid):
        """Gibt alle Konversationen einer Person zurück"""
        with KonversationMapper() as mapper:
            return mapper.find_by_personid(personid)

    def get_angenommeneKonversationen_by_personid(self, personid):
        """Gibt alle angenommenen Konversationen einer Person zurück"""
        with KonversationMapper() as mapper:
            return mapper.find_angenommene_by_personid(personid)
    
    def get_konversation_by_name(self, name):
        """Gibt die Konversation nach Name zurück"""
        with KonversationMapper() as mapper:
            return mapper.find_by_name(name)

    def update_konversation_status(self, konversation):
        """Speichert die Konversation."""
        with KonversationMapper() as mapper:
            return mapper.update_status(konversation)

    def delete_konversation(self, id):
        """Löscht die Konversation."""
        with KonversationMapper() as mapper:
            mapper.delete(id)

    """
    TeilnahmeChats-spezifische Methoden
    """

    def create_teilnahmeChat(self, teilnehmer, anfrage_sender, status, konversation):
        """Eine Teilnahme an einem Chat anlegen"""

        teilnahme = TeilnahmeChat()

        teilnahme.set_teilnehmer(teilnehmer)
        teilnahme.set_anfrage_sender(anfrage_sender)
        teilnahme.set_status(status)
        teilnahme.set_konversation(konversation)
        teilnahme.set_id(1)

        with TeilnahmeChatMapper() as mapper:
            return mapper.insert(teilnahme)

    def get_all_teilnahmenChat(self):
        """Gibt alle Teilnahmen an einem Chat zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_all()

    def get_teilnahmeChat_by_id(self, id):
        """Gibt die Teilnahme einer gegebenen Id zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_id(id)

    def get_teilnahmeChat_by_person_id(self, personid):
        """Gibt die Teilnahme einer gegebenen PersonId zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_person_id(personid)

    def get_teilnahmeChat_by_person_id_und_status(self, person_id, status):
        """Gibt die Teilnahme einer gegebenen PersonId und dem Status der Konversation zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_person_id_und_status(person_id, status)

    def get_teilnahmeChat_by_status_and_konversation_id(self, status, konversationid):
        """Gibt die Teilnahme einer gegebenen KonversationId und dem Status der Konversation zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_status_and_konversation_id(status, konversationid)

    def get_teilnahmeChat_by_konversation_and_person(self, konversation_id, person_id):
        """Gibt die Teilnahme einer gegebenen KonversationId und PersonId zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_konversation_and_person(konversation_id, person_id)

    def get_teilnahmeChat_by_konversation_id(self, konversationid):
        """Gibt die Teilnahme einer gegebenen Id der Konversation zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_konversation_id(konversationid)

    def get_teilnahmeChat_anfrage_sender(self, anfrage_sender):
        """Gibt die Teilnahme einer gegebenen Anfragesender Id zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_anfrage_sender(anfrage_sender)

    def save_teilnahmeChat(self, teilnahme):
        """Speichert die Teilnahme."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.insert(teilnahme)

    def update_teilnahmeChat(self, teilnahme):
        """Speichert die Teilnahme."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.update(teilnahme)

    def delete_teilnahmeChatByKonByPer(self, konversationId, personId):
        """Löscht die Teilnahme anhand der KonversationID und personID."""
        with TeilnahmeChatMapper() as mapper:
            mapper.delete(konversationId, personId)

    def delete_teilnahmeChat(self, id):
        """Löscht die Teilnahme anhand der Id."""
        with TeilnahmeChatMapper() as mapper:
            mapper.delete_by_id(id)
        
    def delete_teilnahmeChatByPerson(self, person_id):
        """Löscht die TeilnahmeChat nach PersonID."""
        with TeilnahmeChatMapper() as mapper:
            mapper.delete_by_person(person_id)

    """
    Vorschlag-spezifische Methoden
    """

    def create_vorschlag(self, main_person_id, match_quote, lernfaecher_id, match_profil_id):
        """Einen Vorschlag anlegen"""

        vorschlag = Vorschlag()
        vorschlag.set_main_person_id(main_person_id)
        vorschlag.set_match_quote(match_quote)
        vorschlag.set_lernfaecher_id(lernfaecher_id)
        vorschlag.set__match_profil_id(match_profil_id)
        vorschlag.set_id(1)

        with VorschlagMapper() as mapper:
            return mapper.insert(vorschlag)

    def get_all_vorschlaege(self):
        """Gibt alle Vorschläge zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_all()

    def get_vorschlag_by_id(self, id):
        """Gibt den Vorschlag mit der gegebenen Id zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_id(id)

    def get_vorschlaege_by_main_person_id(self, id):
        """Gibt den Vorschlag mit der gegebenen Main Person Id zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_main_person_id(id)

    def get_vorschlag_by_person_id(self, id):
        """Gibt den Vorschlag mit der gegebenen PersonId zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_person_id(id)

    def update_vorschlag_by_id(self, id):
        """Update den Vorschlag mit der gegebenen Id."""
        with VorschlagMapper() as mapper:
            return mapper.update_by_id(id)

    def delete_vorschlag_by_id(self, id):
        """Lösche den Vorschlag mit der gegebenen Id."""
        with VorschlagMapper() as mapper:
            return mapper.delete(id)

    def match_berechnen(self, main_person_id, lernfach_id):
        """Match für eine PersonID und ein bestimmtes Lernfach berechnen"""

        # Main-Person mit der verglichen wird
        # Person by ID holen
        with PersonMapper() as mapper:
            main_person = mapper.find_by_id(main_person_id)

        # Wert speichern, ob Person Gruppen als Matches möchte
        gruppe = main_person.get_lerngruppe()
        
        # Profil by Person ID holen
        with ProfilMapper() as mapper:
            main_profil = mapper.find_by_id(main_person.get_profil())

        # Schleife wegen Rückgabewert --> eigentlich list, kommt aber in dem Fall nur 1 Wert
        #for profil in main_profil_list:
        main_lernvorlieben_id = main_profil.get_lernvorlieben_id()
            #main_profil = profil

        with LernvorliebenMapper() as mapper:
            main_lernvorlieben = mapper.find_by_id(main_lernvorlieben_id)

        # Alle anderen Personen/Gruppen
        with ProfilMapper() as mapper:
            match_profil_all = mapper.find_by_lernfach_id(lernfach_id)

        # Gruppen bei Bedarf aus Matching-Liste löschen + rausfiltern von CurrentPerson
        if gruppe == 0:
            for profil in match_profil_all:
                if profil.get_gruppe() == 1:
                    match_profil_all.remove(profil)
                if profil.get_id() == main_profil.get_id():
                    match_profil_all.remove(profil)
        else:
            for profil in match_profil_all:
                if profil.get_id() == main_profil.get_id():
                    match_profil_all.remove(profil)


        #Match berechnen

        result = []

        for profil in match_profil_all:

            match_profil_id = profil.get_id()

            lernvorlieben_id = profil.get_lernvorlieben_id()

            with LernvorliebenMapper() as mapper:
                lernvorlieben = mapper.find_by_id(lernvorlieben_id)
            print(lernvorlieben_id)

            quote = 0
            if lernvorlieben.get_tageszeiten_id() == main_lernvorlieben.get_tageszeiten_id():
                quote += 1
            if lernvorlieben.get_tage_id() == main_lernvorlieben.get_tage_id():
                quote += 1
            if lernvorlieben.get_frequenz_id() == main_lernvorlieben.get_frequenz_id():
                quote += 1
            if lernvorlieben.get_lernart_id() == main_lernvorlieben.get_lernart_id():
                quote += 1
            if lernvorlieben.get_gruppengroesse_id() == main_lernvorlieben.get_gruppengroesse_id():
                quote += 1
            if lernvorlieben.get_lernort_id() == main_lernvorlieben.get_lernort_id():
                quote += 1

            quote_ges = round(((quote / 6 ) * 100), 2)

            vorschlag = Vorschlag()
            vorschlag.set_main_person_id(main_person_id)
            vorschlag.set_match_quote(quote_ges)
            vorschlag.set_lernfaecher_id(lernfach_id)
            vorschlag.set_match_profil_id(match_profil_id)
            vorschlag.set_id(1)

            with VorschlagMapper() as mapper:
                result.append(mapper.insert(vorschlag))

        return result

    """
    Lernfächer-spezifische Methoden
    """

    def get_all_lernfaecher(self):
        """Gibt alle Lernfaecher zurück."""
        with LernfachMapper() as mapper:
            return mapper.find_all()

    def get_lernfach_by_id(self, id):
        """Gibt Lernfach nach ID zurück."""
        with LernfachMapper() as mapper:
            return mapper.find_by_id(id)

    def get_lernfaecher_by_profil_id(self, profilid):
        """Gibt alle Lernfaecher nach ProfilID zurück."""
        with LernfachMapper() as mapper:
            return mapper.find_lernfaecher_by_profil_id(profilid)

    def delete_lernfaecher_by_profil_id(self, profilid):
        """Eine Person löschen"""
        with LernfachMapper() as mapper:
            return mapper.delete_lernfaecher_by_profil_id(profilid)