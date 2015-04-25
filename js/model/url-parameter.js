(function() {
  'use strict';

  var UrlParameter = {
    parse: function(url) {
      var params = {}
        , urlParts
        , paramsElements
        , paramElement
        , i
        , len;

      urlParts = url.split('?');
      if (urlParts.length < 2) {
        return params
      }

      paramsElements = urlParts[1].split('&');
      for (i = 0, len = paramsElements.length; i < len; i++) {
        paramElement = paramsElements[i].split('=');
        params[paramElement[0]] = paramElement[1];
      }

      return params;
    }
  };

  C.UrlParameter = UrlParameter;
})();

