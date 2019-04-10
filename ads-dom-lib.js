(function() {
  if (!window.ADS) {
    window['ADS'] = {};
  }
  
  /*
    create a new execute context for func Function
  */
  function bindFunction(obj, func) {
    return function() {
      func.apply(obj, arguments);
    };
  };
  
  window['ADS']['bindFunction'] = bindFunction;
  
  function myLogger(id) {
    id = id || 'ADSLogWindow';
    
    var logWindow = null;
    var createWindow = function() {};
    this.writeRaw = function(message) {};
  }
  
  myLogger.prototype = {
    write: function (message) {},
    header: function (message) {},
    link: function (message) {}
  };
  window['ADS']['log'] = new myLogger();
  
  function getBrowserWindowSize() {
    var de = document.documentElement;
    return {
      'width': (
        window.innnerWidth || (de && de.clientWidth) || document.body.clientWidth
      ),
      'height': (
        window.innerHei || (de && de.clientHeight) || document.body.clientHeight
      )
    }
  };
  window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;
})();
