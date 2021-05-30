from.bo.Konversation import Konversation
from.bo.Lerngruppe import Lerngruppe
from.bo.Nachricht import Nachricht
from.bo.Person import Person
from.bo.Profil import Profil
#from.bo.TeilnahmeChat import TeilnahmeChat
#from.bo.TeilnahmeGruppe import TeilnahmeGruppe
from.bo.Vorschlag import Vorschlag

from.db.KonversationMapper import KonversationMapper
from.db.NachrichtMapper import NachrichtMapper
from.db.PersonMapper import PersonMapper
from.db.ProfilMapper import ProfilMapper
from.db.TeilnahmeChatMapper import TeilnahmeChatMapper


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
    
    def delete_UserById(self, personId):
        """Eine Person löschen"""
        with PersonMapper() as mapper:
            return mapper.deleteByID(personId)


    """
    Profil-spezifische Methoden
    """
    def get_all_profil(self):
        """Auslesen aller Profile"""
        return self._vorname

    def set_profil_by_id(self):
        """Setzen des Vornamens"""
        self._vorname = value

    def save_profil(self):
        """Auslesen des Semesters"""
        return self._semester

    def delete_profil(self):
        """Setzen des Semesters"""
        self._semester = value


    """
    Lernvorlieben-spezifische Methoden
    """


    """
    Lerngruppen-spezifische Methoden
    """

    """
    Nachricht-spezifische Methoden
    """

    """
    TeilnahmeChats-spezifische Methoden
    """
    
    """
    Vorschlag-spezifische Methoden
    """
    def match_berechnen(self, profil_for_matches):
        """Alle Profile auslesen."""
        with ProfilMapper() as mapper:
            result_profile = mapper.find_all()

        """profil: Profil zu dem Matches errechnet werden sollen"""
        profil = profil_for_matches.print_all()

        """lernvorlieben_id: Lernvorliebe zu Profil für das verglichen wird"""
        lernvorlieben_id = 0
        for i in range(len(profil) - 1, len(profil)):
            lernvorlieben_id = profil[i]

        with LernvorliebenMapper() as mapper:
            lernvorlieben_for_matches = mapper.find_by_id(lernvorlieben_id)


        """Profil-Match ausrechnen"""

        """prozentzahl_profil_all: Liste aller Prozentsätze zu jedem Profil"""
        prozentzahl_profil_all = []
        result_lernvorlieben = []

        """For-Schleife mit allen Profilen die verglichen werden"""
        for p in result_profile:
            """Inhalt Profile die verglichen werden über eine Methode holen und in einer Liste speichern
                profil_to_match: Liste aller Attribute eines Profiles, mit denen verglichen wird"""
            profil_to_match = p.print_all()

            """Lernvorlieben-ID des einzelnen Profils"""
            lernvorlieben_id_to_matches = 0

            """Lernvorlieben-ID ausfiltern und in lernvorlieben_for_matches speichern"""
            for m in range(len(profil_to_match) - 1, len(profil_to_match)):
                lernvorlieben_id_to_matches = profil_to_match[m]

            """Nacheinander Lernvorlieben anhand der ID holen und in result_lernvorlieben abspeichern"""
            with LernvorliebenMapper() as mapper:
                result_lernvorlieben.append(mapper.find_by_id(lernvorlieben_id_to_matches))

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

        """lernvorlieben: Lernvorlieben zu dem Matches errechnet werden sollen
            prozentzahl_lernvorlieben_all: Liste aller Prozentsätze zu jedem Profil"""
        lernvorlieben = lernvorlieben_for_matches.print_all()
        prozentzahl_lernvorlieben_all = []

        """For-Schleife mit allen Profilen die verglichen werden"""
        for l in result_lernvorlieben:
            """Inhalt Profile die verglichen werden über eine Methode holen und in einer Liste speichern
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

        return match_ges_all