from server.bo.BusinessObject import BusinessObject


class Lernvorlieben(BusinessObject):

    def __init__(self):
        super().__init__()
        self._tageszeiten = {"Morgens:": false, "Mittags:": false, "Abends:": false}
        self._tage = {"Montag:": false, "Dienstag:": false, "Mittwoch:": false, "Donnerstag:": false, "Freitag:": false, "Samstag:": false, "Sonntag:": false,}
        self._frequenz = {"Wöchentlich:": false, "Mehrmals die Woche:": false,  "Alle zwei Wochen:": false}
        self._lernart = str
        self._gruppengroesse = 0
        self._lernort = str


<<<<<<< HEAD
    def get_uhrzeit(self):
        """Auslesen der Uhrzeit"""
        return self._uhrzeit
=======

    def get_tageszeiten(self):
        """Auslesen der Tageszeiten"""
        return self._tageszeiten

    def set_tageszeiten(self):
        """Setzen der Tageszeiten"""
        self._tageszeiten = value
>>>>>>> 6f6cfd355ff51f8011d91fd3fd1a493ee6d9759b


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
