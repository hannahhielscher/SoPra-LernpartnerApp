from server.bo.NamedBusinessObject import NamedBusinessObject


class Konversation (NamedBusinessObject):
    
    def __init__(self):
        super().__init__()
        self._anfragestatus = False

    def get_anfragestatus(self):
        """Auslesen des Anfragestatus"""
        return self._anfragestatus

    def set_anfragestatus(self, anfragestatus):
        self._anfragestatus = anfragestatus
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Konversation()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_anfragstatus(dictionary["anfragestatus"])

        return obj

    