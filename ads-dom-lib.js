(function() {
  if (!window.ADS) {
    window['ADS'] = {};
  }
  
  if (!String.repeat) {
    String.prototype.repeat = function (l) {
      return new Array(l + l).join(this);
    }
  }
  
  if (!String.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }
  
  function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      walkTheDOM(node, func);
      node = node.nextSibling;
    }
  }
  
  function walkElementsLinear(func, node) {
    let root = node || window.document;
    let node = root.getElementsByTagName('*');
    for (let i = 0; i < nodes.length; i++) {
      func.call(nodes[i]);
    }
  }
  
  function walkTheDOMRecursive(func, node, depth, returnedFromParent) {
    let root = node || window.ducument;
    let returnedFromParent = func.call(root, depth++, returnedFromParent);
    let node = root.firstChild;
    while(node) {
      walkTheDOMRecursive(func, node, depth, returnedFromParent);
      node = node.nextSibling;
    }
  }
  
  if (document.implementation) {
    if (document.implementation.hasFeature('core', '2.0')) {
      alert('DOM2 Core Supported');
    } else {
      alert('DOM2 Core Not Supported');
    }
  } else {
    alert('No DOMImplementation Support');
  }
  
  window['ADS']['node'] = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
  
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
  
  function camelize (s) {
    return s.replace('/-(\w)/g', function (strMatch, p1) {
      return p1.toUpperCase();
    });
  }
  window['ADS']['camelize'] = camelize;
  
})();
