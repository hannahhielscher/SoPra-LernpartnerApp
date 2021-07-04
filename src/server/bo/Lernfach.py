from server.bo.BusinessObject import BusinessObject


class Lernfach(BusinessObject):
    """Realisierung eines Lernfachs.

    Ein Lernfach hat eine Bezeichnung, die den Namen des zu lernenden Moduls meint.
    """
    def __init__(self):
        super().__init__()
        self._bezeichnung = None #Bezeichnung des Lernfachs

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung des Lernfachs"""
        return self._bezeichnung

    def set_bezeichnung(self,bezeichnung):
        """Setzen einer Bezeichnung für ein Lernfach"""
        self._bezeichnung = bezeichnung
    
    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Lernfach() """
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj