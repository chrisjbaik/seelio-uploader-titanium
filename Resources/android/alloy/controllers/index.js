function Controller() {
    function uploadPhotoToWork(_work, blob) {
        var url = "http://stagingapi.seelio.com/v1/works/" + _work + "/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert("Successfully uploaded attachment!");
            },
            onerror: function(e) {
                console.log(e.error);
            },
            timeout: 5e3
        });
        xhr.open("POST", url);
        xhr.send({
            file: blob
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "seelio",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.browseButton = Ti.UI.createButton({
        id: "browseButton",
        title: "Browse"
    });
    $.__views.index.add($.__views.browseButton);
    $.__views.uploadButton = Ti.UI.createButton({
        id: "uploadButton",
        title: "Upload"
    });
    $.__views.index.add($.__views.uploadButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.browseButton.addEventListener("click", function() {
        var userListView = Alloy.createController("user_list").getView();
        userListView.open();
    });
    $.uploadButton.addEventListener("click", function() {
        Titanium.Media.showCamera({
            saveToPhotoGallery: true,
            success: function(event) {
                uploadPhotoToWork("5356c483000bb05d750000fc", event.media);
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;