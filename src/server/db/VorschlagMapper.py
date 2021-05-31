from server.db.Mapper import Mapper
from server.bo.Vorschlag import Vorschlag


class VorschlagMapper(Mapper):
    """Mapper-Klasse, die Person Objekte auf der relationalen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen aus der Datenbank
        :return Alle Person-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, match_quote, person_id FROM vorschlaege"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, match_quote, person_id) in tuples:
            vorschlag = Vorschlaege()
            person.set_id(id)
            person.set_match_quote(match_quote)
            person.set_person_id(person_id)

            result.append(vorschlag)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Vorschlages nach der übergebenen ID.
        :param id Primärschlüsselattribut eines Vorschlages aus der Datenbank
        :return Vorschlag-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, match_quote, person_id FROM vorschlaege WHERE id='{}'".format(
            id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, match_quote, person_id) = tuples[0]
            vorschlag = Vorschlaege()
            person.set_id(id)
            person.set_match_quote(match_quote)
            person.set_person_id(person_id)

            result = vorschlag

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, vorschlag):
        """Einfügen eines Vorschlag Objekts in die DB
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft
        :param person das zu speichernde Vorschlag Objekt
        :return das bereits übergebene Vorschlag Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM vorschlaege ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Vorschlag-Objekt zu."""
                vorschlag.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                vorschlag.set_id(1)

        command = "INSERT INTO vorschlaege (id, match_quote, person_id) VALUES (%s,%s,%s)"
        data = (vorschlag.get_id(), vorschlag.get_match_quote(), vorschlag.get_person_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return vorschlag

    def update_by_id(self, vorschlag):
        """Überschreiben / Aktualisieren eines Vorschlag-Objekts in der DB
        :param vorschlag -> Vorschlag-Objekt
        :return aktualisiertes Vorschlag-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE vorschlaege " + "SET match_quote=%s, profil_id=%s WHERE WHERE id=%s"
        data = (
        vorschlag.get_match_quote(), vorschlag.get_profil_id))

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, vorschlag):
        """Löschen der Daten eines Vorschlages aus der Datenbank
        :param vorschlag -> Vorschlag-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM vorschlaege WHERE id={}".format(vorschlag.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def deleteByID(self, vorschlagID):
        """Löschen der Daten einers Vorschlages aus der Datenbank
        :param vorschlag -> Vorschlag-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM vorschlawgww WHERE id={}".format(vorschlagID)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()