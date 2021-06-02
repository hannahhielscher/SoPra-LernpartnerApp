from server.bo.NamedBusinessObject import NamedBusinessObject


class Profil (NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._studiengang = None
        self._semester = 0
        self._lernfaecher = None
        self._lernvorlieben = None

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
        return self._llernfaecher

    def set_lernfaecher(self, lernfaecher_neu):
        """Setzen der Lernfächer"""
        self._lernfaecher = lernfaecher_neu

    def get_lernvorlieben(self):
        """Auslesen der Lernfächer"""
        return self._lernvorlieben

    def set_lernvorlieben(self, _lernvorlieben):
        """Setzen der Lernfächer"""
        self._lernvorlieben = self._lernvorlieben

    def get_all(self):
        inhalt = [self.id, self.studiengang, self.semester, self._lernfaecher, self.lernvorlieben]
        return inhalt

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Profil: {}, {}, {}, {}".format(self._studiengang, self._semester, self._lernfaecher, self._lernvorlieben)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Profil() """
        obj = Profil()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_semester(dictionary["semester"])
        obj.set_lernfaecher(dictionary["lernfaecher"])
        obj.set_lernvorlieben(dictionary["lernvorlieben"])
        return obj