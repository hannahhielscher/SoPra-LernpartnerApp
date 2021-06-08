from server.bo.BusinessObject import BusinessObject


class Profil (BusinessObject):

    def __init__(self):
        super().__init__()
        self._gruppe = False
        self._studiengang = None
        self._semester = 0
        self._lernfaecher = []
        self._lernvorlieben = None

    def get_gruppe(self):
        return self._gruppe
    
    def set_gruppe(self, gruppe_neu):
        self._gruppe = gruppe_neu

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
        return self._lernfaecher

    def set_lernfaecher(self, lernfaecher_neu):
        """Setzen der Lernfächer"""
        self._lernfaecher = lernfaecher_neu

    def get_lernvorlieben_id(self):
        """Auslesen der Lernfächer"""
        return self._lernvorlieben_id

    def set_lernvorlieben_id(self, lernvorlieben_id):
        """Setzen der Lernfächer"""
        self._lernvorlieben_id = lernvorlieben_id

    def get_all(self):
        inhalt = [self.id, self.gruppe, self.studiengang, self.semester, self._lernfaecher, self._lernvorlieben_id]
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