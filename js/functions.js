
var listSum = {
  params : ['int'],
  returnType : 'int',
  func : function(list, num) {
    var sum = 0;
    list.forEach(function(value, num) {
      sum += parseInt(value);
    });
    return sum;
  }
};

var listMax = {
  params : ['list'],
  returnType : 'int',
  func : function(list, num) {
    var max = 0;
    list.forEach(function(value, num) {
      if(max < value) max = value;
    });
    return max;
  }
};

var algoMap = [];
algoMap['listSum'] = listSum;
algoMap['listMax'] = listMax;
