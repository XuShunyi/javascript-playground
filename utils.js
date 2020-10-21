// 柯里化通用函数
export const curry (func) {
  return function curriedFn (...args) {
    // 判断实惨和参数的个数
    if (args.length < func.length) {
      // 实参个数小于形参个数，继续柯里化
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    // 形参个数等于实参个数执行func
    return func(...args)
  }
}

export const uncurrying = function() {
  let self = this;
  
  return function() {
    let obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

export const getSingle = (fn) => {
  let ret;
  return function() {
    return ret || (ret = fn.apply(this, arguments));
  };
};

export const deepFreeze = (obj) => {
  var propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(function(name) {
    var prop = obje[name];
    
    if (typeof prop === 'object' && prop !== null) {
      Object.deepFreeze(prop);
    }
    
  });
  return Object.freeze(obj);
}


export const isGeneratorFunction = (fn) => {
//   const genFn = (function*() {}).constructor;
  
//   return fn instanceof genFn;
  
  return fn[Symbol && Symbol.toStringTag ? Symbol.toStringTag : false] === 'GeneratorFunction';
}

export const isGenerator = (obj) => {
  return obj.toString ? obj.toString() === '[object Generator]' : false;
}


export const debounce = (fn, milliseconds) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, milliseconds);
  };
}

export const throttle = (fn, milliseconds) => {
  let canRun = true;
  return function () {
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, 500);
  };
}

export const isType = (type) => {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
};

export const addQueryStringArg = (url, name, value) => {
  if (url.indexOf('?') == -1) {
    url += '?';
  } else {
    url += '&';
  }
  
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}

export const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
}

export const $$ = (selector, context) => {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}

export const deepClone = (target) => {
  let result;
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = []
      for (let i in target) {
        result.push(deepClone(target[i]))
      }
    } else if (target === null) {
      result = null
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      result = {}
      for (let p in target) {
        result[p] = deepClone(target[i])
      }
    }
  } else {
    result = target
  }
  return result
}

export const deepCloneAdvanced = (obj) => {
  let map = new WeakMap()
  function deep (data) {
    let result = {}
    const keys = [...Object.getOwnPropertyNames(data), ...Object.getOwnPropertySymbols(data)]
    if (!keys.length) return data
    const exist = map.get(data)
    if (exist) return exist
    map.set(data, result)
    keys.forEach(key => {
      let item = data[key]
      if (typeof item === 'object' && item) {
        result[key] = deep(item)
      } else {
        result[key] = item
      }
    })
    return result
  }
  return deep(obj)
}

