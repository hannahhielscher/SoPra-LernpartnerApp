from .NamedBusinessObject import NamedBusinessObject

class Lerngruppe(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._gruppenprofil = None

    def get_gruppenprofil(self):
        """Auslesen eines Gruppenprofils"""
        return self._gruppenprofil

    def set_gruppenprofil(self, gruppenprofil):
        """Setzen eines Gruppenprofils"""
        self._gruppenprofil = gruppenprofil

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        #obj.set_teilnehmer(dictionary["teilnehmer"])
        obj.set_gruppenprofil(dictionary["gruppenprofil"])
        return obj
