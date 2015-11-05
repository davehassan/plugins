$.Tabs = function (el) {
  this.$el = $(el);
  var tabSelector = this.$el.data("content-tabs");
  this.$contentTabs = $(tabSelector);
  this.$activeTab = this.$contentTabs.find(".active")
  this.bindHandlers();
};

$.Tabs.prototype.clickTab = function (event) {
  if (this.transitioning) return;
  this.transitioning = true;

  this.$activeTab.removeClass("active").addClass("transitioning");
  var activeId = $(event.currentTarget).attr('href');

  this.finishTransition (function () {
    this.$activeTab = this.$contentTabs.find(activeId);
    this.$activeTab.addClass("transitioning active");
    this.finishTransition(function () {
      this.transitioning = false;
    }.bind(this));
  }.bind(this));
};

$.Tabs.prototype.finishTransition = function (callback) {
  this.$activeTab.one("transitionend", function (event) {
    this.$activeTab.removeClass("transitioning");
    if (typeof callback === "function") callback();
  }.bind(this));
};

$.Tabs.prototype.bindHandlers = function () {
  this.$el.on("click", "a", this.clickTab.bind(this) )
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
