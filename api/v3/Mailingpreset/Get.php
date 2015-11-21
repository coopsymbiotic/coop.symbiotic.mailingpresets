<?php

/**
 * Webpagetomailing.get API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_mailingpreset_get($params) {
  $result = array(
    'values' => array(),
  );

  $dao = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_mailingpreset');

  while ($dao->fetch()) {
    $result['values'][] = array(
      'id' => $dao->id,
      'name' => $dao->name,
      'subject' => $dao->subject,
      'from_id' => $dao->from_id,
      'template_id' => $dao->template_id,
    );
  }

  return $result;
}
