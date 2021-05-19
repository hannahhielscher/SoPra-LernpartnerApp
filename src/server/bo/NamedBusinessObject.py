from server.bo.BusinessObject import BusinessObject

class NamedBusinessObject(BusinessObject):

    def __init__(self, name):
        self._name = str

    def get_name(self):
        """Auslesen des Namens"""

    def set_name(self):
        """Setzen des Namens"""
        return str
