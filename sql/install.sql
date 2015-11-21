CREATE TABLE `civicrm_mailingpreset` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '' COMMENT 'Preset Mailing Name',
  `subject` varchar(255) DEFAULT '' COMMENT 'Preset Mailing Subject',
  `from_id` int(10) unsigned DEFAULT NULL COMMENT 'From Email ID',
  `template_id` int(10) unsigned DEFAULT NULL COMMENT 'Message Template ID',
  `group_id` int(10) unsigned DEFAULT NULL COMMENT 'Mailing Recipient Group ID',
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_civicrm_mailingpreset_template_id` FOREIGN KEY (`template_id`) REFERENCES `civicrm_msg_template` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_civicrm_mailingpreset_group_id` FOREIGN KEY (`group_id`) REFERENCES `civicrm_group` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
