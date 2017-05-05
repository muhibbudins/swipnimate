$(document).ready(function() {
  var first = $('.slide-title').first();
  first.show();
  first.addClass('animated ' + first.data('animate'));

  var second = $('.slide-captions').first();
  second.show();
  second.addClass('animated ' + second.data('animate'));

  new Swiper('.swiper-default', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 0,
    autoplay: 1500,
    loop: true
  })
  .on('onSlideChangeStart', function(e) {
    var maping = $(e.slides[e.activeIndex]).find('[data-slide="animated"]');
    maping.map(function(k, v) {
      var target = $(v);
      animate = target.data('animate');

      target.hide();
      target.removeClass('animated ' + animate);
    });
  })
  .on('onSlideChangeEnd', function(e) {
    var maping = $(e.slides[e.activeIndex]).find('[data-slide="animated"]');
    maping.map(function(k, v) {
      var target = $(v);
      animate = target.data('animate');

      target.show();
      target.addClass('animated ' + animate);
    });
  });
});