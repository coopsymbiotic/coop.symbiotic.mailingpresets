<?php

/**
 * Mailingpreset.setting API
 *
 * FIXME: this can most probably be done in a cleaner way, but I needed
 * to fetch the extensionURL ("Setting.get return=extensionURL" doesn't work?)
 * and the AJAX REST endpoint (absolute URL and work with various CMSes).
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_mailingpreset_setting($params) {
  $result = array();

  $config = CRM_Core_Config::singleton();

  if ($params['return'] == 'exturl') {
    return $config->extensionsURL . '/coop.symbiotic.mailingpresets';
  }
  elseif ($params['return'] == 'endpoint') {
    return CRM_Utils_System::url('civicrm/ajax/rest', NULL, TRUE, NULL, FALSE, FALSE, TRUE);
  }

  return $result;
}
