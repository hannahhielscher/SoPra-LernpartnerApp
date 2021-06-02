from server.bo.NamedBusinessObject import NamedBusinessObject


class Profil (NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._hochschule = ""
        self._studiengang = ""
        self._semester = 0
        self._lernfaecher = []
        
    def get_hochschule(self):
        """Auslesen der Hochschule"""
        return self._hochschule

    def set_hochschule(self, hochschule_neu):
        """Setzen der Hochschule"""
        self._hochschule = hochschule_neu

    def get_studiengang(self):
        """Auslesen des Studiengangs"""
        return self._studiengang

    def set_studiengang(self, studiengang_neu):
        """Setzen des Studiengangs"""
        self._studiengang = studiengang_neu

    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester

    def set_semester(self, semester_neu):
        """Setzen des Semesters"""
        self._semester = semester_neu

    def get_lernfaecher(self):
        """Auslesen der Lernfächer"""
        return self._lernvorlieben

    def set_lernfaecher(self, lernfaecher_neu):
        """Setzen der Lernfächer"""
        self._lernfaecher = lernfaecher_neu
    
        """Dictionary befüllen: Mit jeweils einem Lernfach und Kenntnisstand"""

    def get_all(self):
        inhalt = [self.id, self.studiengang, self.abschluss, self.semester, self.lernvorlieben]
        return inhalt

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._hochschule, self._studiengang,
                                                   self._semester, self._lernfaecher, self._kenntnisstand, self._selbsteinschaetzung)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Person() """
        obj = Profil()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_hochschule(dictionary["hochschule"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_semester(dictionary["semester"])
        obj.set_lernfaecher(dictionary["lernfaecher"])
        obj.set_selbsteinschätzung(dictionary["selbsteinschaetzung"])
        obj.set_profil_by_id(dictionary["lernvorlieben"])
        return obj