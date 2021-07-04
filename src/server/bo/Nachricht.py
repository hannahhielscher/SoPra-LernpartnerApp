from .BusinessObject import BusinessObject


class Nachricht(BusinessObject):
    """Realisierung einer Nachricht.

    Eine Nachricht besitzt einen Nachrichteninhalt, Person ID, die den Absender identifiziert,
    und eine Konversation ID, um die zugehörige Konversation zu identifizieren.
    """
    def __init__(self):
        super().__init__()
        self._nachricht_inhalt = "" #Inhalt der Nachricht
        self._person_id = 0 #PersonID (Sender) der Nachricht
        self._konversation_id = 0 #Konversation ID (Empfaenger) der Nachricht

    def get_nachricht_inhalt(self):
        """Auslesen des Inhalts einer Nachricht"""
        return self._nachricht_inhalt

    def set_nachricht_inhalt(self, inhalt):
        """Setzen des Inhalts einer Nachricht"""
        self._nachricht_inhalt = inhalt

    def get_person_id(self):
        """Auslesen des Senders der Nachricht"""
        return self._person_id
    
    def set_person_id(self, person_id):
        """Setzen des Senders der Nachricht"""
        self._person_id = person_id
    
    def get_konversation_id(self):
        """Auslesen Konversation der Nachricht"""
        return self._konversation_id
    
    def set_konversation_id(self, konversation_id):
        """Setzen Konversation der Nachricht"""
        self._konversation_id = konversation_id

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Nachricht()"""
        obj = Nachricht()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_nachricht_inhalt(dictionary["nachricht_inhalt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_konversation_id(dictionary["konversation_id"])
        return obj