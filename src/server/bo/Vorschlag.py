from server.bo import BusinessObject as bo

class Vorschlag(bo.BusinessObject):

    def __init__(self, main_person_id, match_quote, lernfach, person_id):
        self._main_person_id = main_person_id
        self._match_quote = match_quote
        self.lernfach = lernfach
        self._person_id = person_id

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

    def get_lernfach(self):
        """Auslesen des Lernfaches"""
        return self._lernfach

    def set_lernfach(self, lernfach):
        """Auslesen des Lernfaches"""
        self._lernfach = lernfach

    def get_person_id(self):
        """Auslesen der Personen mit denen verglichen wird"""
        return self._person_id

    def set_person_id(self, person_id):
        """Setzen der Personen mit denen verglichen wird"""
        self._person_id = person_id


