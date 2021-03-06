CREATE DATABASE IF NOT EXISTS `lernapp_SWPra` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lernapp_SWPra`;

-- Host: 127.0.0.1    Database: lernapp_SWPra
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

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`profile` (
  `id` INT NOT NULL,
  `gruppe` TINYINT NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_profil_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_profil_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profile`
--

LOCK TABLES `lernapp_SWPra`.`profile` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`profile` VALUES (1, false, 1), (2, false, 2), (3, false, 3),
(4, false, 4), (5, false, 5), (6, false, 6), (7, false, 7), (8, false, 8), (9, false, 9), (10, false, 10), (11, false, 11), (12, true, 12),
(13, true, 13), (14, true, 14), (15, true, 15), (16, true, 16), (17, true, 17);
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`personen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`personen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`personen` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `vorname` VARCHAR(45) NULL,
  `semester` INT NULL,
  `studiengang` VARCHAR(45) NULL,
  `alter` INT NULL,
  `geschlecht` VARCHAR(45) NULL,
  `lerngruppe` TINYINT NULL,
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
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personen`
--

LOCK TABLES `lernapp_SWPra`.`personen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`personen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`personen` VALUES (1, 'M??ller', 'Tim', 3, 'Wirtschaftsinformatik und digitale Medien', 20, 'm??nnlich', false, 1, 'timmueller@gmail.com', 1), (2, 'Maier', 'Lisa', 2, 'CR/PR', 19, 'weiblich', true, 2, 'lischen2002@gmx.de', 2),
(3, 'Baum', 'Manuela', 2, 'Wirtschaftsinformatik und digitale Medien', 22, 'weiblich', true,  3, 'manni99@gmail.com', 3), (4, 'Possible', 'Kim', 3, 'Wirtschaftsinformatik und digitale Medien', 20, 'weiblich', true, 4, 'kimpossible@hotmail.de', 4), 
(5, 'Smith', 'John', 4, 'CR/PR', 24, 'm??nnlich', true, 5, 'jonny@hotmail.com', 5), (6, 'Jones', 'Alex', 5, 'Medieninformatik', 23, 'm??nnlich', false, 6, 'alexjones@gmail.com', 6),  
(7, 'Becker', 'Klaus', 3, 'Medieninformatik', 19, 'm??nnlich', true, 7, 'becker77@gmx.com', 7), (8, 'Hafner', 'Sandra',  1, 'Informationsdesign', 17, 'weiblich', true, 8, 'sandra.hafner@gmail.com', 8), (9, 'Probulic', 'Benjamin',  3, 'Online-Medien-Management', 23, 'm??nnlich', true, 9, 'benjamin.probulic@gmail.de', 9), 
(10, 'M??slier', 'Joanna',  2, 'Verpackungstechnik', 21, 'weiblich', true, 10, 'joanna.muslier@gmail.com', 10), (11, 'Walter', 'Frank',  3, 'Mobile Medien', 18, 'm??nnlich', true, 11, 'frank.walter@gmail.com', 11);
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
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lernfaecher`
--

