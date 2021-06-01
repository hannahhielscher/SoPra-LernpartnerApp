from server.db.Mapper import Mapper
from server.bo.Lernfach import Lernfach


class LernfachMapper(Mapper):
    """Mapper-Klasse, die Profil-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lerngruppen.

        :return Eine Sammlung mit Lerngruppen-Objekten, die sämtliche Lerngruppen
                repräsentieren.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM lernfaecher")
        tuples = cursor.fetchall()

        for (id, bezeichnung) in tuples:
            lernfach = Lernfach()
            lernfach.set_id(id)
            lernfach.set_bezeichnung(bezeichnung)
            result.append(lernfach)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen der Lerngruppen anhand der ID
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, bezeichnung FROM lernfaacher WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id) in tuples:
            lernfach = Lernfach()
            lernfach.set_id(id)
            lernfach.set_bezeichnung(bezeichnung)
            result.append(lernfach)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_bezeichnung(self, bezeichnung):
        """Auslesen der Lerngruppe anhand des Namens
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT bezeichnung FROM lernfaecher WHERE bezeichnung={} ORDER BY bezeichnung".format(bezeichnung)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (bezeichnung, id) in tuples:
            lernfach = Lernfach()
            lernfach.set_id(id)
            lernfach.set_bezeichnung(bezeichnung)
            result.append(lernfach)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, lernfach):
        """Einfügen eines lerngruppen-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lernfaecher ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            lernfach.set_id(maxid[0]+1))

            command = "INSERT INTO lernfaacher (id, bezeichnung) VALUES (%s,%s)"
            data = (lernfach.get_id(), lernfach.get_bezeichnung())
            cursor.execute(command, data)

            self._connection.commit()
            cursor.close()

            return lernfach

    def update(self, lernfach):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.
        """
        cursor = self._connection.cursor()

        command = "UPDATE lernfach " + "SET id=%s, bezeichnung=%s WHERE id=%s"
        data = (lernfach.get_id(), lernfach.get_bezeichnung())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self,lernfach):
        """Löschen der Daten eines lerngruppen-Objekts aus der Datenbank.
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM lernfaecher WHERE id={}".format(lernfach.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()