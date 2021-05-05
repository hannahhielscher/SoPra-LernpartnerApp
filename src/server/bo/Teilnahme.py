from server.bo import BusinessObject as bo


class Teilnahme (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._status = bool

    def get_status(self):
        return self._status

    def set_status(self, person):
        self._status= status_neu(bool)