var container = document.querySelector('.container');
var data = [];
var xhr = new XMLHttpRequest();

xhr.open('GET', 'data.json', true);

xhr.onreadystatechange = function () {
  if (xhr.readyState != 4) return;

  if (xhr.status != 200) {
    // обработать ошибку
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    try {
      var data = JSON.parse(xhr.responseText);
    } catch (e) {
      alert("Некорректный ответ " + e.message);
    }
    showData(data);
  }

};

xhr.send();

function showData(data) {
  data = data.slice();
  data.forEach(function (item, i) {
    data[i].id = i;
  });
  var create = function (info) {
    var template = document.querySelector('template');
    var server = template.content.querySelector('.server');
    var element = server.cloneNode(true);
    element.querySelector('.server__cpu').textContent = info.cpu;
    element.querySelector('.server__hdd').textContent = info.hdd;
    element.querySelector('.server__price').textContent = info.price;
    element.querySelector('.server__ram').textContent = info.ram;
    return element;
  };
  create(data);
}