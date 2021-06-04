CREATE DATABASE IF NOT EXISTS `lernapp_SWPra` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lernapp_SWPra`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`profile` ;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lernapp_SWPra`.`profile` (
  `id` INT NOT NULL,
  `studiengang` VARCHAR(45) NULL,
  `semester` INT NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_profil_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_profil_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `lernapp_SWPra`.`profile` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`profile` VALUES (1, 'Wirtschaftsinformatik und digitale Medien', 3, 1), (2, 'CR/PR', 2, 2), (3, 'Wirtschaftsinformatik und digitale Medien', 2, 3),
(4, 'Wirtschaftsinformatik und digitale Medien', 3, 4), (5, 'CR/PR', 2, 5), (6, 'Medieninformatik', 5, 6), (7, 'Medieninformatik', 3, 7);
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`personen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`personen` ;

CREATE TABLE `lernapp_SWPra`.`personen` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NULL,
  `vorname` VARCHAR(45) NULL,
  `alter` INT NULL,
  `geschlecht` VARCHAR(45) NULL,
  `lerngruppe` TINYINT,
  `google_user_id` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `profil_id`),
  INDEX `fk_person_profil1_idx` (`profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_person_profil1`
    FOREIGN KEY (`profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `personen`
--

LOCK TABLES `lernapp_SWPra`.`personen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`personen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`personen` VALUES (1, 'Müller', 'Tim', 20, 'männlich', true, '1', 'timmueller@gmail.com', 1), (2, 'Maier', 'Lisa', 19, 'weiblich', true, '2', 'lischen2002@gmx.de', 2),
(3, 'Baum', 'Manuela', 22, 'weiblich', false,  '3', 'manni99@gmail.com', 3), (4, 'Possible', 'Kim', 20, 'weiblich', true, '4', 'kimpossible@hotmail.de', 4), (5, 'Smith', 'John', 24, 'männlich', true, '5', 'jonny@hotmail.com', 5), 
(6, 'Jones', 'Alex', 23, 'männlich', false, '6', 'alexjones@gmail.com', 6),  (7, 'Becker', 'Klaus', 19, 'männlich', true, '7', 'becker77@gmx.de', 7);
/*!40000 ALTER TABLE `lernapp_SWPra`.`personen` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernfaecher` (
  `id` INT NOT NULL,
  `bezeichnung` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `lernfaecher`
--

LOCK TABLES `lernapp_SWPra`.`lernfaecher` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernfaecher` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernfaecher` VALUES (1, 'Software Entwicklung'), (2, 'Data Science'), (3, 'Rechnungswesen'), (4, 'Medienrecht'),
(5, 'Crossmedia-Konzeption'), (6, 'Web-Technologie und Datenkompetenz'), (7, 'Datenbanken'), (8, 'IT-Security');
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernfaecher` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lerngruppen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lerngruppen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lerngruppen` (
  `id` INT NOT NULL,
  `profil_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`, `profil_id`, `profile_id`),
  INDEX `fk_lerngruppen_profile1_idx` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_lerngruppen_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`profile_has_lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` (
  `profil_id` INT NOT NULL,
  `lernfaecher_id` INT NOT NULL,
  `kenntnisstand` VARCHAR(45) NULL,
  PRIMARY KEY (`profil_id`, `lernfaecher_id`),
  INDEX `fk_profil_has_lernfaecher_lernfaecher1_idx` (`lernfaecher_id` ASC) VISIBLE,
  INDEX `fk_profil_has_lernfaecher_profil1_idx` (`profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_profil_has_lernfaecher_profil1`
    FOREIGN KEY (`profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profil_has_lernfaecher_lernfaecher1`
    FOREIGN KEY (`lernfaecher_id`)
    REFERENCES `lernapp_SWPra`.`lernfaecher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_gruppe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` (
  `person_id` INT NOT NULL,
  `person_profil_id` INT NOT NULL,
  `id` VARCHAR(45) NOT NULL,
  `lerngruppen_id` INT NOT NULL,
  `lerngruppen_profil_id` INT NOT NULL,
  PRIMARY KEY (`person_id`, `person_profil_id`, `id`, `lerngruppen_id`, `lerngruppen_profil_id`),
  INDEX `fk_person_has_lerngruppe_person1_idx` (`person_id` ASC, `person_profil_id` ASC) VISIBLE,
  INDEX `fk_teilnahmen_gruppe_lerngruppen1_idx` (`lerngruppen_id` ASC, `lerngruppen_profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_person_has_lerngruppe_person1`
    FOREIGN KEY (`person_id` , `person_profil_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teilnahmen_gruppe_lerngruppen1`
    FOREIGN KEY (`lerngruppen_id` , `lerngruppen_profil_id`)
    REFERENCES `lernapp_SWPra`.`lerngruppen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`konversation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`konversation` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`konversation` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`nachrichten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`nachrichten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`nachrichten` (
  `id` INT NOT NULL,
  `nachricht_inhalt` VARCHAR(45) NULL,
  `person_id` INT NOT NULL,
  `konversation_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`, `konversation_id`),
  INDEX `fk_nachricht_person1_idx` (`person_id` ASC) VISIBLE,
  INDEX `fk_nachrichten_konversation1_idx` (`konversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_nachricht_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nachrichten_konversation1`
    FOREIGN KEY (`konversation_id`)
    REFERENCES `lernapp_SWPra`.`konversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`tageszeiten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`tageszeiten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`tageszeiten` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `tageszeiten`
--

LOCK TABLES `lernapp_SWPra`.`tageszeiten` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`tageszeiten` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`tageszeiten` VALUES (1, 'Morgens'), (2, 'Mittags'), (3, 'Abends');
/*!40000 ALTER TABLE `lernapp_SWPra`.`tageszeiten` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`tage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`tage` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`tage` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `tage`
--

LOCK TABLES `lernapp_SWPra`.`tage` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`tage` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`tage` VALUES (1, 'Unter der Woche'), (2, 'Am Wochenende');
/*!40000 ALTER TABLE `lernapp_SWPra`.`tage` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`frequenzen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`frequenzen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`frequenzen` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `frequenzen`
--

LOCK TABLES `lernapp_SWPra`.`frequenzen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`frequenzen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`frequenzen` VALUES (1, 'Wöchentlich'), (2, 'Mehrmals die Woche'), (3, 'Alle zwei Wochen');
/*!40000 ALTER TABLE `lernapp_SWPra`.`frequenzen` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernarten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernarten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernarten` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `lernarten`
--

LOCK TABLES `lernapp_SWPra`.`lernarten` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernarten` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernarten` VALUES (1, 'Visuell'), (2, 'Auditiv'), (3, 'Motorisch'), (4, 'Kommunikativ');
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernarten` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`gruppengroessen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`gruppengroessen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`gruppengroessen` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `gruppengroessen`
--

LOCK TABLES `lernapp_SWPra`.`gruppengroessen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`gruppengroessen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`gruppengroessen` VALUES (1, 'Bis zu 3 Personen'), (2, '3-5 Personen'), (3, 'Über 5 Personen');
/*!40000 ALTER TABLE `lernapp_SWPra`.`gruppengroessen` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernorte`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernorte` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernorte` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `lernorte`
--

LOCK TABLES `lernapp_SWPra`.`lernorte` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernorte` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernorte` VALUES (1, 'Remote'), (2, 'Hochschule'), (3, 'Bibliothek'), (4, 'Cafe');
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernorte` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernvorlieben`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernvorlieben` ;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernvorlieben` (
  `id` INT NOT NULL,
  `tageszeiten_id` INT NOT NULL,
  `tage_id` INT NOT NULL,
  `frequenzen_id` INT NOT NULL,
  `lernarten_id` INT NOT NULL,
  `gruppengroessen_id` INT NOT NULL,
  `lernorte_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tageszeiten_id`, `tage_id`, `frequenzen_id`, `lernarten_id`, `gruppengroessen_id`, `lernorte_id`),
  INDEX `fk_lernvorlieben_tageszeiten1_idx` (`tageszeiten_id` ASC) VISIBLE,
  INDEX `fk_lernvorlieben_tage1_idx` (`tage_id` ASC) VISIBLE,
  INDEX `fk_lernvorlieben_frequenzen1_idx` (`frequenzen_id` ASC) VISIBLE,
  INDEX `fk_lernvorlieben_lernarten1_idx` (`lernarten_id` ASC) VISIBLE,
  INDEX `fk_lernvorlieben_gruppengroessen1_idx` (`gruppengroessen_id` ASC) VISIBLE,
  INDEX `fk_lernvorlieben_lernorte1_idx` (`lernorte_id` ASC) VISIBLE,
  CONSTRAINT `fk_lernvorlieben_tageszeiten1`
    FOREIGN KEY (`tageszeiten_id`)
    REFERENCES `lernapp_SWPra`.`tageszeiten` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lernvorlieben_tage1`
    FOREIGN KEY (`tage_id`)
    REFERENCES `lernapp_SWPra`.`tage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lernvorlieben_frequenzen1`
    FOREIGN KEY (`frequenzen_id`)
    REFERENCES `lernapp_SWPra`.`frequenzen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lernvorlieben_lernarten1`
    FOREIGN KEY (`lernarten_id`)
    REFERENCES `lernapp_SWPra`.`lernarten` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lernvorlieben_gruppengroessen1`
    FOREIGN KEY (`gruppengroessen_id`)
    REFERENCES `lernapp_SWPra`.`gruppengroessen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lernvorlieben_lernorte1`
    FOREIGN KEY (`lernorte_id`)
    REFERENCES `lernapp_SWPra`.`lernorte` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lernvorlieben`
--

LOCK TABLES `lernapp_SWPra`.`lernvorlieben` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernvorlieben` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernvorlieben` VALUES (1, 2, 1, 3, 2, 1, 1), (2, 2, 2, 2, 1, 1, 3), (3, 1, 1, 2, 3, 3, 4), 
(4, 3, 1, 3, 4, 3, 4), (5, 1, 2, 1, 1, 3, 3), (6, 2, 2, 2, 2, 1, 4), (7, 3, 2, 2, 1, 2, 2);
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernvorlieben` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`vorschlaege`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`vorschlaege` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`vorschlaege` (
  `id` INT NOT NULL,
  `match_quote` INT NULL,
  `lernfaecher_id` VARCHAR(45) NULL,
  `main_person_id` VARCHAR(45) NULL,
  `personen_id` INT NOT NULL,
  `personen_profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `personen_id`, `personen_profil_id`),
  INDEX `fk_vorschlaege_personen1_idx` (`personen_id` ASC, `personen_profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_vorschlaege_personen1`
    FOREIGN KEY (`personen_id` , `personen_profil_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_chat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_chat` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_chat` (
  `id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `konversation_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`, `konversation_id`),
  INDEX `fk_teilnehmer_chat_person1_idx` (`person_id` ASC) VISIBLE,
  INDEX `fk_teilnehmer_chat_konversation1_idx` (`konversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_teilnehmer_chat_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teilnehmer_chat_konversation1`
    FOREIGN KEY (`konversation_id`)
    REFERENCES `lernapp_SWPra`.`konversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
