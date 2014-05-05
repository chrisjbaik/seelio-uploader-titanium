function Controller() {
    function __alloyId34(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId34.opts || {};
        var models = __alloyId33.models;
        var len = models.length;
        var __alloyId29 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId30 = models[i];
            __alloyId30.__transform = {};
            var __alloyId32 = {
                template: "workListTemplate",
                image: {
                    image: "undefined" != typeof __alloyId30.__transform["cover_m"] ? __alloyId30.__transform["cover_m"] : __alloyId30.get("cover_m")
                },
                label: {
                    text: "undefined" != typeof __alloyId30.__transform["title"] ? __alloyId30.__transform["title"] : __alloyId30.get("title")
                },
                properties: {
                    _id: "undefined" != typeof __alloyId30.__transform["_id"] ? __alloyId30.__transform["_id"] : __alloyId30.get("_id"),
                    title: "undefined" != typeof __alloyId30.__transform["title"] ? __alloyId30.__transform["title"] : __alloyId30.get("title"),
                    attachments: "undefined" != typeof __alloyId30.__transform["attachments"] ? __alloyId30.__transform["attachments"] : __alloyId30.get("attachments"),
                    cover: "undefined" != typeof __alloyId30.__transform["cover_m"] ? __alloyId30.__transform["cover_m"] : __alloyId30.get("cover_m")
                }
            };
            __alloyId29.push(__alloyId32);
        }
        opts.animation ? $.__views.__alloyId28.setItems(__alloyId29, opts.animation) : $.__views.__alloyId28.setItems(__alloyId29);
    }
    function retrieveWorksFromServer(works, _user) {
        var url = "http://stagingapi.seelio.com/v1/users/" + _user + "/works?api_key=seelio";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var result = JSON.parse(this.responseText);
                result.forEach(function(workData) {
                    var work = Alloy.createModel("works", workData);
                    works.add(work);
                });
            },
            onerror: function(e) {
                console.log(e.error);
            },
            timeout: 5e3
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function showWork(e) {
        var section = $.workList.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var args = {
            title: item.properties.title,
            attachments: item.properties.attachments,
            cover: item.properties.cover
        };
        var workView = Alloy.createController("work_view", args).getView();
        workView.open();
    }
    function uploadPhotoToWork(e) {
        var section = $.workList.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var url = "http://stagingapi.seelio.com/v1/works/" + item.properties._id + "/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b";
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
    function itemClickHandler(e) {
        switch (args.clickHandler) {
          case "uploadPhotoToWork":
            uploadPhotoToWork(e);
            break;

          case "showWork":
          default:
            showWork(e);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "work_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("works");
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    var __alloyId20 = {};
    var __alloyId23 = [];
    var __alloyId25 = {
        type: "Ti.UI.ImageView",
        bindId: "image",
        properties: {
            left: 0,
            width: 40,
            height: 40,
            bindId: "image"
        }
    };
    __alloyId23.push(__alloyId25);
    var __alloyId27 = {
        type: "Ti.UI.Label",
        bindId: "label",
        properties: {
            width: Ti.UI.SIZE,
            height: 40,
            color: "#999",
            font: {
                fontSize: 20
            },
            left: 45,
            wordWrap: false,
            bindId: "label"
        }
    };
    __alloyId23.push(__alloyId27);
    var __alloyId22 = {
        properties: {
            backgroundSelectedColor: "#71BBEA",
            name: "workListTemplate"
        },
        childTemplates: __alloyId23
    };
    __alloyId20["workListTemplate"] = __alloyId22;
    $.__views.__alloyId28 = Ti.UI.createListSection({
        id: "__alloyId28"
    });
    var __alloyId33 = Alloy.Collections["works"] || works;
    __alloyId33.on("fetch destroy change add remove reset", __alloyId34);
    var __alloyId35 = [];
    __alloyId35.push($.__views.__alloyId28);
    $.__views.workList = Ti.UI.createListView({
        sections: __alloyId35,
        templates: __alloyId20,
        id: "workList",
        defaultItemTemplate: "workListTemplate"
    });
    $.__views.window.add($.__views.workList);
    itemClickHandler ? $.__views.workList.addEventListener("itemclick", itemClickHandler) : __defers["$.__views.workList!itemclick!itemClickHandler"] = true;
    exports.destroy = function() {
        __alloyId33.off("fetch destroy change add remove reset", __alloyId34);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var works = Alloy.Collections.works;
    $.window.addEventListener("open", function() {
        works.reset([]);
        retrieveWorksFromServer(works, args._user);
        if ($.window.activity) {
            $.window.activity.actionBar.title = args.actionBarTitle;
            args.profile_photo_url && $.window.activity.actionBar.setIcon(args.profile_photo_url);
            $.window.activity.actionBar.setDisplayHomeAsUp(true);
            $.window.activity.actionBar.onHomeIconItemSelected = function() {
                $.window.close();
            };
        }
    });
    $.window.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.workList!itemclick!itemClickHandler"] && $.__views.workList.addEventListener("itemclick", itemClickHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;