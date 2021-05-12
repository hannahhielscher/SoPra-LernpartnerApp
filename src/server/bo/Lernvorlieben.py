from server.bo.BusinessObject import BusinessObject


class Lernvorlieben(BusinessObject):

    def __init__(self):
        super().__init__()
        self._uhrzeit = datetime
        self._tage = str
        self._frequenz = int
        self._lernart = str
        self._gruppengroesse = str
        self._lernort = str

    def create_lernvorlieben(self):
        """Erstellen von Lernvorlieben"""


    def get_uhrzeit(self):
        """Auslesen der Uhrzeit"""
        return self._uhrzeit

    def set_uhrzeit(self):
        """Setzen der Uhrzeit"""
        self._uhrzeit = value

    def get_tage(self):
        """Auslesen der Tage"""
        return self._tage

    def set_tage(self):
        """Setzen der Tage"""
        self._tage = value

    def get_frequenz(self):
        """Auslesen der Frequenz"""
        return self._frequenz

    def set_frequenz(self):
        """Setzen der Frequenz"""
        self._frequenz = value

    def get_lernart(self):
        """Auslesen der Lernart"""
        return self._lernart

    def set_lernart(self):
        """Setzen der Lernart"""
        self._lernart = value

    def get_gruppengroesse(self):
        """Auslesen der Gruppengroesse"""
        return self._gruppengroesse

    def set_gruppengroesse(self):
        """Setzen der Gruppengroesse"""
        self._gruppengroesse = value

    def get_lernort(self):
        """Auslesen des Lernorts"""
        return self._lernort

    def set_lernort(self):
        """Setzen des Lernorts"""
        self._lernort = value




    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._uhrzeit, self._tage, self._frequenz,self._lernart, self._gruppengroesse, self._lernort)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Lernvorlieben() """
        obj = Lernvorlieben()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["uhrzeit"])
        obj.set_vorname(dictionary["tage"])
        obj.set_semester(dictionary["frequenz"])
        obj.set_alter(dictionary["lernart"])
        obj.set_geschlecht(dictionary["gruppengroesse"])
        obj.set_lerngruppe(dictionary["lernort"])
        return obj
