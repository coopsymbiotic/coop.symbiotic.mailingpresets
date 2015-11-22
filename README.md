Mailing presets
===============

This extension provides two features:

- Allows the creation of "presets" for CiviCRM (predefined name, subject, from, recipient groups, template, etc), so that you can more clearly identify your main types of communications and their configurations.
- Exposes an API that can be called from third-party sites to "copy" the content of your mailing from your public site into the CiviCRM mailing, using the presets.

For example: you have published a press release on your website. It might
include some formatting, images, etc. You now want to send a mailing with that
same announcement. Using this extension, you could click on a button from your
website which would send the news release content to CiviMail (this extension
has a 2-3 line snippet that you can include in your website in order to do
this). After clicking the button, you would then redirected to CiviMail to
complete the preparation of your mailing. The mailing name, subject, groups and
content will already be there, you only need to review and click send.

Warning
-------

This extension is still at the very experimental stage, and not very well documented.

Requirements
------------

- CiviCRM >= 4.6

Integrating in an external site
-------------------------------

If your website and your CiviCRM instance are in different places and
you would like to automate the copying of the existing HTML content from
your public site into a CiviCRM mailing:

* You probably want to use https on your public site? (todo: does CORS require it for credentials/cookies?)

* Enable CORS on your CiviCRM web server. (FIXME: document how)

* If you want to insert your mailing content in a message template, add a <!--MAILINGCONTENT--> tag in the HTML of your message template.

Known issues
------------

* Chrome/Safari: you must not block "third-party" cookies.
  Consider using Firefox with the excellent "self destructing cookies" extension instead:
  https://addons.mozilla.org/fr/firefox/addon/self-destructing-cookies/

Support
-------

Please post bug reports in the issue tracker of this project on github:  
https://github.com/coopsymbiotic/coop.symbiotic.mailingpreset/issues

For general questions and support, please post on the "Extensions" forum:  
https://forum.civicrm.org/index.php/board,57.0.html

This is a community contributed extension written thanks to the financial
support of organisations using it, as well as the very helpful and collaborative
CiviCRM community.

If you appreciate this module, please consider supporting the CiviCRM project:  
https://civicrm.org/participate/support-civicrm

While we do our best to provide volunteer support for our extensions, please
consider financially contributing to support or development of this extension
if you can.

Commercial support available from Coop SymbioTIC:  
https://www.symbiotic.coop/en

License
-------

Distributed under the terms of the GNU Affero General public license (AGPL).
See LICENSE.txt for details.

(C) 2015 Mathieu Lutfy <mathieu@symbiotic.coop>  
(C) 2015 Coop SymbioTIC <info@symbiotic.coop>
