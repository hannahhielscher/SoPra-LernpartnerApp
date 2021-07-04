from server.bo.Nachricht import Nachricht
from server.db.Mapper import Mapper


class NachrichtMapper (Mapper):
    """Mapper-Klasse, die Nachrichten-Objekte auf eine relationale Datenbank abbildet. 
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Nachrichten.

        :return Eine Sammlung mit Nachricht-Objekten, die sämtliche Nachrichten repräsentieren.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, nachricht_inhalt, person_id, konversation_id from nachrichten")
        tuples = cursor.fetchall()

        for (id, nachricht_inhalt, person_id, konversation_id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_nachricht_inhalt(nachricht_inhalt)
            nachricht.set_person_id(person_id)
            nachricht.set_konversation_id(konversation_id)
            

            result.append(nachricht)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen aller Nachrichten mit einer gegebenen ID

        :param id Primärschlüsselattribut einer Nachricht aus der Datenbank
        :return Nachricht-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, nachricht_inhalt, person_id, konversation_id FROM nachrichten WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, inhalt, person_id, konversation_id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_nachricht_inhalt(inhalt)
            nachricht.set_person_id(person_id)
            nachricht.set_konversation_id(konversation_id)

            result = nachricht

        self._connection.commit()
        cursor.close()

        return result

    def find_by_inhalt(self, inhalt):
        """Auslesen aller Nachrichten mit bestimmten Inhalt

        :param inhalt Inhalt einer Nachricht aus der Datenbank
        :return Nachricht-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, nachricht_inhalt, person_id, konversation_id FROM nachrichten WHERE inhalt={}".format(inhalt)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, inhalt, person_id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_nachricht_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """Auslesen aller Nachrichten mit einer gegebenen personID

        :param person_id PersonID einer Nachricht aus der Datenbank
        :return Nachricht-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, nachricht_inhalt, person_id, konversation_id FROM nachrichten WHERE person_id={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, inhalt, person_id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_nachricht_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_konversation_id(self, konversation_id):
        """Auslesen aller Nachrichten mit einer gegebenen konversationID

        :param konversation_id KonversationID einer Nachricht aus der Datenbank
        :return Nachricht-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, nachricht_inhalt, person_id, konversation_id FROM nachrichten WHERE konversation_id={}".format(konversation_id)
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, inhalt, person_id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_nachricht_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_konversation_by_person(self, konversation_id, person_id):
        """Auslesen aller Nachrichten mit einer gegebenen konversation ID und personID

        :param konversation_id KonversationID einer Nachricht aus der Datenbank
        :param person_id PersonID einer Nachricht aus der Datenbank
        :return Nachricht-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, nachricht_inhalt FROM nachrichten WHERE konversation_id={} AND person_id={}".format(konversation_id, person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, inhalt) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_nachricht_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    
    def insert(self, nachricht):
        """Einfügen eines Nachrichten-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param nachricht das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch die aktualisierte Variante.
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM nachrichten ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Nachrichten-Objekt zu."""
                nachricht.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                nachricht.set_id(1)

        command = "INSERT INTO nachrichten (id, nachricht_inhalt, person_id, konversation_id) VALUES (%s,%s,%s,%s)"
        data = (nachricht.get_id(), str(nachricht.get_nachricht_inhalt()), nachricht.get_person_id(), nachricht.get_konversation_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return nachricht

    def update(self, nachricht):
        """Überschreiben eines Nachricht-Objekts in die Datenbank.

        :param nachricht das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()

        command = "UPDATE nachrichten " + "SET inhalt=%s, person_id=%s, konversation_id=%s WHERE id=%s"
        data = (nachricht.get_nachricht_inhalt(), nachricht.get_person_id(), nachricht.get_konversation_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, nachricht):
        """Löschen der Daten eines Nachricht-Objekts aus der Datenbank.

        :param nachricht -> Nachricht-Objekt 
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM nachrichten WHERE id={}".format(nachricht.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_konversation_id(self, konversation_id):
        """Löschen aller Nachrichten einer Konversation.

        :param konversation_id -> ID
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM nachrichten WHERE konversation_id={}".format(nachricht.get_konversation_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()