<?php

/**
 * Delete a Mailingpreset config with given id.
 *
 * @param array $params
 *   input parameters per getfields
 *
 * @return array
 *   API Result Array
 */
function civicrm_api3_mailingpreset_delete($params) {
  $id = CRM_Utils_Array::value('id', $params);

  CRM_Core_DAO::executeQuery('DELETE from civicrm_mailingpreset WHERE id = %1', array(
    1 => array($id, 'Positive'),
  ));

  return civicrm_api3_create_success();
}
