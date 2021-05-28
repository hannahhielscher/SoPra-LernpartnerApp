from .bo.Konversation import Konversation
from .bo.Lerngruppe import Lerngruppe
from .bo.Nachricht import Nachricht
from .bo.Person import Person
from .bo.Profil import Profil
#from .bo.TeilnahmeChat import TeilnahmeChat
#from .bo.TeilnahmeGruppe import TeilnahmeGruppe
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
    
    def delete_UserById(self, personId):
        """Eine Person löschen"""
        with PersonMapper() as mapper:
            return mapper.deleteByID(personId)

    """
    Customer-spezifische Methoden
    """


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
    Pflege der Konstante für das Bar-Konto der Bank
    """


    """
    Transaction-spezifische Methoden
    """

    """
    Vorschlag-spezifische Methoden
    """
