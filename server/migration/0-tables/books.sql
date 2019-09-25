CREATE TABLE `books` (
  `id` int(7) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title_2` (`title`,`author`),
  ADD KEY `title` (`title`),
  ADD KEY `author` (`author`),
  ADD KEY `description` (`description`),
  ADD KEY `date` (`date`);

ALTER TABLE `books`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;
COMMIT;
