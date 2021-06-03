from server.db.Mapper import Mapper
from server.bo.TeilnahmeGruppe import TeilnahmeGruppe


class TeilnahmeGruppeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Teilnahmen der Lerngruppen.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from teilnahmen_gruppe")
        tuples = cursor.fetchall()

        for (id, teilnehmer, lerngruppe) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_lerngruppe(lerngruppe)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_student_id(self, person_id):
        """ Findet alle Gruppenteilnahmen einer bestimmten person mittels User Id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, teilnehmer, lerngruppe FROM teilnahmen_gruppe WHERE teilnehmer={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, teilnehmer, lerngruppe) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_lerngruppe(lerngruppe)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_lerngruppe_id(self, lerngruppe_id):
        """ Findet alle Teilnahmen/Teilnehmer einer bestimmten Gruppen ID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, teilnehmer, lerngruppe FROM teilnahmen_gruppe WHERE lerngruppe={}".format(
            lerngruppe_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, teilnehmer, lerngruppe) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_lerngruppe(lerngruppe)
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
		'''
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM teilnahmen_gruppe ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            teilnahme.set_id(maxid[0] + 1)

            command = "INSERT INTO teilnahmen_gruppe (id, teilnehmer, lerngruppe) VALUES (%s,%s,%s)"
            data = (teilnahme.get_id(), teilnahme.get_teilnehmer(), teilnahme.get_lerngruppe())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return teilnahme

    def update(self, teilnahme):
        """Überschreiben / Aktualisieren eines Teilnahme-Objekts in der DB
        :param teilnahme
        :return aktualisiertes Teilnahme-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE teilnahmen_gruppe SET teilnehmer=%s, lerngruppe=%s WHERE id=%s"
        data = (teilnahme.get_teilnehmer(), teilnahme.get_lerngruppe(), teilnahme.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, teilnahmen_gruppe):
        """Löschen der Daten eines teilnahme-Objekts der Lerngruppe aus der Datenbank.
        """

        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen_gruppe WHERE id={}".format(teilnahmen_gruppe.get_id_())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
