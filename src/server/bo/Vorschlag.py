from server.bo import BusinessObject as bo

class Vorschlag():

    def __init__(self, matches):
        self._matches = matches
        """Auslesen der Matches"""

    def get_matches(self):
        for i in self._matches:
            vorschlag = i
            return vorschlag
        """Setzen der Vorschläge"""


