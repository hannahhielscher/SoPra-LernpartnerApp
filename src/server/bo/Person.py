from server.bo.NamedBusinessObject import NamedBusinessObject
from datetime import date, datetime

class Person(NamedBusinessObject):
    """Realisierung einer Person.

    Eine Person besitzt einen Vornamen, Semester, Studiengang, Alter, Geschlecht, die Information, 
    ob sie an einer Lerngruppe identifiziert ist, eine eindeutige Google User ID, eine Email und ein
    Profil.
    """
    def __init__(self):
        super().__init__()
        self._vorname = None #Vorname der Person
        self._semester = 0 #Semester der Person
        self._studiengang = None #Studiengang der Person
        self._alter = 0 #Alter der Person
        self._geschlecht = None #Geschlecht der Person
        self._lerngruppe = False #Info, ob die Person interessiert ist an einer Lerngruppe
        self._google_user_id = None #Eindeutige Google User ID der Person
        self._email = None #Email der Person
        self._profil = None #Profil ID der Person

    def get_vorname(self):
        """Auslesen des Vornamens"""
        return self._vorname

    def set_vorname(self, vorname):
        """Setzen des Vornamens"""
        self._vorname = vorname

    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester
    
    def set_semester(self, value):
        """Setzen des Semesters"""
        self._semester = value

    def get_studiengang(self):
        """Auslesen des studiengangs"""
        return self._studiengang
    
    def set_studiengang(self, value):
        """Setzen des studiengangs"""
        self._studiengang = value

    def get_alter(self):
        """Auslesen des Alters"""
        return self._alter

    def set_alter(self, alter):
        """Setzen des Alters"""
        self._alter = alter

    def get_geschlecht(self):
        """Auslesen des Geschlechts"""
        return self._geschlecht

    def set_geschlecht(self, geschlecht):
        """Setzen des Geschlechts"""
        self._geschlecht = geschlecht
    
    def get_lerngruppe(self):
        """Auslesen, ob Lerngruppe erwünscht ist"""
        return self._lerngruppe 

    def set_lerngruppe(self, value):
        """Setzen, ob Lerngruppe erwünscht ist"""
        self._lerngruppe = value

    def get_google_user_id(self):
        """ Auslesen der Google User ID"""
        return self._google_user_id

    def set_google_user_id(self, value):
        """ Setzen der Google User ID"""
        self._google_user_id = value
        
    def get_email(self):
        """ Auslesen der Email-Adresse"""
        return self._email

    def set_email(self, value):
        """ Setzen der Email """
        self._email = value
    
    def get_profil(self):
        """Auslesen des Personenprofils"""
        return self._profil

    def set_profil(self, value):
        """Setzen eines Lernprofils"""
        self._profil = value

    def get_all(self):
        inhalt = [self.id, self.name, self._vorname, self._alter, self._semester, self._studiengang, self._geschlecht, self._lerngruppe, self._email, self._profil]
        return inhalt


    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._vorname, self._semester, self._studiengang, self._alter, self._geschlecht, self._profil)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Person() """
        obj = Person()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"]) #NBO
        obj.set_vorname(dictionary["vorname"])
        obj.set_semester(dictionary["semester"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_alter(dictionary["alter"])
        obj.set_geschlecht(dictionary["geschlecht"])
        obj.set_lerngruppe(dictionary["lerngruppe"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_email(dictionary["email"])
        obj.set_profil(dictionary["profil"])
        return obj