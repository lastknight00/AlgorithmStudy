
var listSum = {
  params : {list : 'list', num : 'int'},
  func : function(list, num) {
    console.log(list, num);
    list.forEach(function(value, num) {

      console.log(value);

    });
  }
};

var algoMap = [];
algoMap['listSum'] = listSum;

var makeInput = function(key) {
  return $('<input class=' + key + '>');
};

var execute = function() {
  var func = algoMap[$('#algo').val()];
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
    $('#canvas').append(element);
  }
  $('#canvas').append($('<button>').html('Execute').on('click', function() {
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
