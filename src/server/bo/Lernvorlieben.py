from server.bo.BusinessObject import BusinessObject


class Lernvorlieben(BusinessObject):

    def __init__(self):
        super().__init__()
        self._tageszeiten_id = None #{"Morgens:": False, "Mittags:": False, "Abends:": False}
        self._tageszeiten_bez = None
        self._tage_id = None #{"Unter der Woche": False, "Am Wochenende": False}
        self._tage_bez = None
        self._frequenz_id = None #{"Wöchentlich:": False, "Mehrmals die Woche:": False,  "Alle zwei Wochen:": False}
        self._frequenz_bez = None
        self._lernart_id = None #{"Visuell:": False, "Auditiv:": False, "Motorisch:": False, "Kommunikativ:": False}
        self._lernart_bez = None
        self._gruppengroesse_id = None #{"Bis zu 3 Personen:": False, "3-5 Personen:": False, "Über 5 Personen:": False}
        self._gruppengroesse_bez = None
        self._lernort_id = None #{"Remote:": False, "Hochschule:": False, "Bibliothek:": False, "Cafe:": False}
        self._lernort_bez = None


    def get_tageszeiten_id(self):
        """Auslesen der präferierten Uhrzeit"""
        return int(self._tageszeiten_id)
    
    def set_tageszeiten_id(self, value):
        """Setzen der präferierten Tageszeit"""
        self._tageszeiten_id = value

    def get_tageszeiten_bez(self):
        """Auslesen der präferierten Uhrzeit"""
        return self._tageszeiten_bez

    def set_tageszeiten_bez(self, value):
        """Setzen der präferierten Tageszeit"""
        self._tageszeiten_bez = value

    def get_tage_id(self):
        """Auslesen der präferierten Tage"""
        return int(self._tage_id)

    def set_tage_id(self, value):
        """Setzen der präferierten Tage"""
        self._tage_id = value

    def get_tage_bez(self):
        """Auslesen der präferierten Tage"""
        return self._tage_bez

    def set_tage_bez(self, value):
        """Setzen der präferierten Tage"""
        self._tage_bez = value

    def get_frequenz_id(self):
        """Auslesen der Frequenz/Häufigkeit der Treffen"""
        return int(self._frequenz_id)

    def set_frequenz_id(self, value):
        """Setzen der Frequenz/Häufigkeit der Treffen"""
        self._frequenz_id = value

    def get_frequenz_bez(self):
        """Auslesen der Frequenz/Häufigkeit der Treffen"""
        return self._frequenz_bez

    def set_frequenz_bez(self, value):
        """Setzen der Frequenz/Häufigkeit der Treffen"""
        self._frequenz_bez = value

    def get_lernart_id(self):
        """Setzen der präferierten Lernart"""
        return int(self._lernart_id)

    def set_lernart_id(self, value):
        """Setzen der präferierten Lernart"""
        self._lernart_id = value

    def get_lernart_bez(self):
        """Auslesen der präferierten Lernart"""
        return self._lernart_bez

    def set_lernart_bez(self, value):
        """Setzen der präferierten Lernart"""
        self._lernart_bez = value

    def get_gruppengroesse_id(self):
        """Auslesen der präferierten Gruppengroesse"""
        return int(self._gruppengroesse_id)

    def set_gruppengroesse_id(self, value):
        """Setzen der präferierten Gruppengroesse"""
        self._gruppengroesse_id = value

    def get_gruppengroesse_bez(self):
        """Auslesen der präferierten Gruppengroesse"""
        return self._gruppengroesse_bez

    def set_gruppengroesse_bez(self, value):
        """Setzen der präferierten Gruppengroesse"""
        self._gruppengroesse_bez = value

    def get_lernort_id(self):
        """Auslesen des präferierten Lernorts"""
        return int(self._lernort_id)

    def set_lernort_id(self, value):
        """Setzen des präferierten Lernorts"""
        self._lernort_id = value

    def get_lernort_bez(self):
        """Auslesen des präferierten Lernorts"""
        return self._lernort_bez

    def set_lernort_bez(self, value):
        """Setzen des präferierten Lernorts"""
        self._lernort_bez = value

    #def get_all(self):
     #   inhalt = [self.id, self._tageszeiten_id, self._tage_id, self._frequenz_id, self._lernart_id, self._gruppengroesse_id, self._lernort_id]
      #  return inhalt

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Lernvorlieben: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self._tageszeiten_id, type(self._tageszeiten_id), self._tageszeiten_bez,  type(self._tageszeiten_bez), self._tage_id, self._tage_bez, self._frequenz_id, self._frequenz_bez, self._lernart_id, self._lernart_bez, self._gruppengroesse_id, self._gruppengroesse_bez, self._lernort_id, self._lernort_bez)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Lernvorlieben() """
        obj = Lernvorlieben()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_tageszeiten_id(dictionary["tageszeiten_id"])
        obj.set_tageszeiten_bez(dictionary["tageszeiten_bez"])
        obj.set_tage_id(dictionary["tage_id"])
        obj.set_tage_bez(dictionary["tage_bez"])
        obj.set_frequenz_id(dictionary["frequenz_id"])
        obj.set_frequenz_bez(dictionary["frequenz_bez"])
        obj.set_lernart_id(dictionary["lernart_id"])
        obj.set_lernart_bez(dictionary["lernart_bez"])
        obj.set_gruppengroesse_id(dictionary["gruppengroesse_id"])
        obj.set_gruppengroesse_bez(dictionary["gruppengroesse_bez"])
        obj.set_lernort_id(dictionary["lernort_id"])
        obj.set_lernort_bez(dictionary["lernort_bez"])
        return obj
