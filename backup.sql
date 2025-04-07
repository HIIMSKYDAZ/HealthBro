-- MySqlBackup.NET 2.3.8.0
-- Dump Time: 2025-04-03 12:03:35
-- --------------------------------------
-- Server version 8.0.40-azure Source distribution


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
  `ExerciseID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `MuscleGroup` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Description` text COLLATE utf8mb4_hungarian_ci,
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
  `Id` int NOT NULL AUTO_INCREMENT,
  `Level` int NOT NULL,
  `Name` varchar(32) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
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
  `PlanExerciseID` int NOT NULL AUTO_INCREMENT,
  `PlanID` int DEFAULT NULL,
  `ExerciseID` int DEFAULT NULL,
  `Sets` int NOT NULL,
  `Weight` int NOT NULL,
  `Reps` int NOT NULL,
  PRIMARY KEY (`PlanExerciseID`),
  KEY `PlanID` (`PlanID`),
  KEY `ExerciseID` (`ExerciseID`),
  CONSTRAINT `planexercises_ibfk_1` FOREIGN KEY (`PlanID`) REFERENCES `workoutplans` (`PlanID`),
  CONSTRAINT `planexercises_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `exercises` (`ExerciseID`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table planexercises
-- 

/*!40000 ALTER TABLE `planexercises` DISABLE KEYS */;
INSERT INTO `planexercises`(`PlanExerciseID`,`PlanID`,`ExerciseID`,`Sets`,`Weight`,`Reps`) VALUES(78,8,14,3,0,10),(79,8,16,3,0,10),(80,8,18,3,0,10),(81,8,20,3,50,10),(82,8,32,3,0,10),(83,8,31,3,0,10),(84,9,13,2,0,10),(85,9,20,3,32,0),(86,9,23,1,0,10),(87,9,27,3,222,10),(88,9,20,3,0,101),(89,9,21,44,0,3123),(90,9,21,3,0,10),(91,10,14,3,0,10),(92,10,17,3,0,10),(93,10,46,3,0,10),(113,12,11,3,0,10),(114,12,11,3,0,10),(115,12,11,3,0,10),(116,6,NULL,3,0,10),(117,6,NULL,3,0,10),(118,6,NULL,3,0,10),(119,6,NULL,3,0,10),(171,13,14,6,2,10),(172,13,14,3,0,10),(173,13,15,3,0,10),(177,15,11,3,0,10),(178,15,12,3,0,10),(179,15,13,3,0,10),(180,5,13,3,0,10),(181,17,11,3,0,10),(182,17,14,3,0,10),(183,27,11,3,0,10),(184,27,15,6,0,10),(185,27,37,3,0,10),(186,29,12,3,0,10),(187,29,14,3,0,10),(188,29,15,3,0,10),(189,4,36,3,0,10),(190,4,17,3,0,10),(191,34,12,3,0,10),(192,34,14,3,0,10),(193,34,13,3,0,10),(194,34,15,3,0,10),(195,34,16,3,0,10),(196,34,17,3,0,10),(197,34,18,3,0,10);
/*!40000 ALTER TABLE `planexercises` ENABLE KEYS */;

-- 
-- Definition of review
-- 

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `felhasznaloNev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `velemeny` varchar(200) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `profilePicturePath` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table review
-- 

/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review`(`id`,`felhasznaloNev`,`velemeny`,`profilePicturePath`) VALUES(1,'asd','asd','asd'),(2,'string','string','string'),(3,'string','string','string'),(4,'Kerenyi','asdsa','Képernyőkép 2024-09-04 080537.png'),(5,'Kerenyi','Kedvenc alkalmazásom crazy god!!!! sigma','Képernyőkép 2024-09-04 080537.png'),(6,'Kerenyi','aaaaaaaaaaaaaaaaaaaaaaaaaaaaa','Képernyőkép 2025-02-19 122418.png'),(7,'Kerenyi','szia vélemény!','Képernyőkép 2025-02-19 122418.png'),(8,'Kerenyi','uhuhu','Képernyőkép 2025-02-19 122418.png'),(9,'Kerenyi','iiiii','Képernyőkép 2025-02-19 122418.png'),(10,'gabcsi115','xddd','');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;

-- 
-- Definition of staticworkoutplans
-- 

DROP TABLE IF EXISTS `staticworkoutplans`;
CREATE TABLE IF NOT EXISTS `staticworkoutplans` (
  `sPlanID` int NOT NULL AUTO_INCREMENT,
  `PlanName` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`sPlanID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table staticworkoutplans
