var makeFunctionList = key => {
  return $('<div>').html(key + '(Parameters : ' + algoMap[key].params
    + ', Return Type : ' + algoMap[key].returnType + ')').attr('name', key).attr('draggable', true).addClass('func_list')
  .on('dragstart', e => {
    e.originalEvent.dataTransfer.setData('key', $(e.target).attr('name'));
  });
};

var makeInputElement = key => {
  return $('<input>').addClass(key).on('drop', e => {
    if($(e.target).parent().children(':first-child').html() == e.originalEvent.dataTransfer.getData('returnType')) {
      alert('true');
    } else {
      alert('false');
    }
    e.stopPropagation();
  })
  .on('dragover', e => {
    e.preventDefault();
    return true;
  });
};

var makeFunctionDiv = funcName => {
  var func = algoMap[funcName];
  var funcDiv = $('<div>').addClass('func').append($('<h3>').html(funcName));
  funcDiv.append($('<p>').addClass('input').html('Input'));
  func.params.forEach(function(key) {
    var element = $('<div>').attr('id', key);
    element.append($('<h4>').html(key));
    switch (key) {
      case 'list':
        element.append($('<button>').attr('name', key).html('Add Element').on('click', function(e) {
          $(e.target).prev().append(makeInputElement(key));
        }));
        break;
      case 'int':
        element.append(makeInputElement(key));
        break;
      default:
        console.log(key + ' element\'s type is wrong.');
    }
    funcDiv.append(element);
  });
  funcDiv.append($('<p>').addClass('output').html('Output').append($('<h4>').html(func.returnType).attr('draggable', true).on('dragstart', e => {
    e.originalEvent.dataTransfer.setData('returnType', $(e.target).html());
  })));
  return funcDiv;
};
