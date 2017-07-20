
var listSum = {
  params : {list : 'list'},
  returnType : 'int',
  func : function(list, num) {
    var sum = 0;
    list.forEach(function(value, num) {
      sum += value;
    });
    return sum;
  }
};

var listMax = {
  params : {list : 'list'},
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

var execute = function(funcName) {
  var func = algoMap[funcName];
  if(!func) {
    alert('not exists');
    return;
  }

  for (var key in func.params) {
    var element = $('<div>').attr('id', key)
    element.append($('<h3>').html(key));
    switch (func.params[key]) {
      case 'list':
        element.append($('<ul id=ul_' + key + '>'));
        element.append($('<button>').attr('name', key).html('Add Element').on('click', function(e) {
          $(e.target).prev().append($('<li>').append($('<input>').addClass($(e.target).attr('name'))));
        }));
        break;
      case 'int':
        element.append($('<input>').addClass(key));
        break;
      default:
        console.log(key + ' element\'s type is wrong.');
    }
    $('#playground').append(element);
  }
  $('#playground').append($('<button>').html('Execute').on('click', function() {
    var param = [];
    for (var key in func.params) {
      switch (func.params[key]) {
        case 'list':
          var ret = $('.' + key).map(function() {
            return $(this).val();
          }).toArray();
          param.push(ret);
          break;
        case 'int':
          param.push($($('.' + key)[0]).val());
          break;
        default:
          console.log(key + ' element\'s type is wrong.');
      }
    }
    func.func(...param);
  }));
};

$(document).ready(function() {
  $('#playground').on('dragenter', e => {
    e.preventDefault();
    return true;
  })
  .on('drop', e => {
    execute(e.originalEvent.dataTransfer.getData('key'));
  })
  .on('dragover', e => {
    e.preventDefault();
    return true;
  });
  for (var key in algoMap) {
    var tag = $('<div>').html(key).attr('draggable', true)
    .on('dragstart', e => {
      console.log('jquery', e)
      e.originalEvent.dataTransfer.setData('key', key)
    });

    $('#func_list').append(tag);
  }
});
