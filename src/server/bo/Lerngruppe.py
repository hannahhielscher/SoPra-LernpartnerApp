from .NamedBusinessObject import NamedBusinessObject

class Lerngruppe(NamedBusinessObject):
    """Realisierung einer Lerngruppe.

    Eine Lerngruppe hat ein Profil, das über die ID gespeichert wird.
    """
    def __init__(self):
        super().__init__()
        self._profil = None #Profil (ID) der Lerngruppe

    def get_profil(self):
        """Auslesen eines Gruppenprofils"""
        return self._profil

    def set_profil(self, profil):
        """Setzen eines Gruppenprofils"""
        self._profil = profil

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Lerngruppe: {}, {}".format(self._name, self._profil)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Lerngruppe() """
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"]) #NBO
        obj.set_profil(dictionary["profil"])
        return obj
