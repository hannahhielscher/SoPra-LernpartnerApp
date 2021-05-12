from server.bo import BusinessObject as bo


class Konversation (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._nachricht = Nachricht
        self._teilnehmer= list

    def get_nachricht(self):
        """Auslesen der Nachricht"""
        return self._nachricht

    def get_teilnehmer(self):
        """Auslesen von Teilnehmern"""
        return self._teilnehmer

    def set_teilnehmer(self):
        """Setzten von neuen Teilnehmern"""
        self._teilnehmer= list
    
     @staticmethod
    def from_dict(dictionary=dict()):
        obj = Konversation()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_teilnehmer(dictionary['teilnehmer'])
        return obj

    