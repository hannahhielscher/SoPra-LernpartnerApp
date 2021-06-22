from server.bo.BusinessObject import BusinessObject

class NamedBusinessObject(BusinessObject):

    def __init__(self):
        self._name = None

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def set_name(self, name):
        """Setzen des Namens"""
        self._name = name
