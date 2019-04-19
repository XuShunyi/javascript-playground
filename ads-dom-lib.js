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
  
  function getEventObject (W3CEvent) {
    return W3CEvent || window.event;
  }
  window['ADS']['getEventObject'] = getEventObject;
  
  function stopPropagration (eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    if (eventObject.stopPropagation) {
      eventObject.stopPropagation();
    } else {
      eventObject.cancelBubble = true;
    }
  }
  window['ADS']['stopPropagation'] = stopPropagation;
  
  function preventDefault (eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    if (eventObject.preventDefault) {
      eventObject.preventDefault();
    } else {
      eventObject.returnValue = false;
    }
  }
  window['ADS']['preventDefault'] = preventDefault;
  
  function addEvent (obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function () {
        obj['e' + type + fn] (window.event);
      }
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  }
  window['ADS']['addEvent'] = addEvent;
  
  function addLoadEvent (loadEvent, waitForImages) {
    if (!isCompatible()) return false;
    if (waitForImages) {
      return addEvent(window, 'load', loadEvent);
    }
    let init = function () {
      if (arguments.callee.done) return;
      arguments.callee.done = true;
      loadEvent.apply(document, arguments);
    };
    if (document.addEventListener) {
      document.addEvnetListener('DOMContentLoaded', init, false);
    }
    if (/WebKit/i.test(navigator.userAgent)) {
      let _timer = setInterval(function () {
        if (/loaded | complete/.test(document.readyState)) {
          clearInterval(_timer);
          init();
        }
      }, 10);
    }
    document.write("<script id=__ie_onload defer scr=javascript:void(0)><\/script>");
    let script = document.getElementById("__ie_onload");
    script.onreadystatechange = function () {
      if (this.readyState === 'complete') {
        init();
      }
    };
    return true;
  }
  window['ADS']['addLoadEvent'] = addLoadEvent;
  
  function getTarget (eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    
    let target = eventObject.target || eventObject.srcElement;
    
    if (target.nodeType == ADS.node.TEXT_NODE) {
      target = node.parentNode;
    }
    return target;
  }
  window['ADS']['getTarget'] = getTarget;
  
  function getMouseButton (eventObject) {
    eventObject = eventObejct || getEventObject(eventObject);
    
    let buttons = {
      'left': false,
      'middle': false,
      'right': false
    };
    if (eventObject.toString && eventObject.toString().indexOf('MouseEvent') != -1) {
      swith (eventObject.button) {
        case 0: buttons.left = true; break;
        case 1: buttons.middle = true; break;
        case 2: buttons.right = true; break;
        default: break;
      }
    } else if (eventObject.button) {
      swith (eventObject.button) {
        case 1: buttons.left = true; break;
        case 2: buttons.right = true; break;
        case 3: 
            buttons.left = true;
            buttons.right = true;
        break;
        case 4: buttons.middle = true; break;
        case 5: 
            buttons.left = true;
            buttons.middle = true;
        break;
        case 6:
            buttons.middle = true;
            buttons.right = true;
        break;
        case 7:
            buttons.left = true;
            buttons.middle = true;
            buttons.right = true;
        break;
        default: break;
      }
    } else {
      return false;
    }
    return buttons;
  }
  window['ADS']['getMouseEvent'] = getMouseEvent;
  
  function getPointerPositionInDocument (eventObject) {
    eventObject = eventObject || getEventObject(eventObejct);
    let x = eventObject.pageX || (eventObject.clientX + 
                                 (document.documentElement.scrollLeft ||
                                 document.body.scrollLeft));
    let y = eventObject.pageY || (eventObject.clientY + 
                                 (document.documentElement.scrollTop
                                 || document.body.scrollTop));
    return {'x': x, 'y': y};
  }
  window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;
  
  function getKeyPressed (eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    let code = eventObject.keyCode;
    let value = String.fromCharCode(code);
    return {'code': code, 'value': value};
  }
  window['ADS']['getKeyPressed'] = getKeyPressed;
  
  function setStyleById (element, styles) {
    if (!(element = $(element))) return false;
    for (property in styles) {
      if (!styles.hasOwnProperty(property)) continue;
      if (element.style.setProperty) {
        element.style.setProperty(uncamelize(property, '-'), styles[property], null);
      } else {
        element.style[camelize(property)] = styles[property];
      }
    }
    return true;
  }
  window['ADS']['setStyle'] = setStyleById;
  window['ADS']['setStyleById'] = setStyleById;
  
  function setStyleByClassName (parent, tag, className, styles) {
    if (!(parent = $(parent))) return false;
    let element = getElementByClassName(className, tag, parent);
    for (let e = 0; e < elements.length, e++) {
      setStyleById(elements[e], styles);
    }
    return false;
  }
  window['ADS']['setStylesByClassName'] = setStylesByClassName;
  
  function setStylesByTagName (tagname, styles, parent) {
    parent = $(parent) || document;
    let elements = parent.getElementsByTagName(tagname);
    for (let e = 0; e < elements.length; e++) {
      setStyleById(elements[e], styles);
    }
  }
  window['ADS']['setStylesByTagName'] = setStylesByTagName;
  
  function getStyle (element, property) {
    if (!(element = $(element)) || !property) return false;
    let value = element.style[camelize(property)];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        let css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(property) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[camelize(property)];
      }
    }
    return value == 'auto' ? '' : value;
  }
  window['ADS']['getStyle'] = getStyle;
  window['ADS']['getStyleById'] = getStyle;
  
  function getClassNames (element) {
    if (!(element = $(element))) return false;
    return element.className.replace(/\s+/, ' ').split(' ');
  }
  window['ADS']['getClassNames'] = getClassNames;
  
  function hasClassName (element, className) {
    if (!(element = $(element))) return false;
    let classes = getClassNames(element);
    for (let i = 0; i < classes.length; i++) {
      if (classes[i] === className) { return true; }
    }
    return false;
  };
  window['ADS']['hasClassName'] = hasClassName;
  
  function addClassName (element, className) {
    if (!(element = $(element))) return false;
    element.className += (element.className ? ' ' : '') + className;
    return true;
  };
  window['ADS']['addClassName'] = addClassName;
  
  function removeClassName (element, className) {
    if (!(element = $(element))) return false;
    let classes = getClassNames(element);
    let length = classes.length;
    for (let i = length -1; i >= 0; i--) {
      if (classes[i] === className) { delete(classes[i]); }
    }
    element.className = classes.join(' ');
    return (length == classes.length ? false : true);
  };
  window['ADS']['removeClassName'] = removeClassName;
  
  function addStyleSheet (url, media) {
    media = media || 'screen';
    let link = document.createElement('LINK');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    link.setAttribute('media', media);
    document.getElementByTagName('head')[0].appendChild(link);
  }
  window['ADS']['addStyleSheet'] = addStyleSheet;
  
  function removeStyleSheet (url, media) {
    let styles = getStyleSheets(url, media);
    for (let i = 0; i < styles.length; i++) {
      let node = styles[i].ownerNode || styles[i].owningElement;
      styles[i].disabled = true;
      node.parentNode.removeChilde(node);
    }
  }
  window['ADS']['removeStyleSheet'] = removeStyleSheet;
  
  function getStyleSheets (url, media) {
    let sheets = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (url && document.styleSheets[i].href.indexOf(url) == -1) {
        continue;
      }
      if (media) {
        media = media.replace(/,\s*/, ',');
        let sheetMedia;
        if (document.styleSheets[i].media.mediaText) {
          sheetMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/, ',');
          sheetMedia = sheetMedia.replace(/,\s*$/, '');
        } else {
          sheetMedia = document.styleSheets[i].media.replace(/,\s*/, ',');
        }
        if (media != sheetMedia) { continue; }
      }
      sheets.push(document.styleSheets[i]);
    }
    return sheets;
  }
  window['ADS']['getStyleSheets'] = getStyleSheets;
  
  function editCSSRule (selector, styles, url, media) {
    let styleSheets = (typeof url == 'array' ? url : getStyleSheets(url, media));
    for (let i = 0; i < styleSheets.length; i++) {
      let rules = styleSheets[i].cssRules || styleSheets[i].rules;
      if (!rules) { continue; }
      selector = selector.toUpperCase();
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].selectorText.toUpperCase() == selector) {
          for (property in styles) {
            if (!styles.hasOwnProperty(property)) { continue; }
            rules[j].style[camelize(property)] = styles[property];
          }
        }
      }
    }
  }
  window['ADS']['editCSSRule'] = editCSSRule;
  
  function addCSSRule (selector, styles, index, url, media) {
    let declaration = '';
    for (property in styles) {
      if (!styles.hasOwnProperty(property)) { continue; }
      declaration += property + ':' + styles[property] + '; ';
    }
    let styleSheets = (typeof url == 'array' ? url : getStyleSheets(url, media));
    let newIndex;
    for (let i = 0; i < styleSheets.length; i++) {
      if (styleSheets[i].insertRule) {
        newIndex = (index >= 0 ? index : styleSheets[i].cssRule.length);
        styleSheets[i].insertRule(selector + ' { ' + declaration + ' } ', newIndex);
      } else if (styleSheets[i].addRule) {
        newIndex = (index >= 0 ? index : -1);
        styleSheets[i].addRule(selector, declaration, newIndex);
      }
    }
  }
  window['ADS']['addCSSRule'] = addCSSRule;
  
})();
