from .BusinessObject import BusinessObject


class Nachricht(BusinessObject):

    def __init__(self):
        super().__init__()
        self._inhalt = ""

    def get_inhalt(self):
        """Auslesen einer Nachricht"""
        return self._inhalt

    def set_inhalt(self, inhalt):
        """Verfassen einer Nachricht"""
        self._inhalt = inhalt


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Nachricht()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_inhalt(dictionary["inhalt"])
        return obj