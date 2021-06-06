from server.bo import BusinessObject as bo


class TeilnahmeChat(bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._teilnehmer = None
        self._konversation = None

    def get_teilnehmer(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer
    
    def set_teilnehmer(self, value):
        """setzten des Teilnehmers"""
        self._teilnehmer= value

    def get_konversation(self):
        """Auslesen der Lerngruppe"""
        return self._konversation
    
    def set_konversation(self, value):
        """setzten der neuen Lerngruppe"""
        self._konversation = value
        

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = TeilnahmeChat()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_teilnehmer(dictionary['teilnehmer'])
        obj.set_konversation(dictionary['konversation'])
        return obj