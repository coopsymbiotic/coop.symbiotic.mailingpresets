(function(angular, $, _) {

  angular.module('mailingpresets').config(function($routeProvider) {
      $routeProvider.when('/mailingpresets', {
        controller: 'MailingpresetsSettingsCtrl',
        templateUrl: '~/mailingpresets/MailingpresetsSettingsCtrl.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          mailingpresets: function(crmApi) {
            return crmApi('Mailingpreset', 'get', {
              'option.limit': 0
            });
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('mailingpresets').controller('MailingpresetsSettingsCtrl', function($scope, crmApi, crmStatus, crmUiHelp, crmFromAddresses, mailingpresets) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('mailingpresets');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/Mailingpreset/Presets'}); // See: templates/CRM/Mailingpresets/Presets.hlp

    // Variables used in the HTML
    $scope.crmFromAddresses = crmFromAddresses;
    $scope.crmMessageTemplates = CRM.crmMailing.mesTemplate;
    $scope.mailingpresets = [];

    if (mailingpresets.values.length > 0) {
      $scope.mailingpresets = mailingpresets.values;
    }

    // Handler for 'new' button at the bottom of the form.
    $scope.newpreset = function newpreset() {
      $scope.mailingpresets.push({
        'id': null,
        'name': ts('Monthly newsletter'),
        'subject': ts('Monthly newsletter'),
        'from_id': CRM.crmMailing.fromAddress[0].id,
        'template_id': '',
      });
    };

    // Handler for 'save' button next to each config.
    $scope.save = function save(preset) {
      return crmStatus(
        // Status messages. For defaults, just use "{}"
        {start: ts('Saving...'), success: ts('Saved')},

        // The save action. Note that crmApi() returns a promise.
        crmApi('Mailingpreset', 'create', preset).then(function(data) {
          preset.id = data.id;
        })
      );
    };

    // Handler for 'delete' button next to each config.
    $scope.remove = function remove(preset) {
      // Remove the preset from our array
      var index = $scope.mailingpresets.indexOf(preset);
      $scope.mailingpresets.splice(index, 1);

      if (preset.id) {
        // FIXME: there is most probably a much more trivial way of doing this?
        // $scope.mailingpresets = _.without($scope.mailingpresets, _.findWhere($scope.mailingpresets, {id: preset.id}));

        return crmStatus(
          // Status messages. For defaults, just use "{}"
          {start: ts('Deleting...'), success: ts('Deleted')},

          // The save action. Note that crmApi() returns a promise.
          crmApi('Mailingpreset', 'delete', preset).then(function(data) {
            console.log(data);
          })
        );
      }
    };
  });

})(angular, CRM.$, CRM._);
