function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#71BBEA",
        layout: "vertical",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.logo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "50%",
        color: "#fff",
        font: {
            fontFamily: "Museo500-Regular",
            fontSize: "60"
        },
        id: "logo",
        text: "seelio"
    });
    $.__views.index.add($.__views.logo);
    $.__views.browseButton = Ti.UI.createButton({
        width: "80%",
        height: "50",
        font: {
            fontFamily: "LiberationSans-Regular",
            fontSize: "20"
        },
        borderRadius: "4",
        borderWidth: "1",
        borderColor: "#fff",
        backgroundColor: "transparent",
        color: "#fff",
        backgroundSelectedColor: "#eee",
        top: "20",
        id: "browseButton",
        title: "Browse"
    });
    $.__views.index.add($.__views.browseButton);
    $.__views.uploadButton = Ti.UI.createButton({
        width: "80%",
        height: "50",
        font: {
            fontFamily: "LiberationSans-Regular",
            fontSize: "20"
        },
        borderRadius: "4",
        borderWidth: "1",
        borderColor: "#fff",
        backgroundColor: "transparent",
        color: "#fff",
        backgroundSelectedColor: "#eee",
        top: "20",
        id: "uploadButton",
        title: "Upload"
    });
    $.__views.index.add($.__views.uploadButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.browseButton.addEventListener("click", function() {
        var userListView = Alloy.createController("user_list").getView();
        userListView.open();
    });
    $.uploadButton.addEventListener("click", function() {
        Titanium.Media.showCamera({
            saveToPhotoGallery: true,
            success: function(event) {
                var args = {
                    _user: "501bd1a0fca473f97d000017",
                    actionBarTitle: "Select a work",
                    blob: event.media,
                    clickHandler: "uploadPhotoToWork"
                };
                var workListView = Alloy.createController("work_list", args).getView();
                workListView.open();
            },
            error: function() {
                alert("There was an error taking the photo.");
            }
        });
    });
    $.index.addEventListener("open", function() {
        $.index.activity.actionBar.hide();
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;