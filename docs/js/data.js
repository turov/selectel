'use strict';

(function () {

  var container = document.querySelector('.offers__container');
  var loader = document.querySelector('.loader');
  var GOOD_REQUEST = 200;
  var TIME_OUT = 3000;

  var request = function () {
    var data = [];
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.jsonbin.io/b/5b683d097b212953678c03dd', false);

    xhr.send();

    var error = function () {
      var errorMsg = document.createElement('h5');
      errorMsg.className = 'error-message';
      errorMsg.innerHTML = 'Ошибка соединения';
      container.removeChild(loader);
      container.appendChild(errorMsg);
    };

    if (xhr.status !== GOOD_REQUEST) {
      setTimeout(error, TIME_OUT);
    } else {
      var servers = JSON.parse(xhr.responseText);
      data = servers.slice();
      container.removeChild(loader);
    }
    return data
  };


  var create = function (info) {
    var template = document.querySelector('#template-server');
    var server = template.content.querySelector('.server');
    var element = server.cloneNode(true);
    var price = String(info.price / 100).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' '); // Переводим копейки в рубли + добавляем разделитель разрядов
    element.querySelector('.server__info--cpu').textContent = info.cpu;
    element.querySelector('.server__info--hdd').textContent = info.hdd + ' ГБ';
    element.querySelector('.server__info--ram').textContent = info.ram + ' ГБ';
    element.querySelector('.server__info--price').textContent = price + ' ₽/мес.';
    container.appendChild(element);
  };

  var servers = request();

  servers.forEach(function (item) {
    create(item);
  });

})();

