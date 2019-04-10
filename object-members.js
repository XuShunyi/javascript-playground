/*
  界定对象成员身份的几条规则：
  1，由于私有和特权成员在函数的内部，因此它们会被带到函数的每个实例中。
  2，公有的原型成员是对象蓝图的一部分，适用于通过new关键字实例化的该对象的每个实例。
  3，静态成员只适用于对象的一个特殊实例。
*/

function myConstructor(message) {
  this.myMessage = message;
  
  //私有属性
  var seperator = '-';
  var myOwner = this;
  
  //私有属性
  function alertMessage() {
    alert(myOwner.myMessage);
  }
  alertMessage();
  
  
  //特权方法（也是共有方法）
  this.appendToMessage = function (string) {
    this.myMessage += seperator + string;
    alertMessage();
  }
  
  //共有方法
  myConstructor.prototype.clearMessage = function(string) {
    this.myMessage = '';
  }
  
  //静态属性
  myConstructor.name = 'Jeff';
  
  //静态方法
  myConstructor.alertName = function() {
    alert(this.name);
  }
  
}
