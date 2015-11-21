<?php

/**
 * Mailingpreset.create API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_mailingpreset_create($params) {
  $dao = new CRM_Mailingpreset_DAO_Preset();
  $dao->copyValues($params);
  $dao->save();

  $values = array();
  _civicrm_api3_object_to_array($dao, $values[$dao->id]);

  return civicrm_api3_create_success($values, $params, 'Mailingpreset', 'create', $dao);
}
