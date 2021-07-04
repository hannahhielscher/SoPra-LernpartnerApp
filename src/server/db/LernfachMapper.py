from server.db.Mapper import Mapper
from server.bo.Lernfach import Lernfach


class LernfachMapper(Mapper):
    """Mapper-Klasse, die Lernfach Objekte auf der relationalen Datenbank abbildet.

    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lernfaecher aus der Datenbank

        :return Alle Lernfaecher-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, bezeichnung FROM lernfaecher"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, bezeichnung) in tuples:
            lernfaecher = Lernfach()
            lernfaecher.set_id(id)
            lernfaecher.set_bezeichnung(bezeichnung)
            
            result.append(lernfaecher)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Lernfachs nach ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Lernfach-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        
        cursor = self._connection.cursor()
        command = "SELECT id, bezeichnung FROM lernfaecher WHERE id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, bezeichnung) in tuples:
            lernfaecher = Lernfach()
            lernfaecher.set_id(id)
            lernfaecher.set_bezeichnung(bezeichnung)
            
            result = lernfaecher

        self._connection.commit()
        cursor.close()

        return result

    def find_lernfaecher_by_profil_id(self, profilid):
        """Sucht die Lernfächer eines Profiles
        
        :param profilid Profil ID 
        :return Lernfach-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel.
        """

        result = []
        
        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.lernfaecher_id, lernfaecher.bezeichnung FROM profile_has_lernfaecher INNER JOIN lernfaecher ON profile_has_lernfaecher.lernfaecher_id = lernfaecher.id WHERE profile_has_lernfaecher.profil_id ='{}'".format(profilid)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, bezeichnung) in tuples:
            lernfaecher = Lernfach()
            lernfaecher.set_id(id)
            lernfaecher.set_bezeichnung(bezeichnung)
            result.append(lernfaecher)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with LernfachMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)