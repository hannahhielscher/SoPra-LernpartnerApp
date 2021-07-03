from server.db.Mapper import Mapper
from server.bo.TeilnahmeChat import TeilnahmeChat


class TeilnahmeChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Findet alle Teilnahmen an Chats"""
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from teilnahmen_chat")
        tuples = cursor.fetchall()

        for (id, teilnehmer, konversation) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_konversation(konversation)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """ Findet alle Teilnahmen für eine bestimmte user_id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE person_id={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()
        print(result)

        return result

    def find_by_konversation_id_und_status(self, status, konversation_id):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE status={} AND konversation_id={} ".format(status, konversation_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id_und_status(self, person_id, status):
        """ Findet alle Teilnahmen von einer ProjektID"""

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE person_id={} AND status={}".format(person_id, status)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:

            teilnahme = TeilnahmeChat()

            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)

            result.append(teilnahme)
            print(teilnahme)

        self._connection.commit()
        cursor.close()
        print(result)
        return result

    def find_by_konversation_id(self, konversation_id):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE konversation_id={} AND status={}".format(konversation_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_konversation_and_person(self, konversation_id, person_id):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE konversation_id={} AND person_id={}".format(konversation_id, person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)
            
            result = teilnahme

        self._connection.commit()
        cursor.close()

        return result

    def find_by_anfrage_sender(self, anfrage_sender):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE anfrage_sender={}".format(anfrage_sender)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, anfrage_sender, status, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)

            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Reads a tuple with a given ID"""
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, anfrage_sender, status, konversation_id FROM teilnahmen_chat WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, person_id, anfrage_sender, status, konversation_id) = tuples[0]
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_anfrage_sender(anfrage_sender)
            teilnahme.set_status(status)
            teilnahme.set_konversation(konversation_id)

            result = teilnahme

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        print(result)
        print(id)

        return result


    def insert(self, teilnahme):
        '''
		Einfugen eines Teilnahme BO's in die DB
		:param teilnahme 
        :return das bereits übergebene Teilnahme-Objekt mit aktualisierten Daten
		'''
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM teilnahmen_chat")
        tuples = cursor.fetchall()

        """TODO User autoincrement"""
        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Teilnahme-Objekt zu."""
                teilnahme.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                teilnahme.set_id(1)

        command = "INSERT INTO teilnahmen_chat (id, person_id, anfrage_sender, status, konversation_id) VALUES (%s,%s,%s,%s,%s)"
        data = (teilnahme.get_id(), teilnahme.get_teilnehmer(), teilnahme.get_anfrage_sender(), teilnahme.get_status(), teilnahme.get_konversation())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return teilnahme

    def update(self, teilnahme):
        """Überschreiben / Aktualisieren eines Teilnahme-Objekts in der DB
        :param teilnahme
        :return aktualisiertes Teilnahme-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE teilnahmen_chat SET status=%s WHERE id=%s"
        data = (teilnahme.get_status(), teilnahme.get_id())
        cursor.execute(command, data)

        print(teilnahme.get_status())

        self._connection.commit()
        cursor.close()

    def delete(self, konversationId, personId):
        """Delete an object from the DB"""
        
        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen_chat WHERE konversation_id=%s AND person_id=%s"
        data = (konversationId, personId)
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()
    
    def delete_by_id(self, id):
        """Delete an object from the DB"""
        
        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen_chat WHERE id={}".format(id)
        cursor.execute(command)
        self._connection.commit()
        cursor.close()
