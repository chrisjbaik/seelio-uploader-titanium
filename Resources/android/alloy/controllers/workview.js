function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "workview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.workview = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "workview"
    });
    $.__views.workview && $.addTopLevelView($.__views.workview);
    $.__views.__alloyId8 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId8"
    });
    $.__views.workview.add($.__views.__alloyId8);
    $.__views.titleLabel = Ti.UI.createLabel({
        font: {
            fontSize: "30"
        },
        left: "10",
        id: "titleLabel"
    });
    $.__views.__alloyId8.add($.__views.titleLabel);
    $.__views.attachmentsLabel = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        left: "10",
        id: "attachmentsLabel"
    });
    $.__views.__alloyId8.add($.__views.attachmentsLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.titleLabel.text = args.title || "Default Work Title";
    $.attachmentsLabel.text = args.attachments || "[]";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;