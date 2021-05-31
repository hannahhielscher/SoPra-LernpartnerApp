from server.bo.Nachricht import Nachricht
from server.db.Mapper import Mapper


class NachrichtMapper (Mapper):
    """Mapper-Klasse, die Nachrichten-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Nachrichten.

        :return Eine Sammlung mit Nachricht-Objekten, die sämtliche nachrichten
                repräsentieren.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, inhalt, person_id, profil_id, konversation_id from nachricht")
        tuples = cursor.fetchall()

        for (id, inhalt, person_id, profil_id, konversation_id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_inhalt(inhalt)
            nachricht.set_person_id(person_id)
            nachricht.set_profil_id(profil_id)
            nachricht.set_konversation_id(konversation_id)
            

            result.append(nachricht)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen aller Tuples mit einer gegebenen ID
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, inhalt, person_id, profil_id, konversation_id FROM nachricht WHERE id={} ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_inhalt(inhalt)
            nachricht.set_person_id(person_id)
            nachricht.set_profil_id(profil_id)
            nachricht.set_konversation_id(konversation_id)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_inhalt(self, inhalt):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, inhalt, person_id, profil_id, konversation_id FROM nachrichten WHERE inhalt={}".format(inhalt)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_profil_id(profil_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, inhalt, person_id, profil_id, konversation_id FROM nachrichten WHERE person_id={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, inhalt, person_id, profil_id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_inhalt(inhalt)
            nachrichten.set_person_id(person_id)
            nachrichten.set_profil_id(profil_id)
            nachrichten.set_konversation_id(konversation_id)

            result.append(nachrichten)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_profil_id(self, profil_id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, inhalt, person_id, profil_id, konversation_id FROM nachrichten WHERE person_id={}".format(
            profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, inhalt, person_id, profil_id, konversation_id) in tuples:
            nachrichten = Nachricht()
            nachrichten.set_id(id)
            nachrichten.set_inhalt(inhalt)
            nachrichten.set_person_id()
            nachrichten.set_person_id(person_id)
            nachrichten.set_profil_id(profil_id)
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

        command = "INSERT INTO nachrichten (id, inhalt, person_id, profil_id, konversation_id) VALUES (%s,%s,%s,%s,%s)"
        data = (nachricht.get_id(), nachricht.get_inhalt(), nachricht.get_person_id(), nachricht.get_profil_id(), nachricht.get_konversation_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return nachricht

    def update(self, nachricht):
        """Aktualisierung eines Nachricht-Objekts in die Datenbank.

        :param nachricht das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()

        command = "UPDATE nachrichten " + "SET inhalt=%s, person_id=%s, profil_id=%s, konversation_id=%s WHERE id=%s"
        data = (nachricht.get_inhalt(), nachricht.get_person_id(), nachricht.get_profil_id(), nachricht.get_konversation_id())
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
