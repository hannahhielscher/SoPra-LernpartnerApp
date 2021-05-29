from server.bo.BusinessObject import BusinessObject


class Lernvorlieben(BusinessObject):

    def __init__(self):
        super().__init__()
        self._tageszeiten = {"Morgens:": False, "Mittags:": False, "Abends:": False}
        self._tage = {"Unter der Woche": False, "Am Wochenende": False}
        self._frequenz = {"Wöchentlich:": False, "Mehrmals die Woche:": False,  "Alle zwei Wochen:": False}
        self._lernart = str
        self._gruppengroesse = 0
        self._lernort = str


    def get_tageszeiten(self):
        """Auslesen der präferierten Uhrzeit"""
        return self._tageszeiten
    
    def set_tageszeiten(self, value):
        """Setzen der präferierten Tageszeit"""
        self._tageszeiten = value

    def get_tage(self):
        """Auslesen der präferierten Tage"""
        return self._tage

    def set_tage(self, value):
        """Setzen der präferierten Tage"""
        self._tage = value

    def get_frequenz(self):
        """Auslesen der Frequenz/Häufigkeit der Treffen"""
        return self._frequenz

    def set_frequenz(self, value):
        """Setzen der Frequenz/Häufigkeit der Treffen"""
        self._frequenz = value

    def get_lernart(self):
        """Auslesen der präferierten Lernart"""
        return self._lernart

    def set_lernart(self, value):
        """Setzen der präferierten Lernart"""
        self._lernart = value

    def get_gruppengroesse(self):
        """Auslesen der präferierten Gruppengroesse"""
        return self._gruppengroesse

    def set_gruppengroesse(self, value):
        """Setzen der präferierten Gruppengroesse"""
        self._gruppengroesse = value

    def get_lernort(self):
        """Auslesen des präferierten Lernorts"""
        return self._lernort

    def set_lernort(self, value):
        """Setzen des präferierten Lernorts"""
        self._lernort = value




    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Lernvorlieben: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self._uhrzeit, self._tage, self._frequenz,self._lernart, self._gruppengroesse, self._lernort)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Lernvorlieben() """
        obj = Lernvorlieben()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_tageszeiten(dictionary["tageszeiten"])
        obj.set_tage(dictionary["tage"])
        obj.set_frequenz(dictionary["frequenz"])
        obj.set_lernart(dictionary["lernart"])
        obj.set_gruppengroesse(dictionary["gruppengroesse"])
        obj.set_lernort(dictionary["lernort"])
        return obj
