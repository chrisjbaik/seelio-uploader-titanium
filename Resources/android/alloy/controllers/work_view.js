function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "work_view";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var win = Ti.UI.createWindow();
    var view1 = Ti.UI.createView({
        backgroundColor: "#123"
    });
    var view2 = Ti.UI.createView({
        backgroundColor: "#246"
    });
    var view3 = Ti.UI.createView({
        backgroundColor: "#48b"
    });
    var scrollableView = Ti.UI.createScrollableView({
        views: [ view1, view2, view3 ],
        showPagingControl: true
    });
    win.add(scrollableView);
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;