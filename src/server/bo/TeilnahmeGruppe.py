from server.bo import BusinessObject as bo


class TeilnahmeGruppe (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._status = False
        self._teilnehmer= None
        self._lerngruppe= None

    def get_teilnehmer(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer
    
    def set_teilnehmer(self, teilnehmer):
        """setzten des Teilnehmers"""
        self._teilnehmer= teilnehmer

    def get_lerngruppe(self):
        """Auslesen der Lerngruppe"""
        return self._lerngruppe
    
    def set_lerngruppe(self, lerngruppe):
        """setzten der neuen Lerngruppe"""
        self._lerngruppe= lerngruppe


    def get_status(self):
        """Auslesen vom Status"""
        return self._status

    def set_status(self, value):
        """aktuellen Status setzten"""
        self._status= value
        

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = TeilnahmeGruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_status(dictionary['status'])
        obj.set_lerngruppe(dictionary['lerngruppe'])
        obj.set_teilnehmer(dictionary['teilnehmer'])
        return obj