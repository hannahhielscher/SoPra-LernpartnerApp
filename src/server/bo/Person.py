from server.bo.NamedBusinessObject import NamedBusinessObject

class Person(NamedBusinessObject):
    
    def __init__(self):
        super().__init__()
        self._vorname = None
        self._semester = None
        self._alter = None
        self._geschlecht = None
        self._lerngruppe = None
        self._lernvorlieben = bo.Lernvorlieben
        self._personenprofil = bo.Profil

    def get_vorname(self):
        """Auslesen des Vornamens"""
        return self._vorname

    def set_vorname(self):
        """Setzen des Vornamens"""
        self._vorname = value

    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester

    def set_semester(self):
        """Setzen des Semesters"""
        self._semester = value

    def get_alter(self):
        """Auslesen des Alters"""
        return self._alter

    def set_alter(self):
        """Setzen des Alters"""
        self._alter = value

    def get_geschlecht(self):
        """Auslesen des Geschlechts"""
        return self._geschlecht

    def set_geschlecht(self):
        """Setzen des Geschlechts"""
        self._geschlecht = value
    
    def get_lerngruppe(self):
        """Auslesen, ob Lerngruppe erwünscht ist"""
        return self._lerngruppe 

    def set_lerngruppe(self):
        """Setzen, ob Lerngruppe erwünscht ist"""
        self._lerngruppe = value

    def get_lernvorlieben(self):
        return self._lernvorlieben

    def set_lernvorlieben(self):
        """Setzen von neuen Lernvorlieben"""
        self._lernvorlieben = value
    
    def get_all_lerngruppen_of_Person(self):
        """Auslesen aller Lerngruppen einer Person, gehört das überhaupt hier rein?"""
        return self._lernvorlieben

    def get_personenprofil(self):
        """Auslesen des Personenprofils"""
        return self._personenprofil

    def set_personenprofil(self):
        """Setzen eines Lernprofils (geht das überhaupt?)"""
        self._personenprofil = value

    """def create_personenprofil(self):? oder gehört das in AppAdministration? da haben wir ja auch so ne methode"""

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._vorname, self._semester, self._alter, self._geschlecht, self._lerngruppe, self._lernvorlieben, self._personenprofil)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Person() """
        obj = Person()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_semester(dictionary["semester"])
        obj.set_alter(dictionary["alter"])
        obj.set_geschlecht(dictionary["geschlecht"])
        obj.set_lerngruppe(dictionary["lerngruppe"])
        obj.set_lernvorlieben(dictionary["lernvorlieben"])
        obj.set_personenprofil(dictionary["personenprofil"])
        return obj

