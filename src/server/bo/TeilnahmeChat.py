from server.bo import BusinessObject as bo


class TeilnahmeChat(bo.BusinessObject):
    """Realisierung einer TeilnahmeChat.

    Eine TeilnahmeChat besitzt einen Teilnehmer, einen Anfrage Sender, einen Status der aussagt, ob
    die Teilnahme angenommen wurde oder nicht, und eine zugehörige Konversation.
    """
    def __init__(self):
        super().__init__()
        self._teilnehmer = None #Teilnehmer der TeilnahmeChat
        self._anfrage_sender = None #Anfrage Sender der TeilnahmeChat
        self._status = False #Status der TeilnahmeChat
        self._konversation = None #Konversation der TeilnahmeChat

    def get_teilnehmer(self):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer
    
    def set_teilnehmer(self, value):
        """setzten des Teilnehmers"""
        self._teilnehmer= value

    def get_anfrage_sender(self):
        """Auslesen des Anfragesenders"""
        return self._anfrage_sender

    def set_anfrage_sender(self, value):
        """Setzten des Anfragesenders"""
        self._anfrage_sender = value

    def get_status(self):
        """Auslesen der Lerngruppe"""
        return self._status

    def set_status(self, value):
        """Setzten der neuen Lerngruppe"""
        self._status = value

    def get_konversation(self):
        """Auslesen der Lerngruppe"""
        return self._konversation
    
    def set_konversation(self, value):
        """Setzten der neuen Lerngruppe"""
        self._konversation = value

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "TeilnahmeChat: {}, {}, {}, {}".format(self._teilnehmer, self._anfrage_sender, self._status, self._konversation)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine TeilnahmeChat()."""
        obj = TeilnahmeChat()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_teilnehmer(dictionary['teilnehmer'])
        obj.set_anfrage_sender(dictionary['anfrage_sender'])
        obj.set_status(dictionary['status'])
        obj.set_konversation(dictionary['konversation'])
        return obj