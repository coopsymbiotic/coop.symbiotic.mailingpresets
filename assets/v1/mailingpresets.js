jQuery(function ($) {
  $('#civicrm-mailingpreset > a').click(function(event) {
    var $button = $(this);

    // Expect an element sur as:
    // <a href="#" data-endpoint="https://mycivi.example.org/civicrm/ajax/rest" data-mailingpreset="1" data-selector=".main-container">Create mailing</a>
    var endpoint = $button.data('endpoint');
    var mailingpreset = $button.data('mailingpreset');
    var selector = $button.data('selector');

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      options.crossDomain = { crossDomain: true };
      options.xhrFields = { withCredentials: true };
    });

    if (! selector) {
      selector = 'body';
    }

    if ($(selector).size() != 1) {
      alert("Invalid configuration. Please provide an HTML selector that matches only one element.");
      event.preventDefault();
      return;
    }

    // Spin the button background, to show work in progress.
    $button.prop('disabled', true);
    var button_id = $(this).attr('id');

    $button.addClass('crm-spinning');

    // Fetch page body and remove tags that clearly should not be in the mailing.
    var $html = $(selector).clone();
    $html.find('script').remove();
    $html.find('link').remove();
    $html.find('#civicrm-mailingpreset').remove();

    var body_html = $html.html();

    // Call our special API method that will create a new mailing
    // using the configurations from our preset.
    var ajax = $.ajax({
      url: endpoint,
      dataType: 'json',
      data: {
        entity: 'Mailingpreset',
        action: 'newmailing',
        json: JSON.stringify({ id: mailingpreset, body: body_html })
      },
      xhrFields: { withCredentials: true },
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      beforeSend: function(jqXHR, settings) {
        jqXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      },
      type: 'POST',
      error: function(request, status, error) {
        alert("Access denied. Please make sure you are authenticated in your CiviCRM site. If you are using Chrome or Safari, make sure you are not blocking third-party cookies in your Settings → Advanced settings → Content settings.");
      }
    })
    .done(function(data) {
      // Redirect to civimail
      window.location.href = data.url;

      $button.removeClass('crm-spinning');
      $button.append('<span> ✔</span>');
    });

    event.preventDefault();
  });
});
