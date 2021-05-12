from server.bo.NamedBusinessObject import NamedBusinessObject


class Profil(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._hochschule = None
        self._studiengang = None
        self._semester = None
        self._lernfaecher = None
        self._kenntnisstand = None
        self._selbsteinschaetzung = None

    def get_all_profil(self):
        """Auslesen des Vornamens"""
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

    def get_hochschule(self):
        """Auslesen der Hochschule"""
        return self._hochschule

    def set_hochschule(self):
        """Setzen der Hochschule"""
        self._alter = value

    def get_studiengang(self):
        """Auslesen des Studiengangs"""
        return self._studiengang

    def set_studiengang(self):
        """Setzen des Studiengangs"""
        self._geschlecht = value

    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester

    def set_semester(self):
        """Setzen des Semesters"""
        self._lerngruppe = value

    def get_lernfaecher(self):
        """Auslesen der Lernfächer"""
        return self._lernvorlieben

    def set_lernfaecher(self):
        """Setzen der Lernfächer"""
        self._lernvorlieben = value

    def get_kenntnisstand(self):
        """Auslesen des Kenntnisstandes"""
        return self._kenntnisstand

    def set_kenntnisstand(self):
        """Setzen des Kenntnisstandes"""
        return self._kenntnisstand

    def get_selbsteinschätzung(self):
        """Auslesen der Selbsteinschätzung"""
        return self._selbsteinschsetzung

    def set_selbsteinschätzung(self):
        """Setzen der Selbsteinschätzung"""
        self._personenprofil = value

    """def create_personenprofil(self):? oder gehört das in AppAdministration? da haben wir ja auch so ne methode"""

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._vorname, self._semester,
                                                   self._alter, self._geschlecht, self._lerngruppe, self._lernvorlieben,
                                                   self._personenprofil)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Person() """
        obj = Profil()
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