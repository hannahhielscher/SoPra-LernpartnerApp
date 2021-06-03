from server.db.Mapper import Mapper
from server.bo.Lernvorlieben import Lernvorlieben


class LernvorliebenMapper(Mapper):
    """Mapper-Klasse, die Lernvorlieben Objekte auf der relationalen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lernvorlieben aus der Datenbank
        :return Alle Lernvorlieben-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort FROM Lernvorlieben"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort) in tuples:
            lernvorlieben = Lernvorlieben()
            lernvorlieben.set_id(id)
            lernvorlieben.set_tageszeiten(tageszeiten)
            lernvorlieben.set_tage(tage)
            lernvorlieben.set_frequenz(frequenz)
            lernvorlieben.set_lernart(lernart)
            lernvorlieben.set_gruppengroesse(gruppengroesse)
            lernvorlieben.set_lernort(lernort)
            
            
            result.append(lernvorlieben)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id): 
        """Suchen der Lernvorlieben nach der übergebenen ID. 
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort FROM Lernvorlieben WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort) = tuples[0]
            lernvorlieben = Lernvorlieben()
            lernvorlieben.set_id(id)
            lernvorlieben.set_tageszeiten(tageszeiten)
            lernvorlieben.set_tage(tage)
            lernvorlieben.set_frequenz(frequenz)
            lernvorlieben.set_lernart(lernart)
            lernvorlieben.set_gruppengroesse(gruppengroesse)
            lernvorlieben.set_lernort(lernort)
            
            result = lernvorlieben

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, lernvorlieben):
        """Einfügen eines Lernvorlieben Objekts in die DB
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 
        :param lernvorlieben das zu speichernde Lernvorlieben Objekt
        :return das bereits übergebene Lernvorlieben Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lernvorlieben ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                lernvorlieben.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                lernvorlieben.set_id(1)

        command = "INSERT INTO lernvorlieben (id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (lernvorlieben.get_id(), lernvorlieben.get_tageszeiten(), lernvorlieben.get_tage(), lernvorlieben.get_frequenz(), lernvorlieben.get_lernart(), lernvorlieben.get_gruppengroesse(), lernvorlieben.get_lernort())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return lernvorlieben

    def update(self, lernvorlieben):
        """Überschreiben / Aktualisieren eines Lernvorlieben-Objekts in der DB
        :param lernvorlieben -> Lernvorlieben-Objekt
        :return aktualisiertes Lernvorlieben-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE lernvorlieben " + "SET tageszeiten=%s, tage=%s, frequenz=%s, lernart=%s, gruppengroesse=%s, lernort=%s WHERE id=%s"
        data = (lernvorlieben.get_id(), lernvorlieben.get_tageszeiten(), lernvorlieben.get_tage(), lernvorlieben.get_frequenz(), lernvorlieben.get_lernart(), lernvorlieben.get_gruppengroesse(), lernvorlieben.get_lernort())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, lernvorlieben):
        """Löschen der Daten eines Lernvorlieben-Objekts aus der Datenbank
        :param lernvorlieben -> Lernvorlieben-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM lernvorlieben WHERE id={}".format(lernvorlieben.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()