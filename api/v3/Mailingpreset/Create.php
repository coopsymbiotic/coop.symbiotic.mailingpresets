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

  // Make sure we allow null values, since there can be use-cases
  // for leaving these fields empty.
  if (empty($params['from_id'])) {
    $dao->from_id = NULL;
  }
  if (empty($params['group_id'])) {
    $dao->group_id = NULL;
  }
  if (empty($params['template_id'])) {
    $dao->template_id = NULL;
  }

  $dao->save();

  $values = array();
  _civicrm_api3_object_to_array($dao, $values[$dao->id]);

  return civicrm_api3_create_success($values, $params, 'Mailingpreset', 'create', $dao);
}
