$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.setupClasses();
  this.bindHandlers();
};

$.Carousel.prototype.setupClasses = function () {
  var $lis = this.$el.find("li");
  $lis.slice(1, $lis.length - 1).addClass("right");
  $lis.eq(0).addClass("active");
  $lis.eq($lis.length - 1).addClass("left");
};

$.Carousel.prototype.bindHandlers = function () {
  this.$el.on("click", "button", function (event) {

    var $button = $(event.currentTarget);
    var dir = parseInt($button.data("dir"));
    this.slide.call(this, dir);

  }.bind(this));
};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) return;
  this.transitioning = true;

  var $lis = this.$el.find("li");
  var $oldActiveLi = $lis.eq(this.activeIdx);

  this.activeIdx = (this.activeIdx + dir + $lis.length) % $lis.length;
  var $activeLi = $lis.eq(this.activeIdx);
  var dirClass = (dir === 1 ? "right" : "left");
  var oppDirClass = (dir === -1 ? "right" : "left");
  $activeLi.addClass("active");

  var $nextLi = $lis.eq((this.activeIdx + dir + $lis.length) % $lis.length);
  $nextLi.removeClass().addClass(dirClass);


  setTimeout(function () {
    $activeLi.removeClass(dirClass);
    $oldActiveLi.addClass(oppDirClass);
    $oldActiveLi.one("transitionend", function (event) {
      $oldActiveLi.removeClass("active");
      this.transitioning = false;
    }.bind(this));
  }.bind(this), 0);

};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
