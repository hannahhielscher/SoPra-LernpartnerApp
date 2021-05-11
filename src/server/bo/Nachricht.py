from .BusinessObject import BusinessObject


class Nachricht(BusinessObject):

    def __init__(self):
        super().__init__()
        self._nachricht = ""

    def set_nachricht(self, nachricht):
        """Verfassen einer Nachricht"""
        self._nachricht = nachricht

    def get_nachricht(self):
        """Auslesen einer Nachricht"""
        return self._nachricht


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Nachricht()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_erstellungszeitpunkt(dictionary['erstellungszeitpunkt'])
        obj.set_nachricht(dictionary["nachricht"])
        return obj