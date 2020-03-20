<?php

/**
 * Mailingpreset.newmailing API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_mailingpreset_newmailing($params) {
  $result = array();

  $dao = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_mailingpreset WHERE id = %1', array(
    1 => array($params['id'], 'Positive'),
  ));

  if ($dao->fetch()) {
    // Fetch body template
    $tpl = civicrm_api3('MessageTemplate', 'getsingle', array(
      'id' => $dao->template_id,
    ));

    // Inject content in template body
    $msg_html = preg_replace('/<!--MAILINGCONTENT-->/', $params['body'], $tpl['msg_html']);

    $res = civicrm_api3('Mailing', 'create', array(
      'name' => $dao->name,
      'subject' => $dao->subject,
      'body_html' => $msg_html,
      'groups' => ['include' => [$dao->group_id]],
    ));

    // Inject the CiviMail URL into the result, so we that we can redirect here.
    $res['url'] = CRM_Utils_System::url('civicrm/mailing/send', array('mid' => $res['id'], 'continue' => 'true', 'reset' => 1), TRUE, FALSE, TRUE);

    return $res;
  }

  return $result;
}
