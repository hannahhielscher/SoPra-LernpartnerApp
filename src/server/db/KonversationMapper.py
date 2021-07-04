from server.bo.Konversation import Konversation
from server.db.Mapper import Mapper


class KonversationMapper(Mapper):
    """Mapper-Klasse, die Konversation-Objekte auf eine relationale Datenbank abbildet. 

    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt.
    """
    def __init__(self):
        super().__init__()


    def find_all(self):
        """Auslesen aller Konversationen aus der Datenbank

        :return Eine Sammlung aller Konversation-Objekten
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, name, anfragestatus FROM konversationen")
        tuples = cursor.fetchall()

        for (id, name, anfragestatus) in tuples:
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_name(name)
            konversation.set_anfragestatus(anfragestatus)
            result.append(konversation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen einer Konversation mit einer gegebenen ID

        :param id Primärschlüsselattribut einer Konversation aus der Datenbank
        :return Konversation-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, name, anfragestatus FROM konversationen WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, anfragestatus) = tuples[0]
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_name(name)
            konversation.set_anfragestatus(anfragestatus)

            result = konversation

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_personid(self, personid):
        """Suchen aller Konversationen einer Person nach deren ID

        :param personid Person ID einer Konversation aus der Datenbank
        :return Konversation-Objekt, welche mit der Person ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        
        result = []
        cursor = self._connection.cursor()
        command = "SELECT konversationen.id, konversationen.name, konversationen.anfragestatus FROM konversationen INNER JOIN teilnahmen_chat ON konversationen.id = teilnahmen_chat.konversation_id WHERE person_id ={}".format(personid)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, anfragestatus) in tuples:
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_name(name)
            konversation.set_anfragestatus(anfragestatus)

            result.append(konversation)

        self._connection.commit()
        cursor.close()

        return result

    def find_angenommene_by_personid(self, personid):
        """Suchen aller Konversationen einer Person ID, die Anfragestatus und TeilnahmeChat Status true haben
        
        :param personid Person ID einer Konversation aus der Datenbank
        :return Konversation-Objekt, welche mit der Person ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT konversationen.id, konversationen.name, konversationen.anfragestatus FROM konversationen INNER JOIN teilnahmen_chat ON konversationen.id = teilnahmen_chat.konversation_id WHERE teilnahmen_chat.person_id = {} AND konversationen.anfragestatus =1 AND teilnahmen_chat.status = 1".format(personid)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, anfragestatus) in tuples:
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_name(name)
            konversation.set_anfragestatus(anfragestatus)

            result.append(konversation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen einer Konversation nach ihrem Namen
        
        :param name Name einer Konversation aus der Datenbank
        :return Konversation-Objekt, welche mit dem Namen übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        cursor = self._connection.cursor()
        command = "SELECT id, name, anfragestatus FROM konversationen WHERE name='{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, anfragestatus) = tuples[0]
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_name(name)
            konversation.set_anfragestatus(anfragestatus)

            result = konversation
        
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, konversation):
        """Einfügen eines Konversation-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param konversation 
        :return das bereits übergebene Konversations-Objekt, jedoch mit aktualisierten Daten.
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM konversationen ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Konversations-Objekt zu."""
                konversation.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                konversation.set_id(1)

        command = "INSERT INTO konversationen (id, name, anfragestatus) VALUES (%s,%s,%s)"
        data = (konversation.get_id(), konversation.get_name(), konversation.get_anfragestatus())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return konversation

    def update_status(self, konversation):
        """Überschreiben eines Konversations-Objekts in der DB

        :param Konversation -> Konversations-Objekt
        :return aktualisiertes Konversation-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE konversationen " + "SET anfragestatus=%s WHERE id=%s"
        data = (konversation.get_anfragestatus(), konversation.get_id())
        cursor.execute(command, data)

        self._connection.commit() 
        cursor.close()

    def update(self):
        pass

    def delete(self, id):
        """Löschen der Daten eines Konversation-Objekts aus der Datenbank.

        :param id -> Primärschlüssel der Konversation
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen_chat WHERE konversation_id={}".format(id)
        cursor.execute(command)

        command2 = "DELETE FROM konversationen WHERE id={}".format(id)
        cursor.execute(command2)

        self._connection.commit()
        cursor.close()

