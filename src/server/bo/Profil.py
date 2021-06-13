from server.bo.BusinessObject import BusinessObject


class Profil (BusinessObject):

    def __init__(self):
        super().__init__()
        self._gruppe = False
        self._lernfaecher = []
        self._lernvorlieben_id = None

    def get_gruppe(self):
        return self._gruppe
    
    def set_gruppe(self, gruppe_neu):
        self._gruppe = gruppe_neu

    def get_lernfaecher(self):
        """Auslesen der Lernfächer"""
        return self._lernfaecher

    def set_lernfaecher(self, lernfach_neu):
        """Setzen der Lernfächer"""
        self._lernfaecher.append(lernfach_neu)

    def get_lernvorlieben_id(self):
        """Auslesen der Lernfächer"""
        return self._lernvorlieben_id

    def set_lernvorlieben_id(self, lernvorlieben_id):
        """Setzen der Lernfächer"""
        self._lernvorlieben_id = lernvorlieben_id

    def get_all(self):
        inhalt = [self.id, self.gruppe, self._lernfaecher, self._lernvorlieben_id]
        return inhalt

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Profil: {}, {}, {}".format(self._gruppe, self._lernfaecher, self._lernvorlieben_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Profil() """
        obj = Profil()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_gruppe(dictionary["gruppe"])
        obj.set_lernfaecher(dictionary["lernfaecher"])
        obj.set_lernvorlieben_id(dictionary["lernvorlieben"])
        return obj