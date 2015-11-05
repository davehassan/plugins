$.Tabs = function (el) {
  this.$el = $(el);
  var tabSelector = this.$el.data("content-tabs");
  this.$contentTabs = $(tabSelector);
  this.$activeTab = this.$contentTabs.find(".active")
  this.bindHandlers();
};

$.Tabs.prototype.clickTab = function (event) {
  this.$activeTab.removeClass("active");
  var activeId = $(event.currentTarget).attr('href');
  this.$activeTab = this.$contentTabs.find(activeId).addClass("active");
};

$.Tabs.prototype.bindHandlers = function () {
  this.$el.on("click", "a", this.clickTab.bind(this) )
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
