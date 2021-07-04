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

        comman2 = "SELECT lernvorlieben.tageszeiten_id, tageszeiten.praeferenz FROM lernvorlieben INNER JOIN tageszeiten ON lernvorlieben.tageszeiten_id = tageszeiten.id"
        comman3 = "SELECT lernvorlieben.tage_id, tage.praeferenz FROM lernvorlieben INNER JOIN tage ON lernvorlieben.tage_id = tage.id"
        comman4 = "SELECT lernvorlieben.frequenzen_id, frequenzen.praeferenz FROM lernvorlieben INNER JOIN frequenzen ON lernvorlieben.frequenzen_id = frequenzen.id"
        comman5 = "SELECT lernvorlieben.lernarten_id, lernarten.praeferenz FROM lernvorlieben INNER JOIN lernarten ON lernvorlieben.lernarten_id = lernarten.id"
        comman6 = "SELECT lernvorlieben.gruppengroessen_id, gruppengroesse.praeferenz FROM lernvorlieben INNER JOIN gruppengroesse ON lernvorlieben.gruppengroessen_id = gruppengroesse.id"
        comman7 = "SELECT lernvorlieben.lernorte_id, lernorte.praeferenz FROM lernvorlieben INNER JOIN lernorte ON lernvorlieben.lernorte_id = lernorte.id"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, tageszeiten_id, tageszeiten_bez, tage_id, tage_bez, frequenz_id, frequenz_bez, lernart_id, lernart_bez, gruppengroesse_id, gruppengroesse_bez, lernort_id, lernort_bez) in tuples:
            lernvorlieben = Lernvorlieben()
            lernvorlieben.set_id(id)
            lernvorlieben.set_tageszeiten_id(tageszeiten_id)
            lernvorlieben.set_tageszeiten_bez(tageszeiten_bez)
            lernvorlieben.set_tage_id(tage_id)
            lernvorlieben.set_tage_bez(tage_bez)
            lernvorlieben.set_frequenz_id(frequenz_id)
            lernvorlieben.set_frequenz_bez(frequenz_bez)
            lernvorlieben.set_lernart_id(lernart_id)
            lernvorlieben.set_lernart_bez(lernart_bez)
            lernvorlieben.set_gruppengroesse_id(gruppengroesse_id)
            lernvorlieben.set_gruppengroesse_bez(gruppengroesse_bez)
            lernvorlieben.set_lernort_id(lernort_id)
            lernvorlieben.set_lernort_bez(lernort_bez)
            
            result.append(lernvorlieben)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id): 
        """Suchen der Lernvorlieben nach der übergebenen ID. 

        :param id Primärschlüsselattribut der Lernvorlieben aus der Datenbank
        :return Lernvorlieben-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        cursor = self._connection.cursor()
        #command = "SELECT lernvorlieben.id, lernvorlieben.tageszeiten_id, lernvorlieben.tage_id, lernvorlieben.frequenzen_id, lernvorlieben.lernarten_id, lernvorlieben.gruppengroessen_id, lernvorlieben.lernorte_id FROM lernvorlieben WHERE id='{}'".format(id)

        command = "SELECT lernvorlieben.tageszeiten_id, tageszeiten.praeferenz FROM lernvorlieben INNER JOIN tageszeiten ON lernvorlieben.tageszeiten_id = tageszeiten.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        (tageszeiten_id, tageszeiten_bez) = tuples[0]
        tageszeiten_id = tageszeiten_id
        tageszeiten_bez = tageszeiten_bez

        command2 = "SELECT lernvorlieben.tage_id, tage.praeferenz FROM lernvorlieben INNER JOIN tage ON lernvorlieben.tage_id = tage.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command2)
        tuples = cursor.fetchall()
        (tage_id, tage_bez) = tuples[0]
        tage_id = tage_id
        tage_bez = tage_bez

        command3 = "SELECT lernvorlieben.frequenzen_id, frequenzen.praeferenz FROM lernvorlieben INNER JOIN frequenzen ON lernvorlieben.frequenzen_id = frequenzen.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command3)
        tuples = cursor.fetchall()
        (frequenzen_id, frequenzen_bez) = tuples[0]
        frequenzen_id = frequenzen_id
        frequenzen_bez = frequenzen_bez

        command4 = "SELECT lernvorlieben.lernarten_id, lernarten.praeferenz FROM lernvorlieben INNER JOIN lernarten ON lernvorlieben.lernarten_id = lernarten.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command4)
        tuples = cursor.fetchall()
        (lernarten_id, lernarten_bez) = tuples[0]
        lernarten_id = lernarten_id
        lernarten_bez = lernarten_bez

        command5 = "SELECT lernvorlieben.gruppengroessen_id, gruppengroessen.praeferenz FROM lernvorlieben INNER JOIN gruppengroessen ON lernvorlieben.gruppengroessen_id = gruppengroessen.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command5)
        tuples = cursor.fetchall()
        (gruppengroessen_id, gruppengroessen_bez) = tuples[0]
        gruppengroessen_id = gruppengroessen_id
        gruppengroessen_bez = gruppengroessen_bez

        command6 = "SELECT lernvorlieben.lernorte_id, lernorte.praeferenz FROM lernvorlieben INNER JOIN lernorte ON lernvorlieben.lernorte_id = lernorte.id WHERE lernvorlieben.id = '{}'".format(id)
        cursor.execute(command6)
        tuples = cursor.fetchall()
        (lernorte_id, lernorte_bez) = tuples[0]
        lernorte_id = lernorte_id
        lernorte_bez = lernorte_bez

        tuples = cursor.fetchall()
        print(tuples)

        try:

            lernvorlieben = Lernvorlieben()

            lernvorlieben.set_id(id)
            lernvorlieben.set_tageszeiten_id(tageszeiten_id)
            lernvorlieben.set_tageszeiten_bez(tageszeiten_bez)
            lernvorlieben.set_tage_id(tage_id)
            lernvorlieben.set_tage_bez(tage_bez)
            lernvorlieben.set_frequenz_id(frequenzen_id)
            lernvorlieben.set_frequenz_bez(frequenzen_bez)
            lernvorlieben.set_lernart_id(lernarten_id)
            lernvorlieben.set_lernart_bez(lernarten_bez)
            lernvorlieben.set_gruppengroesse_id(gruppengroessen_id)
            lernvorlieben.set_gruppengroesse_bez(gruppengroessen_bez)
            lernvorlieben.set_lernort_id(lernorte_id)
            lernvorlieben.set_lernort_bez(lernorte_bez)

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

        command = "INSERT INTO lernvorlieben (id, tageszeiten_id, tage_id, frequenzen_id, lernarten_id, gruppengroessen_id, lernorte_id) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (
            lernvorlieben.get_id(),
            lernvorlieben.get_tageszeiten_id(),
            lernvorlieben.get_tage_id(),
            lernvorlieben.get_frequenz_id(),
            lernvorlieben.get_lernart_id(),
            lernvorlieben.get_gruppengroesse_id(),
            lernvorlieben.get_lernort_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return lernvorlieben
    
    def update(self):
        pass

    def update_by_id(self, lernvorlieben):
        """Überschreiben / Aktualisieren eines Lernvorlieben-Objekts in der DB

        :param lernvorlieben -> Lernvorlieben-Objekt
        :return aktualisiertes Lernvorlieben-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE lernvorlieben " + "SET tageszeiten_id=%s, tage_id=%s, frequenzen_id=%s, lernarten_id=%s, gruppengroessen_id=%s, lernorte_id=%s WHERE id=%s"
        data = (lernvorlieben.get_tageszeiten_id(), lernvorlieben.get_tage_id(), lernvorlieben.get_frequenz_id(), lernvorlieben.get_lernart_id(), lernvorlieben.get_gruppengroesse_id(), lernvorlieben.get_lernort_id(), lernvorlieben.get_id())

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
