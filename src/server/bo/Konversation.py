from server.bo import BusinessObject as bo


class Konversation (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._nachricht = Nachricht
        self._teilnehmer= list

    def get_nachricht(self):
        return self._nachricht

    def get_teilnehmer(self):
        return self.

    def set_teilnehmer(self):
        self._teilnehmer= teilnehmer_neu: list