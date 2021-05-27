from server.bo.Konversation import Konversation
from server.db.Mapper import Mapper


class KonversationMapper (Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Findet alle Konversationen """

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id FROM konversation")
        tuples = cursor.fetchall()

        for (id) in tuples:
            konversation = Konversation()
            konversation.set_id(id)
            result.append(konversation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_konversation_id(self, id):
        """Auslesen aller Tuples mit einer gegebenen ID
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id FROM konversationen WHERE id={} ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id) in tuples:
            konversation = Konversation()
            konversation.set_id(id)
            result.append(konversation)

        self._connection.commit()
        cursor.close()

        return result
    
    def insert(self, koversation):
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
                koversation.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                koversation.set_id(1)

        command = "INSERT INTO konversationen (id) VALUES (%s,%s,%s,%s)"
        data = (koversation.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return koversation

    def update(self, konversation):
        """Aktualisierung eines Konversations-Objekts in der DB

        :param Konversation -> Konversations-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE konversationen " + "SET id=%s WHERE google_user_id=%s"
        data = (konversation.get_id())
        cursor.execute(command, data)

        self._connection.commit() 
        cursor.close()

    def delete(self, konversation):
        """Löschen der Daten eines Konversation-Objekts aus der Datenbank.

        """
        cursor = self._connection.cursor()

        command = "DELETE FROM konversationen WHERE id={}".format(konversation.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

