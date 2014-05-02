function Controller() {
    function createAttachmentView(attachment) {
        if (attachment.thumbs && attachment.thumbs.m) {
            var attachmentView = Titanium.UI.createView();
            var imageView = Titanium.UI.createImageView({
                image: attachment.thumbs.l
            });
            attachmentView.add(imageView);
            if (attachment.caption) {
                var captionView = Titanium.UI.createLabel({
                    text: attachment.caption
                });
                attachmentView.add(captionView);
            }
            $.attachmentsScrollableView.addView(attachmentView);
        }
    }
    function createAttachmentViews(attachments) {
        attachments.forEach(function(attachment) {
            createAttachmentView(attachment);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "work_view";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.work_view = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "work_view"
    });
    $.__views.work_view && $.addTopLevelView($.__views.work_view);
    var __alloyId23 = [];
    $.__views.__alloyId24 = Ti.UI.createView({
        id: "__alloyId24"
    });
    __alloyId23.push($.__views.__alloyId24);
    $.__views.attachmentsScrollableView = Ti.UI.createScrollableView({
        views: __alloyId23,
        id: "attachmentsScrollableView"
    });
    $.__views.work_view.add($.__views.attachmentsScrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    createAttachmentViews(args.attachments);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;