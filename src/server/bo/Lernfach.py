class Lernfach:

    def __init__(self):
        super().__init__()
        self._bezeichnung = ""

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung"""
        return self._bezeichnung

    def set_bezeichnung(self):
        """Setzten der Bezeichnung"""
        self._bezeichnung = ""

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Lernfach()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj

