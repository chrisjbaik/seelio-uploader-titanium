function Controller() {
    function __alloyId22(e) {
        if (e && e.fromAdapter) return;
        __alloyId22.opts || {};
        var models = __alloyId21.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId18 = models[i];
            __alloyId18.__transform = {};
            var __alloyId20 = Ti.UI.createTableViewRow({
                height: "40",
                font: {
                    fontSize: "20"
                },
                color: "#999",
                _id: "undefined" != typeof __alloyId18.__transform["_id"] ? __alloyId18.__transform["_id"] : __alloyId18.get("_id"),
                title: "undefined" != typeof __alloyId18.__transform["title"] ? __alloyId18.__transform["title"] : __alloyId18.get("title"),
                attachments: "undefined" != typeof __alloyId18.__transform["attachments"] ? __alloyId18.__transform["attachments"] : __alloyId18.get("attachments"),
                leftImage: "undefined" != typeof __alloyId18.__transform["cover_m"] ? __alloyId18.__transform["cover_m"] : __alloyId18.get("cover_m")
            });
            rows.push(__alloyId20);
            uploadPhotoToWork ? __alloyId20.addEventListener("click", uploadPhotoToWork) : __defers["__alloyId20!click!uploadPhotoToWork"] = true;
        }
        $.__views.workList.setData(rows);
    }
    function retrieveWorksFromServer(works, _user) {
        var url = "http://stagingapi.seelio.com/v1/users/" + _user + "/works?api_key=seelio";
        $.loading.show();
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                $.loading.hide();
                var result = JSON.parse(this.responseText);
                result.forEach(function(workData) {
                    var work = Alloy.createModel("works", workData);
                    works.add(work);
                });
            },
            onerror: function(e) {
                $.loading.hide();
                console.log(e.error);
            },
            timeout: 5e3
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function uploadPhotoToWork(event) {
        var work = event.source;
        var url = "http://stagingapi.seelio.com/v1/works/" + work._id + "/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                $.window.close();
                alert("Successfully uploaded attachment!");
            },
            onerror: function(e) {
                console.log(e.error);
            },
            timeout: 5e3
        });
        xhr.open("POST", url);
        xhr.send({
            file: args.blob
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "work_selectAndUpload";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("works");
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window",
        layout: "vertical"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.selectWorkLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "25",
            fontWeight: "bold"
        },
        textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
        text: "Select a work",
        id: "selectWorkLabel"
    });
    $.__views.window.add($.__views.selectWorkLabel);
    $.__views.loading = Ti.UI.createActivityIndicator({
        id: "loading"
    });
    $.__views.window.add($.__views.loading);
    $.__views.workList = Ti.UI.createTableView({
        id: "workList"
    });
    $.__views.window.add($.__views.workList);
    var __alloyId21 = Alloy.Collections["works"] || works;
    __alloyId21.on("fetch destroy change add remove reset", __alloyId22);
    exports.destroy = function() {
        __alloyId21.off("fetch destroy change add remove reset", __alloyId22);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var works = Alloy.Collections.works;
    works.reset([]);
    retrieveWorksFromServer(works, "501bd1a0fca473f97d000017");
    $.window.addEventListener("close", function() {
        $.destroy();
    });
    __defers["__alloyId20!click!uploadPhotoToWork"] && __alloyId20.addEventListener("click", uploadPhotoToWork);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;