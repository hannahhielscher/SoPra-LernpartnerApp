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
            teilnahme.set_konversation(konversation)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """ Findet alle Teilnahmen für eine bestimmte user_id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, konversation_id FROM teilnahmen_chat WHERE person_id={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_konversation(konversation_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_konversation_id(self, konversation_id):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, konversation_id FROM teilnahmen_chat WHERE konversation_id={}".format(konversation_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, konversation_id) in tuples:
            teilnahme = TeilnahmeChat()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_konversation(konversation_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self):
        """Reads a tuple with a given ID"""
        pass


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

        command = "INSERT INTO teilnahmen_chat (id, person_id, konversation_id) VALUES (%s,%s,%s)"

        data = (teilnahme.get_id(), teilnahme.get_teilnehmer(), teilnahme.get_konversation())
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

        command = "UPDATE teilnahmen_chat SET person_id=%s, konversation_id=%s WHERE id=%s"
        data = (teilnahme.get_teilnehmer(), teilnahme.get_konversation(), teilnahme.get_id())
        cursor.execute(command, data)

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
