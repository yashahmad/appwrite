(function (window) {
  "use strict";

  window.ls.container.get("view").add({
    selector: "data-analytics-activity",
    controller: function (window, element, appwrite, container) {
      let action = element.getAttribute("data-analytics-event") || "click";
      let activity = element.getAttribute("data-analytics-label") || "None";
      let doNotTrack = window.navigator.doNotTrack;

      if (doNotTrack == '1') {
        return;
      }

      console.log(action);
      console.log(activity);

      element.addEventListener(action, function () {
        let account = container.get('account');
        let email = account?.email || element?.elements['email']?.value || '';

        appwrite.analytics.create(email, 'console', activity, window.location.href)

        fetch('http://localhost:2000/v1/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            provider: 'GoogleAnalytics',
            event: activity,
            additionalData: null,
            url: window.location.href
          })
        });
      });
    }
  });
})(window);
