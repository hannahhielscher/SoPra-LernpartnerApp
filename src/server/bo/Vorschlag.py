from server.bo import BusinessObject as bo

class Vorschlag():

    def __init__(self, match):
        self._match_quote = match
        self._profil_id = None

    def get_match(self):
        """Auslesen der Matches"""
        return self._match_quote

    def get_profil_id(self):
        """Auslesen des Personenprofils"""
        return self._profil_id

    def set_profil_id(self, value):
        """Setzen eines Lernprofils (geht das überhaupt?)"""
        self._profil_id = value


