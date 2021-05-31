from server.bo import BusinessObject as bo

class Vorschlag():

    def __init__(self, match):
        self._match_quote = match

    """Auslesen der Matches"""
    def get_match(self):
        return self._match_quote


