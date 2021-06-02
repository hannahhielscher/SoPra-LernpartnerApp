from server.bo import BusinessObject as bo
from server.bo import Nachricht 

class Konversation (bo.BusinessObject, Nachricht):
    
    def __init__(self):
        super().__init__()
        self._nachrichten = []
        self._teilnehmer = TeilnahmeChat

    def neue_nachricht(self):
        """Neue Nachricht erstellen und zu Liste hinzufügen"""
        neue_nachricht = Nachricht()
        self._nachrichten += [neue_nachricht]
        
    def get_teilnehmer(self):
        """Auslesen von Teilnehmern"""
        return self._teilnehmer

    def set_teilnehmer(self):
        """Setzten von neuen Teilnehmern"""
        self._teilnehmer = []
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Konversation()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_nachrichten(dictionary["nachrichten"])
        obj.set_teilnehmer(dictionary['teilnehmer'])
        return obj

    