-- 

/*!40000 ALTER TABLE `staticworkoutplans` DISABLE KEYS */;

/*!40000 ALTER TABLE `staticworkoutplans` ENABLE KEYS */;

-- 
-- Definition of user
-- 

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `LoginName` varchar(16) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `HASH` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `SALT` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Name` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PermissionId` int NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ProfilePicturePath` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `LoginNev` (`LoginName`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Jog` (`PermissionId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `permission` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table user
-- 

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`(`Id`,`LoginName`,`HASH`,`SALT`,`Name`,`PermissionId`,`Active`,`Email`,`ProfilePicturePath`) VALUES(1,'kerenyir','dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef','jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp','Kerenyi',2,1,'kerenyir@kkszki.hu','user1.jpg'),(47,'Dani','3fce2f10747be5b3648f108ca9764452da92f48c6c91b149c1e2c2b6afd3ef48','630826148bc8450c363fc09dcd4a73c6','Dani',1,1,'ludvigp@kkszki.hu',''),(48,'Jorgosz','8ac6e65bb918b78080f898224c00da3eaf2c7c393e83929881449dba36f321a9','cfdc2086248faa49c32de292f5624bf4','Jorgosz ',1,1,'szilagyij@kkszki.hu','image.jpg'),(50,'gabcsi115','9ff8bd7f5298451d80c483579fa73e9d250389dffa19fa01f44463bacd481935','43618413836ce390ba9fd36d9471c283','gabcsi115',1,1,'pocsaig@kkszki.hu',''),(51,'MintaJanos','b4fc5f849d1a87bcf4a45cfa4550768af205e7883f463322e54486e2aab40283','c642e6ff3bdaef3c12316f1a34f01455','MintaJanos',1,0,'MintaJanos@gmail.com','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 
-- Definition of workoutplans
-- 

DROP TABLE IF EXISTS `workoutplans`;
CREATE TABLE IF NOT EXISTS `workoutplans` (
  `PlanID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `PlanName` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PlanID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table workoutplans
-- 

/*!40000 ALTER TABLE `workoutplans` DISABLE KEYS */;
INSERT INTO `workoutplans`(`PlanID`,`UserID`,`PlanName`,`CreatedAt`) VALUES(4,1,'Új Edzésterv','2025-01-23 19:00:00'),(5,1,'Test','2025-01-23 19:51:55'),(6,1,'Test','2025-01-23 19:51:58'),(7,1,'talán','2025-02-10 08:17:43'),(8,1,'uj','2025-02-28 11:00:21'),(9,1,'xddd','2025-03-10 08:18:07'),(10,1,'hggfzt','2025-03-11 09:33:54'),(11,1,'sdasdas','2025-03-11 09:35:55'),(12,1,'ddddd','2025-03-23 11:49:58'),(13,1,'ugghj','2025-03-24 14:10:51'),(14,1,'tomi','2025-03-25 23:38:26'),(15,1,'valamai react native','2025-03-27 13:51:04'),(16,48,'','2025-03-31 08:22:28'),(17,48,'asd','2025-03-31 08:22:54'),(18,47,'','2025-03-31 09:13:25'),(19,47,'ddddddd','2025-03-31 09:19:11'),(20,47,'dasdsadsadsa','2025-03-31 09:24:37'),(21,47,'xddddd','2025-03-31 09:24:44'),(22,1,'xd','2025-04-01 06:38:03'),(23,1,'xd','2025-04-01 06:38:03'),(24,1,'xd','2025-04-01 06:38:04'),(25,1,'xd','2025-04-01 06:38:04'),(26,1,'xd','2025-04-01 06:38:03'),(27,48,'Asd','2025-04-01 07:41:50'),(28,1,'Szia','2025-04-01 08:26:49'),(29,1,'Szia','2025-04-01 08:26:50'),(34,1,'dddd','2025-04-03 09:18:25');
/*!40000 ALTER TABLE `workoutplans` ENABLE KEYS */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- Dump completed on 2025-04-03 12:03:36
-- Total time: 0:0:0:1:646 (d:h:m:s:ms)
