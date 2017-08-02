var addFunction = function(funcName) {
  if(!algoMap[funcName]) {
    alert('not exists');
    return;
  }

  $('#playground').append(makeFunctionDiv(funcName));
};

var execute = function() {
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
    var tag = makeFunctionList(key);
    $('#func_list').append(tag);
  }
  init();
});
