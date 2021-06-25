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

        command = "SELECT lernvorlieben.id, lernvorlieben.tageszeiten_id, lernvorlieben.tage_id, lernvorlieben.frequenzen_id, lernvorlieben.lernarten_id, lernvorlieben.gruppengroessen_id, lernvorlieben.lernorte_id FROM lernvorlieben"

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
        command = "SELECT lernvorlieben.id, lernvorlieben.tageszeiten_id, lernvorlieben.tage_id, lernvorlieben.frequenzen_id, lernvorlieben.lernarten_id, lernvorlieben.gruppengroessen_id, lernvorlieben.lernorte_id FROM lernvorlieben WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, tageszeiten_id, tage_id, frequenzen_id, lernarten_id, gruppengroessen_id, lernorte_id) = tuples[0]
            lernvorlieben = Lernvorlieben()
            lernvorlieben.set_id(id)
            lernvorlieben.set_tageszeiten(tageszeiten_id)
            lernvorlieben.set_tage(tage_id)
            lernvorlieben.set_frequenz(frequenzen_id)
            lernvorlieben.set_lernart(lernarten_id)
            lernvorlieben.set_gruppengroesse(gruppengroessen_id)
            lernvorlieben.set_lernort(lernorte_id)
            
            result = lernvorlieben

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        
        return result

    def find_tageszeiten_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT tageszeiten.praeferenz FROM lernvorlieben INNER JOIN tageszeiten ON lernvorlieben.tageszeiten_id = tageszeiten.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_tage_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT tage.praeferenz FROM lernvorlieben INNER JOIN tage ON lernvorlieben.tage_id = tage.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_frequenzen_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT frequenzen.praeferenz FROM lernvorlieben INNER JOIN frequenzen ON lernvorlieben.frequenzen_id = frequenzen.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_lernarten_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT lernarten.praeferenz FROM lernvorlieben INNER JOIN lernarten ON lernvorlieben.lernarten_id = lernarten.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_gruppengroessen_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT gruppengroessen.praeferenz FROM lernvorlieben INNER JOIN gruppengroessen ON lernvorlieben.gruppengroessen_id = gruppengroessen.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_lernorte_by_lernvorlieben_id(self, id):
        """Suchen der Lernvorlieben nach der übergebenen ID.
        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()

        command = "SELECT lernorte.praeferenz FROM lernvorlieben INNER JOIN lernorte ON lernvorlieben.lernorte_id = lernorte.id WHERE lernvorlieben.id ='{}'".format(id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        try:
            (praeferenz) = tuples[0]

            result = ''.join(praeferenz)

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

        command = "INSERT INTO lernvorlieben (id, tageszeiten_id, tage_id, frequenzen_id, lernarten_id, gruppengroessen_id, lernorte_id) VALUES (%s,%s,%s,%s,%s,%s,%s)"
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

        command = "UPDATE lernvorlieben " + "SET tageszeiten_id=%s, tage_id=%s, frequenzen_id=%s, lernarten_id=%s, gruppengroessen_id=%s, lernorte_id=%s WHERE id=%s"
        data = (lernvorlieben.get_tageszeiten(), lernvorlieben.get_tage(), lernvorlieben.get_frequenz(), lernvorlieben.get_lernart(), lernvorlieben.get_gruppengroesse(), lernvorlieben.get_lernort(), lernvorlieben.get_id())

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
