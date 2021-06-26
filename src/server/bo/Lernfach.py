from server.bo.BusinessObject import BusinessObject


class Lernfach(BusinessObject):

    def __init__(self):
        super().__init__()
        self._bezeichnung = None 

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung des Lernfachs"""
        return self._bezeichnung

    def set_bezeichnung(self,bezeichnung):
        """Setzen einer Bezeuchnung für ein Lernfach"""
        self._bezeichnung = bezeichnung

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj