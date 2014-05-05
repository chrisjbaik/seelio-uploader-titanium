function Controller() {
    function __alloyId42(e) {
        if (e && e.fromAdapter) return;
        __alloyId42.opts || {};
        var models = __alloyId41.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId38 = models[i];
            __alloyId38.__transform = {};
            var __alloyId40 = Ti.UI.createTableViewRow({
                height: "40",
                font: {
                    fontSize: "20"
                },
                color: "#999",
                _id: "undefined" != typeof __alloyId38.__transform["_id"] ? __alloyId38.__transform["_id"] : __alloyId38.get("_id"),
                title: "undefined" != typeof __alloyId38.__transform["title"] ? __alloyId38.__transform["title"] : __alloyId38.get("title"),
                attachments: "undefined" != typeof __alloyId38.__transform["attachments"] ? __alloyId38.__transform["attachments"] : __alloyId38.get("attachments"),
                leftImage: "undefined" != typeof __alloyId38.__transform["cover_m"] ? __alloyId38.__transform["cover_m"] : __alloyId38.get("cover_m")
            });
            rows.push(__alloyId40);
            uploadPhotoToWork ? __alloyId40.addEventListener("click", uploadPhotoToWork) : __defers["__alloyId40!click!uploadPhotoToWork"] = true;
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
    $.__views.workList = Ti.UI.createTableView({
        id: "workList"
    });
    $.__views.window.add($.__views.workList);
    var __alloyId41 = Alloy.Collections["works"] || works;
    __alloyId41.on("fetch destroy change add remove reset", __alloyId42);
    $.__views.loading = Ti.UI.createActivityIndicator({
        height: "100%",
        width: "100%",
        zIndex: 5e3,
        opacity: .7,
        id: "loading",
        style: Ti.UI.ActivityIndicatorStyle.BIG
    });
    $.__views.loading && $.addTopLevelView($.__views.loading);
    exports.destroy = function() {
        __alloyId41.off("fetch destroy change add remove reset", __alloyId42);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var works = Alloy.Collections.works;
    $.window.addEventListener("open", function() {
        works.reset([]);
        retrieveWorksFromServer(works, "501bd1a0fca473f97d000017");
        if ($.window.activity) {
            $.window.activity.actionBar.title = "Select a work";
            $.window.activity.actionBar.setDisplayHomeAsUp(true);
            $.window.activity.actionBar.onHomeIconItemSelected = function() {
                $.window.close();
            };
        }
    });
    $.window.addEventListener("close", function() {
        $.destroy();
    });
    __defers["__alloyId40!click!uploadPhotoToWork"] && __alloyId40.addEventListener("click", uploadPhotoToWork);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;