from server.bo import BusinessObject as bo


class TeilnahmeGruppe (bo.BusinessObject):
    """Realisierung einer TeilnahmeGruppe.

    Eine TeilnahmeGruppe besitzt einen Teilnehmer und eine zugehörige Lerngruppe.
    """
    def __init__(self):
        super().__init__()
        self._teilnehmer = None #Teilnehmer der TeilnahmeGruppe
        self._lerngruppe = 0 #Lerngruppe der TeilnahmeGruppe

    def get_teilnehmer(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer
    
    def set_teilnehmer(self, teilnehmer):
        """setzten des Teilnehmers"""
        self._teilnehmer = teilnehmer

    def get_lerngruppe(self):
        """Auslesen der Lerngruppe"""
        return self._lerngruppe
    
    def set_lerngruppe(self, lerngruppe):
        """setzten der neuen Lerngruppe"""
        self._lerngruppe = lerngruppe

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "TeilnahmeGruppe: {}, {}".format(self._teilnehmer, self._lerngruppe)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine TeilnahmeGruppe()."""
        obj = TeilnahmeGruppe()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_teilnehmer(dictionary['teilnehmer'])
        obj.set_lerngruppe(dictionary['lerngruppe'])
        return obj