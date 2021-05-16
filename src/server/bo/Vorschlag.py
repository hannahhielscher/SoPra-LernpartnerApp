from server.bo import BusinessObject as bo

class Vorschlag():

    def __init__(self, matches):
        self._matches = matches

    def get_matches(self):
        for i in self._matches:
            vorschlag = i
            return vorschlag

    def set_matches(self):
        return 


