-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 20, 2020 at 04:11 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anurbol`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_agent_hash` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_key` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logged_in` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `title` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `done` bit(1) NOT NULL DEFAULT b'0',
  `edited_by_admin` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `username`, `email`, `title`, `done`, `edited_by_admin`) VALUES
(1, 'Alice', 'alice@mail.ru', 'Помыть посуду', b'1', b'1'),
(2, 'Bob', 'bob@mail.ru', 'Выбросить мусор', b'0', b'0'),
(3, 'Carol', 'carol@mail.ru', 'Постирать вещи', b'0', b'0'),
(4, 'Dave', 'dave@mail.ru', 'Покосить траву', b'0', b'0'),
(5, 'Eve', 'eve@mail.ru', 'Убить билла', b'0', b'0'),
(6, 'Frank', 'eve@mail.ru', 'Сходить за хлебом', b'0', b'0'),
(7, 'Grace', 'grace@mail.ru', 'Устроиться на работу', b'0', b'0'),
(8, 'Heidi', 'heidi@gmail.com', 'Подмести во дворе', b'0', b'0'),
(9, 'Alice', 'alice@mail.ru', 'Помыть посуду', b'0', b'0'),
(10, 'Bob', 'bob@mail.ru', 'Выбросить мусор', b'0', b'0'),
(11, 'Carol', 'carol@mail.ru', 'Постирать вещи', b'0', b'0'),
(12, 'Dave', 'dave@mail.ru', 'Покосить траву', b'0', b'0'),
(13, 'Eve', 'eve@mail.ru', 'Убить билла', b'0', b'0'),
(14, 'Frank', 'eve@mail.ru', 'Сходить за хлебом', b'0', b'0'),
(15, 'Grace', 'grace@mail.ru', 'Устроиться на работу', b'0', b'0'),
(16, 'Heidi', 'heidi@gmail.com', 'Подмести во дворе', b'0', b'0'),
(24, 'Alice', 'alice@mail.ru', 'Помыть посуду', b'0', b'0'),
(25, 'Bob', 'bob@mail.ru', 'Выбросить мусор', b'0', b'0'),
(26, 'Carol', 'carol@mail.ru', 'Постирать вещи', b'0', b'0'),
(27, 'Dave', 'dave@mail.ru', 'Покосить траву', b'0', b'0'),
(28, 'Eve', 'eve@mail.ru', 'Убить билла', b'0', b'0'),
(29, 'Frank', 'eve@mail.ru', 'Сходить за хлебом', b'0', b'0'),
(30, 'Grace', 'grace@mail.ru', 'Устроиться на работу', b'0', b'0'),
(31, 'Heidi', 'heidi@gmail.com', 'Подмести во дворе', b'0', b'0'),
(32, 'Alice', 'alice@mail.ru', 'Помыть посуду', b'0', b'0'),
(33, 'Bob', 'bob@mail.ru', 'Выбросить мусор', b'0', b'0'),
(34, 'Carol', 'carol@mail.ru', 'Постирать вещи', b'0', b'0'),
(35, 'Dave', 'dave@mail.ru', 'Покосить траву', b'0', b'0'),
(36, 'Eve', 'eve@mail.ru', 'Убить билла', b'0', b'0'),
(37, 'Frank', 'eve@mail.ru', 'Сходить за хлебом', b'0', b'0'),
(38, 'Grace', 'grace@mail.ru', 'Устроиться на работу', b'0', b'0'),
(39, 'Heidi', 'heidi@gmail.com', 'Подмести во дворе', b'0', b'0'),
(40, 'Alice', 'alice@mail.ru', 'Помыть посуду', b'0', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_admin`) VALUES
(1, 'admin', 'f6066752bc15482f1004897801e97434baacd221600627d97ffba5a3d703905d', b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
