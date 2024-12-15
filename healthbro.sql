-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 13. 07:56
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
  `Reps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `LoginNev` varchar(16) NOT NULL,
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

INSERT INTO `user` (`Id`, `LoginNev`, `HASH`, `SALT`, `Name`, `PermissionId`, `Active`, `Email`, `ProfilePicturePath`) VALUES
(1, 'kerenyir', 'd5fe0e517520122f1ab363b6b7ee9ae616e7ad393693ef00d81a7f287a79931a', 'Gm63C4jiWnYvfZfiKUu2cu8AHPNDj8NoHhtQn88yiJhyOunBNSd7tRoWo5wwqg9X', 'Kerényi Róbert', 2, 1, 'kerenyir@kkszki.hu', 'img\\kerenyir.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workoutdetails`
--

CREATE TABLE `workoutdetails` (
  `WorkoutDetailID` int(11) NOT NULL,
  `WorkoutID` int(11) DEFAULT NULL,
  `ExerciseID` int(11) DEFAULT NULL,
  `Weight` decimal(5,2) DEFAULT NULL,
  `Reps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workouts`
--

CREATE TABLE `workouts` (
  `WorkoutID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `WorkoutDate` datetime DEFAULT current_timestamp(),
  `Notes` text DEFAULT NULL
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
  ADD UNIQUE KEY `LoginNev` (`LoginNev`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Jog` (`PermissionId`);

--
-- A tábla indexei `workoutdetails`
--
ALTER TABLE `workoutdetails`
  ADD PRIMARY KEY (`WorkoutDetailID`),
  ADD KEY `WorkoutID` (`WorkoutID`),
  ADD KEY `ExerciseID` (`ExerciseID`);

--
-- A tábla indexei `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD PRIMARY KEY (`PlanID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`WorkoutID`),
  ADD KEY `UserID` (`UserID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `exercises`
--
ALTER TABLE `exercises`
  MODIFY `ExerciseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `permission`
--
ALTER TABLE `permission`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `planexercises`
--
ALTER TABLE `planexercises`
  MODIFY `PlanExerciseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `workoutdetails`
--
ALTER TABLE `workoutdetails`
  MODIFY `WorkoutDetailID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `workoutplans`
--
ALTER TABLE `workoutplans`
  MODIFY `PlanID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `workouts`
--
ALTER TABLE `workouts`
  MODIFY `WorkoutID` int(11) NOT NULL AUTO_INCREMENT;

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
-- Megkötések a táblához `workoutdetails`
--
ALTER TABLE `workoutdetails`
  ADD CONSTRAINT `workoutdetails_ibfk_1` FOREIGN KEY (`WorkoutID`) REFERENCES `workouts` (`WorkoutID`),
  ADD CONSTRAINT `workoutdetails_ibfk_2` FOREIGN KEY (`ExerciseID`) REFERENCES `exercises` (`ExerciseID`);

--
-- Megkötések a táblához `workoutplans`
--
ALTER TABLE `workoutplans`
  ADD CONSTRAINT `workoutplans_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
