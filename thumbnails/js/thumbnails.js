$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$active = this.$el.find(".active");
  this.$gutter = this.$el.find(".gutter");
  this.$gutterImages = this.$el.find(".gutter-images");

  var $firstImg = this.$gutterImages.find('img').first();
  this.activate($firstImg);

  this.gutterIdx = 0;
  this.$images = this.$gutterImages.find("img");
  this.fillGutterImages();

  this.bindHandlers();
};

$.Thumbnails.prototype.activate = function ($img) {
  this.$activeImg = $img.clone();
  this.$active.empty().append(this.$activeImg);
};

$.Thumbnails.prototype.preview = function ($img) {
  this.$active.empty().append($img.clone());
};

$.Thumbnails.prototype.unPreview = function () {
  this.$active.empty().append(this.$activeImg);
};

$.Thumbnails.prototype.bindHandlers = function () {
  this.$gutterImages.on("click", "img", function (event) {
    var $img = $(event.currentTarget);
    this.activate($img);
  }.bind(this));

  this.$gutterImages.on("mouseenter", "img", function (event) {
    var $img = $(event.currentTarget);
    this.preview($img);
  }.bind(this));

  this.$gutterImages.on("mouseleave", "img", this.unPreview.bind(this));

  this.$gutter.on("click", "a", function (event) {
    var dir = parseInt($(event.currentTarget).data("dir"));
    this.gutterIdx += dir;
    if (this.gutterIdx < 0) {
      this.gutterIdx = 0;
    } else if (this.gutterIdx >= this.$images.length) {
      this.gutterIdx = this.$images.length - 1;
    }
    
    this.fillGutterImages();
  }.bind(this));
};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages.empty();
  for (var i = 0; i < 5; i++) {
    this.$gutterImages.append(this.$images.eq(this.gutterIdx + i));
  };
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
