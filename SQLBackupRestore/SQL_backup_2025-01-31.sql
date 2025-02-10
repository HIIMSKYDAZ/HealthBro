-- MySqlBackup.NET 2.3.8.0
-- Dump Time: 2025-01-31 08:00:23
-- --------------------------------------
-- Server version 10.4.32-MariaDB mariadb.org binary distribution


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 
-- Definition of exercises
-- 

DROP TABLE IF EXISTS `exercises`;
CREATE TABLE IF NOT EXISTS `exercises` (
  `ExerciseID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `MuscleGroup` varchar(50) NOT NULL,
  `Description` text DEFAULT NULL,
  PRIMARY KEY (`ExerciseID`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table exercises
-- 

/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises`(`ExerciseID`,`Name`,`MuscleGroup`,`Description`) VALUES(11,'Fekvenyomás','Mell','Egy klasszikus mellgyakorlat, amely a mellizmokat célozza meg.'),(12,'Felhúzás','Hát','Egy összetett gyakorlat, amely a derék, a farizmok és a combhajlítók izmait dolgoztatja.'),(13,'Guggolás','Lábak','Alapvető lábgyakorlat, amely a combfeszítőket, combhajlítókat és farizmokat dolgoztatja.'),(14,'Húzódzkodás','Hát','Saját testsúlyos gyakorlat, amely a széles hátizmot és a bicepszet célozza meg.'),(15,'Bicepsz hajlítás','Karok','Izolációs gyakorlat a bicepsz számára, kézisúlyzókkal vagy rúddal végezve.'),(16,'Vállból nyomás','Vállak','Összetett vállgyakorlat, amely a tricepszet is igénybe veszi.'),(17,'Oldalemelés','Vállak','Izolációs mozdulat, amely az oldalsó deltaizmokat célozza meg.'),(18,'Tolódzkodás','Karok','Saját testsúlyos gyakorlat, amely a tricepszre fókuszál.'),(19,'Lábnyomás','Lábak','Gépes gyakorlat, amely a combfeszítőket, combhajlítókat és farizmokat célozza meg.'),(20,'Kitörés','Lábak','Egyoldalas gyakorlat, amely a lábakat és a farizmokat dolgoztatja.'),(21,'Evezés rúddal','Hát','Összetett gyakorlat, amely a középső és felső hátat célozza.'),(22,'Kereszthúzás kábelgépen','Mell','Izolációs mozdulat a mellizmok számára.'),(23,'Ferdepados nyomás','Mell','A fekvenyomás egy változata, amely a felső mellizmokat célozza meg.'),(24,'Román felhúzás','Lábak','A felhúzás egy változata, amely a combhajlítókat és farizmokat célozza meg.'),(25,'Plank','Törzs','Izometrikus gyakorlat, amely az egész törzs izomzatát dolgoztatja.'),(26,'Orosz Twist','Törzs','Rotációs gyakorlat, amely a ferde hasizmokat célozza meg.'),(27,'Arcemelés kábelgépen','Vállak','Korrigáló gyakorlat a hátsó deltaizmok és a trapézizmok számára.'),(28,'Vádli emelés','Lábak','Izolációs gyakorlat a vádli izmaira.'),(29,'Tárogatás','Mell','Izolációs gyakorlat, amely a mellizmokat célozza meg.'),(30,'Ülő evezés','Hát','Gépes gyakorlat, amely a hátizmokra összpontosít.'),(31,'Kalapács bicepsz hajlítás','Karok','A bicepsz hajlítás egy változata, amely a brachialis izmot célozza meg.'),(32,'Scott-pados bicepsz','Karok','Izolációs gyakorlat, amelyet Scott-padon végeznek a bicepsz számára.'),(33,'Homlokhoz engedés','Karok','Tricepsz gyakorlat, amelyet rúddal vagy kézisúlyzókkal végeznek.'),(34,'Good Morning','Hát','Hátsó lánc gyakorlat, amely az alsó hátat és a combhajlítókat erősíti.'),(35,'Elölguggolás','Lábak','A guggolás egy változata, amely a combfeszítőket helyezi előtérbe.'),(36,'Lógó lábemelés','Törzs','Törzserősítő gyakorlat, amelyet húzódzkodó rúdon végeznek.'),(37,'Oldalsó plank','Törzs','Izometrikus gyakorlat, amely a ferde hasizmokra és a törzsstabilitásra összpontosít.'),(38,'Tárogatás kézisúlyzóval','Mell','Szabadsúlyos gyakorlat, amely a mellizmokat izolálja.'),(39,'Gépes vállnyomás','Vállak','Gépes összetett vállgyakorlat.'),(40,'Mellhez húzás','Hát','Gépes gyakorlat, amely a széles hátizmot célozza meg.'),(41,'Tricepsz lenyomás kábelgépen','Karok','Izolációs gyakorlat a tricepsz számára kábelgéppel.'),(42,'Álló vállból nyomás','Vállak','Rudas gyakorlat a vállak és tricepsz számára.'),(43,'Farmers séta','Teljes test','Súlyok cipelése, amely fejleszti a fogáserőt és az állóképességet.'),(44,'Csípőemelés','Farizmok','A farizmokat célzó gyakorlat erő- és izomnöveléshez.'),(45,'Fellépés','Lábak','Egyoldalas alsótest gyakorlat, amelyet padon vagy platformon végeznek.'),(46,'Húzódzkodás bicepszel','Hát','Saját testsúlyos húzó gyakorlat, amely a bicepszet és a hátat célozza.'),(47,'Fordított tárogatás','Vállak','Izolációs mozdulat a hátsó deltaizmok számára.'),(48,'Haskerék gurítás','Törzs','Haladó törzsgyakorlat haskerékkel.'),(49,'Egkezes evezés','Hát','Egykezes evező gyakorlat a széles hátizomra és a trapézizomra.'),(50,'Ferdepados kézisúlyzós nyomás','Mell','Szabadsúlyos gyakorlat a felső mellizomra.'),(51,'Sumo felhúzás','Lábak','Széles terpeszű felhúzás, amely a belső combokat és a farizmokat célozza meg.'),(52,'Kábel oldalemelés','Vállak','Kábelgépes gyakorlat az oldalsó deltaizmokra.'),(53,'Arnold nyomás','Vállak','Vállgyakorlat, amely a nyomást és forgást kombinálja.'),(54,'Sárkányzászló','Törzs','Haladó törzsgyakorlat, amelyet Bruce Lee tett híressé.'),(55,'T-rudas evezés','Hát','Gépes vagy rudas gyakorlat a középső hátra.'),(56,'Pullover kézisúlyzóval','Mell','Szabadsúlyos gyakorlat a mellizomra és a széles hátizomra.');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;

-- 
-- Definition of permission
-- 

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Level` int(1) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Szint` (`Level`),
  UNIQUE KEY `Nev` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table permission
-- 

/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission`(`Id`,`Level`,`Name`,`Description`) VALUES(1,0,'Luzer','Webes regisztráció felhasználó'),(2,9,'Administrator','Rendszergazda');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

-- 
-- Definition of planexercises
-- 

DROP TABLE IF EXISTS `planexercises`;
CREATE TABLE IF NOT EXISTS `planexercises` (
  `PlanExerciseID` int(11) NOT NULL AUTO_INCREMENT,
  `PlanID` int(11) DEFAULT NULL,
  `ExerciseID` int(11) DEFAULT NULL,
  `Sets` int(11) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Reps` int(11) NOT NULL,
  PRIMARY KEY (`PlanExerciseID`),
  KEY `PlanID` (`PlanID`),
  KEY `ExerciseID` (`ExerciseID`),
  CONSTRAINT `planexercises_ibfk_1` FOREIGN KEY (`PlanID`) REFERENCES `workoutplans` (`PlanID`),
  CONSTRAINT `planexercises_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `exercises` (`ExerciseID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table planexercises
-- 

/*!40000 ALTER TABLE `planexercises` DISABLE KEYS */;
INSERT INTO `planexercises`(`PlanExerciseID`,`PlanID`,`ExerciseID`,`Sets`,`Weight`,`Reps`) VALUES(8,5,11,3,60,8),(9,5,12,1,1,1);
/*!40000 ALTER TABLE `planexercises` ENABLE KEYS */;

-- 
-- Definition of user
-- 

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LoginName` varchar(16) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(64) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `LoginNev` (`LoginName`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Jog` (`PermissionId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `permission` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table user
-- 

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`(`Id`,`LoginName`,`HASH`,`SALT`,`Name`,`PermissionId`,`Active`,`Email`,`ProfilePicturePath`) VALUES(1,'kerenyir','dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef','jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp','Kerenyi',2,1,'kerenyir@kkszki.hu','test.png'),(14,'gabisad','a157b416077e65dc21422590863bc943a14cf0c9532369fffdb146b33111e7ea','bp84eEYWhIy3qOt6tcIlk4YrkJgFs7WuTTxHsA3vs5ldK9JtPBq40j57bB7cYxse','gabiasd',1,1,'gabi115@gmail.com',''),(21,'string','473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8','string','string',1,0,'string','string'),(23,'asd','bd49a7a6e69167fbcd0e80458337a08d61941f4673dc54d0a2d6127faa66f525','KSQ840ERoHQz6QsP6LwgOiPWPTMeygnUKs97K4hENmEXgTmn1BZgguvQLXkBhMfa','asdmodosit',2,1,'asd','default.jpg'),(24,'uj2','dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef','jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp','uj',1,1,'uj','default.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 
-- Definition of workoutplans
-- 

DROP TABLE IF EXISTS `workoutplans`;
CREATE TABLE IF NOT EXISTS `workoutplans` (
  `PlanID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `PlanName` varchar(100) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`PlanID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table workoutplans
-- 

/*!40000 ALTER TABLE `workoutplans` DISABLE KEYS */;
INSERT INTO `workoutplans`(`PlanID`,`UserID`,`PlanName`,`CreatedAt`) VALUES(4,1,'Új Edzésterv','2025-01-23 19:00:00'),(5,1,'Test','2025-01-23 19:51:55'),(6,1,'Test','2025-01-23 19:51:58');
/*!40000 ALTER TABLE `workoutplans` ENABLE KEYS */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- Dump completed on 2025-01-31 08:00:23
-- Total time: 0:0:0:0:172 (d:h:m:s:ms)
