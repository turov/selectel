'use strict';

(function () {

  var slider = document.querySelector('.slider');
  var slides = slider.querySelectorAll('.slide');
  var next = slider.querySelector('.slider__control-btn--next');
  var previous = slider.querySelector('.slider__control-btn--prev');
  var pagination = slider.querySelectorAll('.slider__pagination-btn');
  var currentSlide = 0;
  var INTERVAL = 5000;
  var slideInterval = setInterval(nextSlide, INTERVAL);
  var index;

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  function find(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].classList.contains(value)) {
        index = i;
        return index;
      }
    }
  }

  function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide slide--active';

    find(slides, 'slide--active');

    pagination.forEach(function (elem) {
      elem.classList.remove('slider__pagination-btn--active');
    });
    pagination[index].classList.add('slider__pagination-btn--active');

    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, INTERVAL);
  }

  next.onclick = function () {
    nextSlide();
  };
  previous.onclick = function () {
    previousSlide();
  };


  pagination.forEach(function (elem, i) {
    elem.addEventListener('click', function () {
      goToSlide(i);
    });
  });

})();
