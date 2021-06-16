from server.bo import BusinessObject as bo

class Vorschlag(bo.BusinessObject):

    def __init__(self):
        self._main_person_id = 0
        self._match_quote = 0
        self._lernfaecher_id = 0
        self._match_profil_id = 0

    def get_main_person_id(self):
        """Auslesen der Person zu der verglichen wird"""
        return self._main_person_id

    def set_main_person_id(self, main_person_id):
        """Setzen der Person zu der verglichen wird"""
        self._main_person_id = main_person_id

    def get_match_quote(self):
        """Auslesen des Matches"""
        return self._match_quote

    def set_match_quote(self, match_quote):
        """Auslesen des Matches"""
        self._match_quote = match_quote

    def get_lernfaecher_id(self):
        """Auslesen des Lernfaches"""
        return self._lernfaecher_id

    def set_lernfaecher_id(self, lernfaecher_id):
        """Auslesen des Lernfaches"""
        self._lernfaecher_id = lernfaecher_id

    def get_match_profil_id(self):
        """Auslesen der Personen mit denen verglichen wird"""
        return self._match_profil_id

    def set_match_profil_id(self, match_profil_id):
        """Setzen der Personen mit denen verglichen wird"""
        self._match_profil_id = match_profil_id

    def get_all(self):
        inhalt = [self.id, self._main_person_id, self._match_quote, self._lernfaecher_id, self._match_profil_id]
        return inhalt

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Profil: {}, {}, {}".format(self._main_person_id, self._match_quote, self._lernfaecher_id, self._match_profil_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Profil() """
        obj = Vorschlag()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_main_person_id(dictionary["main_person_id"])
        obj.set_match_quote(dictionary["match_quote"])
        obj.set_lernfaecher_id(dictionary["lernfaecher_id"])
        obj.set_profil_id(dictionary["match_profil_id"])
        return obj

