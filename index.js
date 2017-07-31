
var listSum = {
  params : ['list'],
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

var addFunction = function(funcName) {
  var func = algoMap[funcName];
  if(!func) {
    alert('not exists11');
    return;
  }
  var funcDiv = $('<div>').addClass('func').append($('<h3>').html(funcName));
  funcDiv.append($('<p>').addClass('input').html('Input'));
  func.params.forEach(function(key) {
    var element = $('<div>').attr('id', key);
    element.append($('<h4>').html(key));
    switch (key) {
      case 'list':
        element.append($('<button>').attr('name', key).html('Add Element').on('click', function(e) {
          $(e.target).prev().append($('<input>').addClass($(e.target).attr('name')).addClass('listInput'));
        }));
        break;
      case 'int':
        element.append($('<input>').addClass(key));
        break;
      default:
        console.log(key + ' element\'s type is wrong.');
    }
    funcDiv.append(element);
  });
  funcDiv.append($('<p>').addClass('output').html('Output').append($('<h4>').html(func.returnType)));

  $('#playground').append(funcDiv);

  /*$('#playground').append($('<button>').html('Execute').attr('func', funcName).on('click', e => {
    var param = [];
    func.params.forEach(function(key) {
      switch (key) {
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
    });
    var result = algoMap[$(e.target).attr('func')].func(...param);
    alert(result);
  }));*/
};
var init = function() {
  $('#playground div').remove();
};

$(document).ready(function() {
  $('#playground').on('dragenter', e => {
    e.preventDefault();
    return true;
  })
  .on('drop', e => {
    addFunction(e.originalEvent.dataTransfer.getData('key'));
  })
  .on('dragover', e => {
    e.preventDefault();
    return true;
  });
  for (var key in algoMap) {
    var tag = $('<div>').html(key + '(Parameters : ' + algoMap[key].params
      + ', Return Type : ' + algoMap[key].returnType + ')').attr('name', key).attr('draggable', true).addClass('func_list')
    .on('dragstart', e => {
      e.originalEvent.dataTransfer.setData('key', $(e.target).attr('name'));
    });

    $('#func_list').append(tag);
  }
  init();
});
