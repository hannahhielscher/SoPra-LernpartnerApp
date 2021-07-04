from server.bo.NamedBusinessObject import NamedBusinessObject


class Konversation (NamedBusinessObject):
    """Realisierung einer Konversation.

    Eine Konversation besitzt einen Anfragestatus um zu überprüfen, ob die Konversation von
    allen Gesprächspartnern akzeptiert wurde. Über den Status werden die Konversationen abgefragt.
    """
    def __init__(self):
        super().__init__()
        self._anfragestatus = False #Der Anfragestatus der Konversation

    def get_anfragestatus(self):
        """Auslesen des Anfragestatus"""
        return self._anfragestatus

    def set_anfragestatus(self, anfragestatus):
        """"Setzen des Anfragestatus"""
        self._anfragestatus = anfragestatus

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Konversation: {}, {}, {}".format(self.get_id(), self._name, self._anfragestatus)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Konversation() """
        obj = Konversation()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_anfragestatus(dictionary["anfragestatus"])

        return obj