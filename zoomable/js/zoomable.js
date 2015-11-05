$.Zoomable = function (el) {
  this.$el = $(el);
  this.$img = this.$el.find("img");
  this.$focusBox = this.$el.find(".focus-box");
  this.bindHandlers();
};

$.Zoomable.prototype.bindHandlers = function () {
  this.$el.on("mouseenter", this.showFocusBox.bind(this));
  this.$el.on("mouseleave", this.removeFocusBox.bind(this));
};

$.Zoomable.prototype.showFocusBox = function (event) {
  this.$focusBox.removeClass("hidden");
};

$.Zoomable.prototype.removeFocusBox = function (event) {
  this.$focusBox.addClass("hidden");
};

$.Zoomable.prototype.resetFocusBox = function (event) {
  console.log(event);
  var x = event.offsetX, y = event.offsetY;
  var width = this.$focusBox.width(), height = this.$focusBox.height();
  var imgWidth = this.$img.width(), imgHeight = this.$img.height();
};



$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
