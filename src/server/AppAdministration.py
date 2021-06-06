from .bo.Konversation import Konversation
from .bo.Lerngruppe import Lerngruppe
from .bo.Nachricht import Nachricht
from .bo.Person import Person
from .bo.Profil import Profil
from .bo.TeilnahmeChat import TeilnahmeChat
from .bo.TeilnahmeGruppe import TeilnahmeGruppe
from .bo.Vorschlag import Vorschlag

from .db.KonversationMapper import KonversationMapper
from .db.NachrichtMapper import NachrichtMapper
from .db.PersonMapper import PersonMapper
from .db.ProfilMapper import ProfilMapper
from .db.TeilnahmeChatMapper import TeilnahmeChatMapper


class AppAdministration (object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).

    Sie ist wie eine Spinne, die sämtliche Zusammenhänge in ihrem Netz (in unserem
    Fall die Daten der Applikation) überblickt und für einen geordneten Ablauf und
    dauerhafte Konsistenz der Daten und Abläufe sorgt.

    Die Applikationslogik findet sich in den Methoden dieser Klasse. Jede dieser
    Methoden kann als *Transaction Script* bezeichnet werden. Dieser Name
    lässt schon vermuten, dass hier analog zu Datenbanktransaktion pro
    Transaktion gleiche mehrere Teilaktionen durchgeführt werden, die das System
    von einem konsistenten Zustand in einen anderen, auch wieder konsistenten
    Zustand überführen. Wenn dies zwischenzeitig scheitern sollte, dann ist das
    jeweilige Transaction Script dafür verwantwortlich, eine Fehlerbehandlung
    durchzuführen.

    Diese Klasse steht mit einer Reihe weiterer Datentypen in Verbindung. Dies
    sind:
    - die Klassen BusinessObject und deren Subklassen,
    - die Mapper-Klassen für den DB-Zugriff.

    BankAdministration bilden nur die Server-seitige Sicht der
    Applikationslogik ab. Diese basiert vollständig auf synchronen
    Funktionsaufrufen.

    **Wichtiger Hinweis:** Diese Klasse bedient sich sogenannter
    Mapper-Klassen. Sie gehören der Datenbank-Schicht an und bilden die
    objektorientierte Sicht der Applikationslogik auf die relationale
    organisierte Datenbank ab. Zuweilen kommen "kreative" Zeitgenossen auf die
    Idee, in diesen Mappern auch Applikationslogik zu realisieren. Siehe dazu
    auch die Hinweise in der Methode zum Löschen von Customer-Objekten.
    Einzig nachvollziehbares Argument für einen solchen Ansatz ist die Steigerung
    der Performance umfangreicher Datenbankoperationen. Doch auch dieses Argument
    zieht nur dann, wenn wirklich große Datenmengen zu handhaben sind. In einem
    solchen Fall würde man jedoch eine entsprechend erweiterte Architektur realisieren,
    die wiederum sämtliche Applikationslogik in der Applikationsschicht isolieren
    würde. Also: keine Applikationslogik in die Mapper-Klassen "stecken" sondern
    dies auf die Applikationsschicht konzentrieren!

    Es gibt sicherlich noch viel mehr über diese Klasse zu schreiben. Weitere
    Infos erhalten Sie in der Lehrveranstaltung.
    """
    def __init__(self):
        pass

    """
    Person-spezifische Methoden
    """
    def create_person(self, name, vorname, semester, alter, geschlecht, lerngruppe, google_user_id, email, profil_id):
        """Eine Person anlegen"""

        person = Person()
            
        person.set_name(name)
        person.set_vorname(vorname)
        person.set_semester(semester)           
        person.set_alter(alter)
        person.set_geschlecht(geschlecht)
        person.set_lerngruppe(lerngruppe)
        person.set_google_user_id(google_user_id)
        person.set_email(email)
        person.set_personenprofil(profil_id)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_id(self, id):
        """Eine Person mit einer bestimmten ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

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

    def create_profil(self, studiengang, semester, lernvorlieben_id):
        """Eine Person anlegen"""

        profil = Profil()

        profil.set_studiengang(studiengang)
        profil.set_semester(semester)
        profil.set_lernfaecher(lernfaecher)
        profil.set_lernvorlieben_id(lernvorlieben_id)
        profil.set_id(1)

        with ProfilMapper() as mapper:
            return mapper.insert(profil)

    def get_all_profil(self):
        """Auslesen aller Profile"""
        with ProfilMapper() as mapper:
            return mapper.find_all()

    def get_profil_by_id(self, id):
        """Profil mit einer bestimmten ID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_by_id(id)

    def get_profil_by_lernfach_id(self, lernfach_id):
        """Profil mit einer bestimmten Lernfach ID auslesen"""
        with ProfilMapper() as mapper:
            return mapper.find_by_lernfach_id(lernfach_id)

    def get_lernfaecher_by_profil_id(self, profil_id):
        #Lernfaecher zu bestimmtem Profil auslesen
        with ProfilMapper() as mapper:
            return mapper.find_lernfaecher_by_profil_id(profil_id)

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
    def create_lernvorlieben(id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort):
        """Lernvorlieben anlegen"""

        lernvorlieben = Lernvorlieben()
            
        lernvorlieben.set_tageszeiten(tageszeiten)
        lernvorlieben.set_tage(tage)
        lernvorlieben.set_frequenz(frequenz)           
        lernvorlieben.set_lernart(lernart)
        lernvorlieben.set_gruppengroesse(gruppengroesse)
        lernvorlieben.set_lernort(lernort)
        lernvorlieben.set_id(1)

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
        """Eine Person löschen"""
        with LernvorliebenMapper() as mapper:
            return mapper.delete(lernvorlieben)


    """
    Lerngruppen-spezifische Methoden
    """

    def create_lerngruppe(self, name, gruppenprofil):
        """Eine Lerngruppe anlegen"""

        lerngruppe = Lerngruppe()

        lerngruppe.set_name(name)
        lerngruppe.set_gruppenprofil(profil_id)
        lerngruppe.set_id(1)

        with LerngruppeMapper() as mapper:
            return mapper.insert(lerngruppe)

    def get_lerngruppe_by_id(self, id):
        """Eine Lerngruppe mit einer bestimmten ID auslesen"""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_id(id)

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
            mapper.update_by_id(lerngruppe)

    def delete_ById(self, gruppenId):
        """Eine Lerngruppe löschen"""
        with LerngruppeMapper() as mapper:
            return mapper.delete(gruppenId)

    
    """
    TeilnahmeGruppe-spezifische Methoden
    """
    def create_teilnahmegruppe(self, status, teilnehmer, lerngruppe):
        """Eine Teilnahme an einer Gruppe anlegen"""

        teilnahme = TeilnahmeGruppe()
            
        teilnahme.set_status(status)
        teilnahme.set_teilnehmer(teilnehmer)
        teilnahme.set_lerngruppe(lerngruppe)           
        teilnahme.set_id(1)

        with TeilnahmeGruppeMapper() as mapper:
            return mapper.insert(teilnahme)
    
    def get_all_teilnahmengruppe(self):
        """Alle Teilnahmen an Gruppen auslesen"""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_all()

    def get_teilnahmegruppe_by_student_id(self, student_id):
        """Gibt die Teilnahme einer gegebenen Id zurück."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_student_id(student_id)

    def get_teilnahmegruppe_by_lerngruppen_id(self, lerngruppe_id):
        """Gibt die Teilnahme einer gegebenen Lerngruppen Id zurück."""
        with TeilnahmeGruppenMapper() as mapper:
            return mapper.find_by_lerngruppe_id(lerngruppe_id)
    
    def get_teilnahmegruppe_by_id(self, id):
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.find_by_id(id)

    def update_teilnahmegruppe(self,teilnahme):
        """Speichert die Nachricht."""
        with TeilnahmeGruppeMapper() as mapper:
            return mapper.update(teilnahme)

    def delete_teilnahmegruppe(self, teilnahme):
        """Löscht die Nachricht."""
        with TeilnahmeGruppeMapper() as mapper:
            mapper.delete(teilnahme)
    
    
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
            return mapper.find_by_key(id)

    def get_nachricht_by_inhalt(self, inhalt):
        """Gibt die Nachricht mit dem gegebenen Inhalt zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_key(inhalt)

    def get_nachricht_by_person_id(self, person_id):
        """Gibt die Nachricht mit der gegebenen Id der Person zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_key(person_id)

    def get_nachricht_by_profil_id(self, profil_id):
        """Gibt die Nachricht mit der gegebenen Id des Profils zurück."""
        with NachrichtMapper() as mapper:
            return mapper.find_by_key(profil_id)

    def save_nachricht(self, nachricht):
        """Speichert die Nachricht."""
        with NachrichtMapper() as mapper:
            return mapper.insert(nachricht)

    def update_nachricht(self, nachricht):
        """Speichert die Nachricht."""
        with NachrichtMapper() as mapper:
            return mapper.update(nachricht)

    def delete_nachricht(self, nachricht):
        """Löscht die Nachricht."""
        with NachrichtMapper() as mapper:
            mapper.delete(nachricht)

    """
    Konversation-spezifische Methoden
    """

    def get_all_konversationen(self):
        """Gibt alle Konversationen zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_all()

    def get_konversation_by_id(self, id):
        """Gibt die Konversation mit der gegebenen Id zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_nachrichten_by_id(self, id):
        """Gibt die Nachrichten mit der gegebenen Id zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_teilnehmer_by_id(self, id):
        """Gibt die teilnehmer mit der gegebenen Id zurück."""
        with KonversationMapper() as mapper:
            return mapper.find_by_key(id)

    def save_konversation(self, konversation):
        """Speichert die Konversation."""
        with KonversationMapper() as mapper:
            return mapper.insert(konversation)

    def update_konversation(self, konversation):
        """Speichert die Konversation."""
        with KonversationMapper() as mapper:
            return mapper.update(konversation)

    def delete_konversation(self, konversation):
        """Löscht die Konversation."""
        with KonversationMapper() as mapper:
            mapper.delete(konversation)

    """
    TeilnahmeChats-spezifische Methoden
    """

    def create_teilnahmeChat(self, teilnehmer, konversation):
        """Eine Teilnahme an einem Chat anlegen"""

        teilnahme = TeilnahmeChat()

        teilnahme.set_teilnehmer(teilnehmer)
        teilnahme.set_konversation(konversation)
        teilnahme.set_id(1)

        with TeilnahmeChatMapper() as mapper:
            return mapper.insert(teilnahme)

    def get_all_teilnahmenChat(self):
        """Gibt alle Teilnahmen an einem Chat zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_all()

    def get_teilnahmeChat_by_student_id(self, student_id):
        """Gibt die Teilnahme einer gegebenen Id des Studenten zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_student_id(student_id)

    def get_teilnahmeChat_by_konversations_id(self, konversations_id):
        """Gibt die Teilnahme einer gegebenen Id der Konversation zurück."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.find_by_konversations_id(konversations_id)

    def save_teilnahmeChat(self, teilnahme):
        """Speichert die Teilnahme."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.insert(teilnahme)

    def update_teilnahmeChat(self, teilnahme):
        """Speichert die Teilnahme."""
        with TeilnahmeChatMapper() as mapper:
            return mapper.update(teilnahme)

    def delete_teilnahmeChat(self, teilnahme):
        """Löscht die Teilnahme."""
        with TeilnahmeChatMapper() as mapper:
            mapper.delete(teilnahme)

    """
    Vorschlag-spezifische Methoden
    """

    def create_vorschlag(self, main_person_id, match_quote, lernfach, person_id):
        """Eine Person anlegen"""

        vorschlag = Vorschlag()

        vorschlag.set_main_person_id(main_person_id)
        vorschlag.set_match_quote(match_quote)
        vorschlag.set_lernfach(lernfach)
        vorschlag.set_person_id(person_id)
        vorschlag.set_id(1)

        with VorschlagMapper() as mapper:
            return mapper.insert(vorschlag)

    def get_all_vorschlaege(self):
        """Gibt alle Vorschläge zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_all()

    def get_vorschlaege_by_id(self, id):
        """Gibt den Vorschlag mit der gegebenen Id zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_key(id)

    def get_vorschlag_by_main_person_id(self, id):
        """Gibt den Vorschlag mit der gegebenen Id zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_main_person_id(id)

    def get_vorschlag_by_person_id(self, id):
        """Gibt den Vorschlag mit der gegebenen Id zurück."""
        with VorschlagMapper() as mapper:
            return mapper.find_by_person_id(id)

    def update_vorschlag_by_id(self, id):
        """Update den Vorschlag mit der gegebenen Id."""
        with VorschlagMapper() as mapper:
            return mapper.update_by_id(id)

    def match_berechnen(self, person_id_for_matches):
        """person_id_for_matches auslesen."""
        person = get_person_by_id(person_id_for_matches)

        """person_for_matches: Liste aller Attribute eines Profiles, mit denen verglichen wird"""
        person_for_matches = person.print_all()

        profil_id = 0
        for i in range(len(person_for_matches) - 1, len(person_for_matches)):
            profil_id = person_for_matches[i]

        profil_for_matches = get_profil_by_id(profil_id)

        """profil: Profil zu dem Matches errechnet werden sollen"""
        profil = profil_for_matches.print_all()

        """lernvorlieben_id: Lernvorliebe zu Profil für das verglichen wird"""
        lernvorlieben_id = 0
        for i in range(len(profil) - 1, len(profil)):
            lernvorlieben_id = profil[i]

        lernvorlieben_for_matches = get_lernvorlieben_by_id(lernvorlieben_id)

        """lernvorlieben: Lernvorlieben zu dem Matches errechnet werden sollen"""
        lernvorlieben = lernvorlieben_for_matches.print_all()

        """Alle Profile auslesen."""
        result_profile = get_all_profil()


        """Profil-Match ausrechnen"""

        """prozentzahl_profil_all: Liste aller Prozentsätze zu jedem Profil
        all_person_id: Aller IDs der Personen mit denen verglichen wird"""
        prozentzahl_profil_all = []
        result_lernvorlieben = []
        all_person_id = []

        """For-Schleife mit allen Profilen die verglichen werden"""
        for p in result_profile:
            """Inhalt Profile die verglichen werden über eine Methode holen und in einer Liste speichern
                profil_to_match: Liste aller Attribute eines Profiles, mit denen verglichen wird"""
            profil_to_match = p.print_all()

            for i in range(0,1):
                all_person_id.append(profil_to_match[i])

            """Lernvorlieben-ID des einzelnen Profils"""
            lernvorlieben_id_to_matches = 0

            """Lernvorlieben-ID ausfiltern und in lernvorlieben_for_matches speichern"""
            for m in range(len(profil_to_match) - 1, len(profil_to_match)):
                lernvorlieben_id_to_matches = profil_to_match[m]

            """Nacheinander Lernvorlieben anhand der ID holen und in result_lernvorlieben abspeichern"""
            result_lernvorlieben.append(get_lernvorlieben_by_id(lernvorlieben_id_to_matches))

            """buff: Start der 2.For-Schleife, um ID beim Vergleich zu überspringen
                prozentzahl: Liste mit 1 für Match, um Anzahl der Matches zu zählen
                prozent_result: Prozentzahl des einzelnen Matches/Profil mit dem im Moment verglichen wird"""
            buff = 1
            prozentzahl_profil = []
            prozent_result_profil = 0
            anzahl_attribute = len(profil) - 2

            """For-Schleife für einzelne Profil"""
            for i in range(1, len(profil) - 1):
                """Gefilterte Werte (dargestellt als 0) abfangen und aus profil löschen"""
                if profil[i] == 0:
                    profil.remove(profil[i])
                    anzahl_attribute -= 1
                for j in range(buff, len(profil_to_match) - 1):
                    """Gefilterte Werte auch in profil_to_match löschen"""
                    if len(profil) != len(profil_to_match):
                        profil_to_match.remove(profil_to_match[j])
                    """Gleiche Werte abfragen"""
                    if profil[i] == profil_to_match[j]:
                        """1 hinzufügen bei Match"""
                        prozentzahl_profil.append(1)
                    """break, um Schleife abzubrechen und buff hochzählen um im nächsten Durchlauf das nächste Element zu vergleichen"""
                    buff += 1
                    break

            """Prozent berechnen"""
            """Gezählte Matches in prozent_result speichern"""
            for k in prozentzahl_profil:
                prozent_result_profil += k
            """Aus den Matches den Prozentsatz errechnen"""
            prozent_result_profil = (prozent_result_profil / anzahl_attribute) * 100
            """Ergebnis zu prozentzahl_profil_all hinzufügen"""
            prozentzahl_profil_all.append(prozent_result_profil)


        """Lernvorlieben-Match ausrechnen"""

        """prozentzahl_lernvorlieben_all: Liste aller Prozentsätze zu jedem Profil"""
        prozentzahl_lernvorlieben_all = []

        """For-Schleife mit allen Profilen die verglichen werden"""
        for l in result_lernvorlieben:
            """Inhalt Lernvorlieben die verglichen werden über eine Methode holen und in einer Liste speichern
                lernvorlieben_to_match: Liste aller Attribute eines Profiles, mit denen verglichen wird"""
            lernvorlieben_to_match = l.print_all()

            """buff: Start der 2.For-Schleife, um ID beim Vergleich zu überspringen
                prozentzahl: Liste mit 1 für Match, um Anzahl der Matches zu zählen
                prozent_result: Prozentzahl des einzelnen Matches/Profil mit dem im Moment verglichen wird"""
            buff2 = 1
            prozentzahl_lernvorlieben = []
            prozent_result_lernvorlieben = 0
            anzahl_attribute = len(lernvorlieben) - 1

            """For-Schleife für einzelne Profil"""
            for i in range(1, len(lernvorlieben)):
                for j in range(buff2, len(lernvorlieben_to_match)):
                    """Gleiche Werte abfragen"""
                    if lernvorlieben[i] == lernvorlieben_to_match[j]:
                        """1 hinzufügen bei Match"""
                        prozentzahl_lernvorlieben.append(1)
                    """break, um Schleife abzubrechen und buff hochzählen um im nächsten Durchlauf das nächste Element zu vergleichen"""
                    buff2 += 1
                    break

            """Prozent berechnen"""
            """Gezählte Matches in prozent_result speichern"""
            for k in prozentzahl_lernvorlieben:
                prozent_result_lernvorlieben += k
            """Aus den Matches den Prozentsatz errechnen"""
            prozent_result_lernvorlieben = (prozent_result_lernvorlieben / anzahl_attribute) * 100
            """Ergebnis zu prozentzahl_profil_all hinzufügen"""
            prozentzahl_lernvorlieben_all.append(prozent_result_lernvorlieben)


        """Insgesamtes Match ausrechnen"""
        buff3 = 0
        match_ges_all = []
        for i in range(len(prozentzahl_profil_all)):
            for j in range(buff3, len(prozentzahl_lernvorlieben_all)):
                match_ges = (prozentzahl_profil_all[i] + prozentzahl_lernvorlieben_all[j]) / 2
                buff3 += 1
                match_ges_all.append(match_ges)
                break

        """Vorschlag in DB speichern"""
        buff4 = 0
        for i in range(len(match_ges_all)):
            quote = i
            for j in range(buff4, len(all_person_id)):
                person_id = j
                create_vorschlag(person_id_for_matches, quote, lernfach, person_id)
                buff4 += 1
                break

        return get_vorschlag_by_main_person_id(person_id_for_matches)


