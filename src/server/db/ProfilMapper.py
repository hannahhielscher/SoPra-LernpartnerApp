from server.db.Mapper import Mapper
from server.bo.Profil import Profil


class ProfilMapper(Mapper):
    """Mapper-Klasse, die Profil-Objekte auf eine relationale Datenbank abbildet. 
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Profile.

        :return Alle Profil-Objekten im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT profile.id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id FROM profile INNER JOIN profile_has_lernfaecher ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.profil_id = profile.id"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, gruppe, lernfaecher_id, lernvorlieben_id) in tuples:

            buff = False
            for profil in result:
                if profil.get_id() == id:
                    buff = True
                    profil.set_lernfaecher(lernfaecher_id)

            if buff == False:
                profil = Profil()
                profil.set_id(id)
                profil.set_gruppe(gruppe)
                profil.set_lernfaecher(lernfaecher_id)
                profil.set_lernvorlieben_id(lernvorlieben_id)

                result.append(profil)
            else:
                pass

            self._connection.commit()
            cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Profils nach ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, gruppe, lernvorlieben_id FROM profile WHERE id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, gruppe, lernvorlieben_id) in tuples:
            profil = Profil()
            profil.set_id(id)
            profil.set_gruppe(gruppe)
            profil.set_lernfaecher(self.find_lernfaecher_id_by_profil_id(id))
            profil.set_lernvorlieben_id(lernvorlieben_id)

            result = profil
            print(result)
        self._connection.commit()
        cursor.close()

        return result

    def find_profil_test(self, profil_id):
        """Suchen eines Profils nach ID.
        Hier werden die Lernfächer als einfache Liste im Profil eingefügt

        :param id Primärschlüsselattribut (->DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, gruppe, lernvorlieben_id FROM profile WHERE id ='{}'".format(profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
        for (id, gruppe, lernvorlieben_id) in tuples:
    
            profil = Profil()
            profil.set_id(id)
            profil.set_gruppe(gruppe)
            profil.set_lernfaecher(self.find_lernfaecher_id_by_profil_id(profil_id))
            profil.set_lernvorlieben_id(lernvorlieben_id)

            result = profil
            print(result)
        self._connection.commit()
        cursor.close()

        return result  

    def find_lernfaecher_id_by_profil_id(self, profil_id):
        """Suchen der Lernfaecher nach profilID. 
        Hier werden die Lernfächer als einfache Liste zusammengestellt

        :param profil_id ProfilID von profile_has_lernfaecher (DB)
        :return Liste aller Lernfaecher des Profils
        """

        result = []

        cursor = self._connection.cursor()
        command = "SELECT lernfaecher_id FROM profile_has_lernfaecher WHERE profil_id ='{}'".format(profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
        for lernfaecher_id in tuples:
            data = lernfaecher_id[0]
            result.append(data)

        self._connection.commit()
        cursor.close()
        print(result)
        return result
    
    def find_by_lernfach_id(self, lernfach_id):
        """Suchen eines Profils nach lernfachID. 
        Hier werden die Lernfächer als einfache Liste im Profil eingefügt

        :param lernfach_id Lernfach ID von profile_has_lernfaecher (DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel.
        """

        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.profil_id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id  FROM profile_has_lernfaecher INNER JOIN profile ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.lernfaecher_id ='{}'".format(lernfach_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (profil_id, gruppe, lernfaecher_id, lernvorlieben_id) in tuples:
            profil = Profil()
            profil.set_id(profil_id)
            profil.set_gruppe(gruppe)
            #profil.set_lernfaecher(find_lernfaecher_id_by_profil_id(profil_id))
            profil.set_lernfaecher(lernfaecher_id)
            profil.set_lernvorlieben_id(lernvorlieben_id)

            result.append(profil)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, profil):
        """Einfügen eines Profil-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param profil das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                profil.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                profil.set_id(1)
        
        command = "INSERT INTO profile (id, gruppe, lernvorlieben_id) VALUES (%s,%s,%s)"
        data = (profil.get_id(), profil.get_gruppe(), profil.get_lernvorlieben_id())
        cursor.execute(command, data)

        lernfaecher = profil.get_lernfaecher()
        command2 = "INSERT INTO profile_has_lernfaecher (profil_id, lernfaecher_id) VALUES (%s,%s)"

        for lernfach in lernfaecher:
            #for i in lernfach:
            data2 = (profil.get_id(), lernfach)
                #print(lernfaecher)
                #print(lernfach)
                #print(i)
            cursor.execute(command2, data2)

        self._connection.commit()
        cursor.close()

        return profil


    def update(self, profil):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param profil das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()
        
        
        command = "UPDATE profile " + "SET gruppe=%s, lernvorlieben_id=%s WHERE id=%s"
        data = ( profil.get_gruppe(), profil.get_lernvorlieben_id(), profil.get_id())
        self.delete_profil_has_lernfaecher(profil.get_id())
        cursor.execute(command, data)
        #command1 = "DELETE FROM profile_has_lernfaecher WHERE profil_id=%s"
        #data1 = (profil.get_id())
        #cursor.execute(command1, data1)
        lernfaecherperson = profil.get_lernfaecher()
        lernfaecher = lernfaecherperson.split(",")
        command2 = "INSERT INTO profile_has_lernfaecher (profil_id, lernfaecher_id) VALUES (%s,%s)"
        
        for (lernfach) in lernfaecher:
            
            data2 = (profil.get_id(), lernfach)
            print(lernfaecher)
            print(lernfach)
            #print(i)
            cursor.execute(command2, data2)

        self._connection.commit()
        cursor.close()

        return profil

    def delete(self, profil):
        """Löschen der Daten eines Profil-Objekts aus der Datenbank.

        :param profil das aus der DB zu löschende "Objekt"
        """
        cursor = self._connection.cursor()
        
        command = "DELETE FROM profile WHERE id={}".format(profil.get_id())
        self.delete_profil_has_lernfaecher(profil.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_profil_has_lernfaecher(self, profil_id):
        """Löschen der Lernfaecher eines Profil-Objekts aus der Datenbank.

        :param profil_id ProfilID von profile_has_lernfaecher (DB)
        """
        
        cursor = self._connection.cursor()

        command = "DELETE FROM profile_has_lernfaecher WHERE profil_id={}".format(profil_id)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProfilMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)