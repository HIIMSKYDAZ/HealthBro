-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 23. 19:00
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `healthbro`
--
CREATE DATABASE IF NOT EXISTS `healthbro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `healthbro`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exercises`
--

CREATE TABLE `exercises` (
  `ExerciseID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `MuscleGroup` varchar(50) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `exercises`
--

INSERT INTO `exercises` (`ExerciseID`, `Name`, `MuscleGroup`, `Description`) VALUES
(11, 'Fekvenyomás', 'Mell', 'Egy klasszikus mellgyakorlat, amely a mellizmokat célozza meg.'),
(12, 'Felhúzás', 'Hát', 'Egy összetett gyakorlat, amely a derék, a farizmok és a combhajlítók izmait dolgoztatja.'),
(13, 'Guggolás', 'Lábak', 'Alapvető lábgyakorlat, amely a combfeszítőket, combhajlítókat és farizmokat dolgoztatja.'),
(14, 'Húzódzkodás', 'Hát', 'Saját testsúlyos gyakorlat, amely a széles hátizmot és a bicepszet célozza meg.'),
(15, 'Bicepsz hajlítás', 'Karok', 'Izolációs gyakorlat a bicepsz számára, kézisúlyzókkal vagy rúddal végezve.'),
(16, 'Vállból nyomás', 'Vállak', 'Összetett vállgyakorlat, amely a tricepszet is igénybe veszi.'),
(17, 'Oldalemelés', 'Vállak', 'Izolációs mozdulat, amely az oldalsó deltaizmokat célozza meg.'),
(18, 'Tolódzkodás', 'Karok', 'Saját testsúlyos gyakorlat, amely a tricepszre fókuszál.'),
(19, 'Lábnyomás', 'Lábak', 'Gépes gyakorlat, amely a combfeszítőket, combhajlítókat és farizmokat célozza meg.'),
(20, 'Kitörés', 'Lábak', 'Egyoldalas gyakorlat, amely a lábakat és a farizmokat dolgoztatja.'),
(21, 'Evezés rúddal', 'Hát', 'Összetett gyakorlat, amely a középső és felső hátat célozza.'),
(22, 'Kereszthúzás kábelgépen', 'Mell', 'Izolációs mozdulat a mellizmok számára.'),
(23, 'Ferdepados nyomás', 'Mell', 'A fekvenyomás egy változata, amely a felső mellizmokat célozza meg.'),
(24, 'Román felhúzás', 'Lábak', 'A felhúzás egy változata, amely a combhajlítókat és farizmokat célozza meg.'),
(25, 'Plank', 'Törzs', 'Izometrikus gyakorlat, amely az egész törzs izomzatát dolgoztatja.'),
(26, 'Orosz Twist', 'Törzs', 'Rotációs gyakorlat, amely a ferde hasizmokat célozza meg.'),
(27, 'Arcemelés kábelgépen', 'Vállak', 'Korrigáló gyakorlat a hátsó deltaizmok és a trapézizmok számára.'),
(28, 'Vádli emelés', 'Lábak', 'Izolációs gyakorlat a vádli izmaira.'),
(29, 'Tárogatás', 'Mell', 'Izolációs gyakorlat, amely a mellizmokat célozza meg.'),
(30, 'Ülő evezés', 'Hát', 'Gépes gyakorlat, amely a hátizmokra összpontosít.'),
(31, 'Kalapács bicepsz hajlítás', 'Karok', 'A bicepsz hajlítás egy változata, amely a brachialis izmot célozza meg.'),
(32, 'Scott-pados bicepsz', 'Karok', 'Izolációs gyakorlat, amelyet Scott-padon végeznek a bicepsz számára.'),
(33, 'Homlokhoz engedés', 'Karok', 'Tricepsz gyakorlat, amelyet rúddal vagy kézisúlyzókkal végeznek.'),
(34, 'Good Morning', 'Hát', 'Hátsó lánc gyakorlat, amely az alsó hátat és a combhajlítókat erősíti.'),
(35, 'Elölguggolás', 'Lábak', 'A guggolás egy változata, amely a combfeszítőket helyezi előtérbe.'),
(36, 'Lógó lábemelés', 'Törzs', 'Törzserősítő gyakorlat, amelyet húzódzkodó rúdon végeznek.'),
(37, 'Oldalsó plank', 'Törzs', 'Izometrikus gyakorlat, amely a ferde hasizmokra és a törzsstabilitásra összpontosít.'),
(38, 'Tárogatás kézisúlyzóval', 'Mell', 'Szabadsúlyos gyakorlat, amely a mellizmokat izolálja.'),
(39, 'Gépes vállnyomás', 'Vállak', 'Gépes összetett vállgyakorlat.'),
(40, 'Mellhez húzás', 'Hát', 'Gépes gyakorlat, amely a széles hátizmot célozza meg.'),
(41, 'Tricepsz lenyomás kábelgépen', 'Karok', 'Izolációs gyakorlat a tricepsz számára kábelgéppel.'),
(42, 'Álló vállból nyomás', 'Vállak', 'Rudas gyakorlat a vállak és tricepsz számára.'),
(43, 'Farmers séta', 'Teljes test', 'Súlyok cipelése, amely fejleszti a fogáserőt és az állóképességet.'),
(44, 'Csípőemelés', 'Farizmok', 'A farizmokat célzó gyakorlat erő- és izomnöveléshez.'),
(45, 'Fellépés', 'Lábak', 'Egyoldalas alsótest gyakorlat, amelyet padon vagy platformon végeznek.'),
(46, 'Húzódzkodás bicepszel', 'Hát', 'Saját testsúlyos húzó gyakorlat, amely a bicepszet és a hátat célozza.'),
(47, 'Fordított tárogatás', 'Vállak', 'Izolációs mozdulat a hátsó deltaizmok számára.'),
(48, 'Haskerék gurítás', 'Törzs', 'Haladó törzsgyakorlat haskerékkel.'),
(49, 'Egkezes evezés', 'Hát', 'Egykezes evező gyakorlat a széles hátizomra és a trapézizomra.'),
(50, 'Ferdepados kézisúlyzós nyomás', 'Mell', 'Szabadsúlyos gyakorlat a felső mellizomra.'),
(51, 'Sumo felhúzás', 'Lábak', 'Széles terpeszű felhúzás, amely a belső combokat és a farizmokat célozza meg.'),
(52, 'Kábel oldalemelés', 'Vállak', 'Kábelgépes gyakorlat az oldalsó deltaizmokra.'),
(53, 'Arnold nyomás', 'Vállak', 'Vállgyakorlat, amely a nyomást és forgást kombinálja.'),
(54, 'Sárkányzászló', 'Törzs', 'Haladó törzsgyakorlat, amelyet Bruce Lee tett híressé.'),
(55, 'T-rudas evezés', 'Hát', 'Gépes vagy rudas gyakorlat a középső hátra.'),
(56, 'Pullover kézisúlyzóval', 'Mell', 'Szabadsúlyos gyakorlat a mellizomra és a széles hátizomra.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permission`
--

CREATE TABLE `permission` (
  `Id` int(11) NOT NULL,
  `Level` int(1) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `permission`
--

INSERT INTO `permission` (`Id`, `Level`, `Name`, `Description`) VALUES
(1, 0, 'Luzer', 'Webes regisztráció felhasználó'),
(2, 9, 'Administrator', 'Rendszergazda');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `planexercises`
--

CREATE TABLE `planexercises` (
  `PlanExerciseID` int(11) NOT NULL,
  `PlanID` int(11) DEFAULT NULL,
  `ExerciseID` int(11) DEFAULT NULL,
  `Sets` int(11) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Reps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `LoginName` varchar(16) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `LoginName`, `HASH`, `SALT`, `Name`, `PermissionId`, `Active`, `Email`, `ProfilePicturePath`) VALUES
(1, 'kerenyir', 'dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef', 'jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp', 'Kerényi Róbert', 2, 1, 'kerenyir@kkszki.hu', 'default.jpg'),
(14, 'gabi', '1f06bda4d4b595c97c80a1c2676a72c96519ebc5b72d859ed880bfce63eae5ed', 'nd4Di7vtBcyDEQLcj9OxvYJXoTDHW82F1aK7jAy8ZjE095lfaweuRWUrtOq68P4s', 'gabi', 1, 1, 'gabi115@gmail.com', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workoutplans`
--

CREATE TABLE `workoutplans` (
  `PlanID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `PlanName` varchar(100) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`ExerciseID`);

--
-- A tábla indexei `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Szint` (`Level`),
  ADD UNIQUE KEY `Nev` (`Name`);

--
-- A tábla indexei `planexercises`
--
ALTER TABLE `planexercises`
  ADD PRIMARY KEY (`PlanExerciseID`),
  ADD KEY `PlanID` (`PlanID`),
  ADD KEY `ExerciseID` (`ExerciseID`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LoginNev` (`LoginName`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Jog` (`PermissionId`);

--
-- A tábla indexei `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD PRIMARY KEY (`PlanID`),
  ADD KEY `UserID` (`UserID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `exercises`
--
ALTER TABLE `exercises`
  MODIFY `ExerciseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT a táblához `permission`
--
ALTER TABLE `permission`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `planexercises`
--
ALTER TABLE `planexercises`
  MODIFY `PlanExerciseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `workoutplans`
--
ALTER TABLE `workoutplans`
  MODIFY `PlanID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `planexercises`
--
ALTER TABLE `planexercises`
  ADD CONSTRAINT `planexercises_ibfk_1` FOREIGN KEY (`PlanID`) REFERENCES `workoutplans` (`PlanID`),
  ADD CONSTRAINT `planexercises_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `exercises` (`ExerciseID`);

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `permission` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