LOCK TABLES `lernapp_SWPra`.`lernfaecher` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernfaecher` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernfaecher` VALUES (1, 'Software Entwicklung'), (2, 'Data Science'), (3, 'F??hrungsorientiertes Rechnungswesen'), (4, 'Medienrecht'),
(5, 'Crossmedia-Konzeption'), (6, 'Web-Technologie'), (7, 'Datenbanken'), (8, 'IT-Security'), (9, 'Kein Lernfach ausgew??hlt'), (10, 'Naturwissenschaften 1'), (11, 'Usability Engineering'),(12, 'User Interface Design'), 
(13, 'Informationspsychologie'), (14, 'Angewandte Mathematik'), (15, 'Data Literacy'), (16, 'Anwendungssicherheit'), (17, 'Organisation'), (18, 'K??nstliche Intelligenz'), (19, 'Darstellungstechnik'), 
(20, 'Werkstoffpr??fung'), (21, 'Grundlagen Logistik');
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernfaecher` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lerngruppen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lerngruppen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lerngruppen` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `profil_id`),
  INDEX `fk_lerngruppen_profile1_idx` (`profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_lerngruppen_profile1`
    FOREIGN KEY (`profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lerngruppen`
--

LOCK TABLES `lernapp_SWPra`.`lerngruppen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lerngruppen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lerngruppen` VALUES (1, 'Lern Buddys', 12), (2, 'Girl Power', 13), (3, 'Programmier-Pros', 14),(4, 'MediaNigth', 15), (5, 'SW-Praktikum', 16), (6, 'HdM', 17);
/*!40000 ALTER TABLE `lernapp_SWPra`.`lerngruppen` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`profile_has_lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` (
  `profil_id` INT NOT NULL,
  `lernfaecher_id` INT NOT NULL,
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
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profile_has_lernfaecher`
--

LOCK TABLES `lernapp_SWPra`.`profile_has_lernfaecher` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile_has_lernfaecher` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`profile_has_lernfaecher` VALUES (1, 1), (1, 2), (2, 4), (2, 5), (3, 1), (3, 2), 
(4, 1), (4, 2), (5, 4), (5, 5), (6, 7), (6, 8), (6, 13), (7, 7), (7, 8), (8, 9), (8, 6), (9, 15), (9, 18), (10, 20), (10, 21), (10, 22),
(11, 14), (11, 13), (12, 17), (12, 2), (13, 14), (13, 7), (13, 1), (14, 16), (14, 21), (15, 12), (16, 11), (17, 19), (17, 18); 
/*!40000 ALTER TABLE `lernapp_SWPra`.`profile_has_lernfaecher` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_gruppe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` (
  `id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `lerngruppe_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`, `lerngruppe_id`),
  INDEX `fk_teilnahmen_gruppe_personen1_idx` (`person_id` ASC) VISIBLE,
  INDEX `fk_teilnahmen_gruppe_lerngruppen1_idx` (`lerngruppe_id` ASC) VISIBLE,
  CONSTRAINT `fk_teilnahmen_gruppe_personen1`
    FOREIGN KEY (`person_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teilnahmen_gruppe_lerngruppen1`
    FOREIGN KEY (`lerngruppe_id`)
    REFERENCES `lernapp_SWPra`.`lerngruppen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teilnahmen_gruppe`
--

LOCK TABLES `lernapp_SWPra`.`teilnahmen_gruppe` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`teilnahmen_gruppe` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`teilnahmen_gruppe` VALUES (1, 2, 1), (2, 3, 1), (3, 4, 1), (4, 2, 2), (5, 3, 2), (6, 4, 2), (7, 3, 3), (8, 4, 3), (9, 7, 3), (10, 11, 4), (11, 7, 6), (12, 8, 5),
 (13, 3, 4), (14, 9, 6), (13, 3, 5);
/*!40000 ALTER TABLE `lernapp_SWPra`.`teilnahmen_gruppe` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`konversationen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`konversationen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`konversationen` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `anfragestatus` TINYINT NULL, 
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `konversationen`
--

LOCK TABLES `lernapp_SWPra`.`konversationen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`konversationen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`konversationen` VALUES (1, 'Lern Buddys', true), (2, 'Girl Power', true), (3, 'Programmier-Pros', true), (4, 'MediaNight', true), (5, 'SW-Praktikum', true), (6, 'HdM', true);
/*!40000 ALTER TABLE `lernapp_SWPra`.`konversationen` ENABLE KEYS */;
UNLOCK TABLES;

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
    REFERENCES `lernapp_SWPra`.`konversationen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`tageszeiten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`tageszeiten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`tageszeiten` (
  `id` INT NOT NULL,
  `praeferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

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
  `praeferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

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
  `praeferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `frequenzen`
--

LOCK TABLES `lernapp_SWPra`.`frequenzen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`frequenzen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`frequenzen` VALUES (1, 'Mehrmals die Woche'), (2, 'W??chentlich'), (3, 'Alle zwei Wochen');
/*!40000 ALTER TABLE `lernapp_SWPra`.`frequenzen` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernarten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernarten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernarten` (
  `id` INT NOT NULL,
  `praeferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

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
  `praeferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gruppengroessen`
--

LOCK TABLES `lernapp_SWPra`.`gruppengroessen` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`gruppengroessen` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`gruppengroessen` VALUES (1, 'Bis zu 3 Personen'), (2, '3-5 Personen'), (3, '??ber 5 Personen'), (4, 'Default Gruppe');
/*!40000 ALTER TABLE `lernapp_SWPra`.`gruppengroessen` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernorte`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernorte` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernorte` (
  `id` INT NOT NULL,
  `praeferenz` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;

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
ENGINE = InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lernvorlieben`
--

LOCK TABLES `lernapp_SWPra`.`lernvorlieben` WRITE;
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernvorlieben` DISABLE KEYS */;
INSERT INTO `lernapp_SWPra`.`lernvorlieben` VALUES (1, 2, 1, 3, 2, 1, 1), (2, 2, 2, 2, 1, 1, 3), (3, 1, 1, 2, 3, 3, 4), 
(4, 3, 1, 3, 4, 3, 4), (5, 1, 2, 1, 1, 3, 3), (6, 2, 2, 2, 2, 1, 4), (7, 3, 2, 2, 1, 2, 2), (8, 1, 2, 3, 2, 1, 1),
(9, 2, 1, 2, 3, 2, 1), (10, 2, 2, 1, 2, 1, 4), (11, 3, 1, 3, 3, 3, 3), (12, 3, 2, 3, 3, 3, 4), (13, 1, 1, 3, 3, 4, 1),
(14, 3, 2, 3, 3, 3, 2), (15, 2, 1, 3, 3, 3, 3), (16, 2, 1, 3, 3, 3, 4), (17, 1, 1, 3, 3, 3, 1);
/*!40000 ALTER TABLE `lernapp_SWPra`.`lernvorlieben` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`vorschlaege`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`vorschlaege` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`vorschlaege` (
  `id` INT NOT NULL,
  `main_person_id` VARCHAR(45) NULL,
  `match_quote` FLOAT NULL,
  `lernfaecher_id` VARCHAR(45) NULL,
  `match_profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `match_profil_id`),
  INDEX `fk_vorschlaege_profile1_idx` (`match_profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_vorschlaege_profile1`
    FOREIGN KEY (`match_profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_chat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_chat` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_chat` (
  `id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `anfrage_sender` INT NOT NULL,
  `status` TINYINT NULL,
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
    REFERENCES `lernapp_SWPra`.`konversationen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;