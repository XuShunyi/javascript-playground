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
    this.writeRaw = function(message) {
      if (!logWindow) createWindow();
      
      var li = document.createElement('LI');
      li.style.padding = '2px';
      li.style.border = '0';
      li.style.borderBottom = '1px dotted black';
      li.style.margin = '0';
      li.style.color = '#000';
      li.style.font = '9px/9px Verdana, Tahoma, Sans';
      
      if (typeof message = 'undefined') {
        li.appendchild(document.createTextNode('Message was undefined'));
      } else if (typeof li.innerHTML != undefined) {
        li.innerHTML = message;
      } else {
        li.appendchild(document.createTextNode(message));
      }
      
      logWindow.appendChild(li);
      return true;
    };
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
