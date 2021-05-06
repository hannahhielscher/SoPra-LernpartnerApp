from server.bo import BusinessObject as bo


class Teilnahme (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._status = bool

    def get_status(self):
        """Auslesen vom Status"""
        return self._status

    def set_status(self, person):
        """aktuellen Status setzten"""
        self._status= bool

    @staticmethod
    def from_dict(dictionary=dict()):
         """Umwandeln eines Python dict() in einen User()."""
        obj = Teilnahme()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        return obj