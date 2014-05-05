function Controller() {
    function normalizeUrl(url) {
        url.match(/^\/[^\/]/) && (url = url.replace(/^\//, "https://seelio.com/"));
        return url.replace(/^\/\//, "http://");
    }
    function createAttachmentView(attachment) {
        if (attachment.thumbs && attachment.thumbs.l) {
            var attachmentView = Titanium.UI.createView();
            if (attachment.html && attachment.html.o && attachment.html.o.match(/iframe/)) {
                var match = attachment.html.o.match(/src="([^"]+)"/);
                if (match.length > 1) {
                    var webView = Titanium.UI.createWebView({
                        url: normalizeUrl(match[1]),
                        width: "75%",
                        height: "75%"
                    });
                    attachmentView.add(webView);
                }
            } else {
                attachment.thumbs.l = normalizeUrl(attachment.thumbs.l);
                var imageView = Titanium.UI.createImageView({
                    image: attachment.thumbs.l
                });
                attachmentView.add(imageView);
            }
            if (attachment.caption) {
                var captionView = Titanium.UI.createLabel({
                    text: attachment.caption,
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                    color: "#fff",
                    bottom: 40
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
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "window",
        fullscreen: "true"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    var __alloyId36 = [];
    $.__views.attachmentsScrollableView = Ti.UI.createScrollableView({
        views: __alloyId36,
        id: "attachmentsScrollableView"
    });
    $.__views.window.add($.__views.attachmentsScrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.window.addEventListener("open", function() {
        createAttachmentViews(args.attachments);
        if ($.window.activity) {
            $.window.activity.actionBar.title = args.title;
            args.cover && $.window.activity.actionBar.setIcon(args.cover);
            $.window.activity.actionBar.setDisplayHomeAsUp(true);
            $.window.activity.actionBar.onHomeIconItemSelected = function() {
                $.window.close();
            };
            $.window.activity.actionBar.hide();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;