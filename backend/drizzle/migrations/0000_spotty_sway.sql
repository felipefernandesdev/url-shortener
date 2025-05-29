CREATE TABLE `urls` (
	`short_code` varchar(10) NOT NULL,
	`original_url` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	`expires_at` datetime,
	`access_count` int DEFAULT 0,
	CONSTRAINT `urls_short_code` PRIMARY KEY(`short_code`)
);
