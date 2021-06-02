from .NamedBusinessObject import NamedBusinessObject

class Lerngruppe(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._teilnehmer = []
        self._gruppenprofil = Profil

    def get_teilnehmer(self):
        """Auslesen eines Teilnehmers"""
        return self._teilnehmer

    def set_teilnehmer(self, teilnehmer):
        """Setzen eines Teilnehmers"""
        self._teilnehmer = teilnehmer

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
        obj.set_gruppenprofil(dictionary["gruppenprofil"])
        obj.set_teilnehmer(dictionary["teilnehmer"])
        return obj
