from server.bo import BusinessObject as bo


class TeilnahmeChat(bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._teilnehmer = None
        self._anfrage_sender = None
        self._status = False
        self._konversation = None

    def get_teilnehmer(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer
    
    def set_teilnehmer(self, value):
        """setzten des Teilnehmers"""
        self._teilnehmer= value

    def get_anfrage_sender(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer

    def set_anfrage_sender(self, value):
        """setzten des Teilnehmers"""
        self._anfrage_sender = value

    def get_status(self):
        """Auslesen der Lerngruppe"""
        return self._status

    def set_status(self, value):
        """setzten der neuen Lerngruppe"""
        self._status = value

    def get_konversation(self):
        """Auslesen der Lerngruppe"""
        return self._konversation
    
    def set_konversation(self, value):
        """setzten der neuen Lerngruppe"""
        self._konversation = value

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "TeilnahmeChat: {}, {}, {}, {}".format(self._teilnehmer, self._anfrage_sender, self._status, self._konversation)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = TeilnahmeChat()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_teilnehmer(dictionary['teilnehmer'])
        obj.set_anfrage_sender(dictionary['anfrage_sender'])
        obj.set_status(dictionary['status'])
        obj.set_konversation(dictionary['konversation'])
        return obj