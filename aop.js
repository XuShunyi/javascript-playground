Function.prototype.before = (beforeFn) => {
  let _self = this;
  return function() {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
};

Function.prototype.after = (afterFn) => {
  let _self = this;
  
  return function() {
    let ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
};
