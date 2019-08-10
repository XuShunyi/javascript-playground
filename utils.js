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
