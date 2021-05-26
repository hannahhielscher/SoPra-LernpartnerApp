from server.bo import BusinessObject as bo


class TeilnahmeChat(bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._person = False
        self._konversation = None

    def get_person(self):
        """Auslesen des Teilnehmers"""
        return self._person
    
    def set_person(self, person_id):
        """setzten des Teilnehmers"""
        self._teilnehmer= person_id

    def get_konversation(self):
        """Auslesen der Lerngruppe"""
        return self._konversation
    
    def set_konversation(self, konversation_id):
        """setzten der neuen Lerngruppe"""
        self._konversation = konversation_id
        

    @staticmethod
    def from_dict(dictionary=dict()):
         """Umwandeln eines Python dict() in einen User()."""
        obj = TeilnahmeChat()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_person(dictionary['person'])
        obj.set_konversation(dictionary['konversation'])
        return obj