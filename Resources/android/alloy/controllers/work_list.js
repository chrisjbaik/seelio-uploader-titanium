function Controller() {
    function __alloyId15(e) {
        if (e && e.fromAdapter) return;
        __alloyId15.opts || {};
        var models = __alloyId14.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = {};
            var __alloyId13 = Ti.UI.createTableViewRow({
                height: "40",
                font: {
                    fontSize: "20"
                },
                color: "#999",
                title: "undefined" != typeof __alloyId11.__transform["title"] ? __alloyId11.__transform["title"] : __alloyId11.get("title"),
                attachments: "undefined" != typeof __alloyId11.__transform["attachments"] ? __alloyId11.__transform["attachments"] : __alloyId11.get("attachments"),
                leftImage: "undefined" != typeof __alloyId11.__transform["cover_m"] ? __alloyId11.__transform["cover_m"] : __alloyId11.get("cover_m")
            });
            rows.push(__alloyId13);
            showWork ? __alloyId13.addEventListener("click", showWork) : __defers["__alloyId13!click!showWork"] = true;
        }
        $.__views.__alloyId10.setData(rows);
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
    function showWork(event) {
        var work = event.source;
        var args = {
            title: work.title,
            attachments: work.attachments
        };
        var workView = Alloy.createController("work_view", args).getView();
        workView.open();
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
    $.__views.__alloyId10 = Ti.UI.createTableView({
        id: "__alloyId10"
    });
    $.__views.window.add($.__views.__alloyId10);
    var __alloyId14 = Alloy.Collections["works"] || works;
    __alloyId14.on("fetch destroy change add remove reset", __alloyId15);
    exports.destroy = function() {
        __alloyId14.off("fetch destroy change add remove reset", __alloyId15);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var works = Alloy.Collections.works;
    works.reset([]);
    retrieveWorksFromServer(works, args._user);
    $.window.addEventListener("close", function() {
        $.destroy();
    });
    __defers["__alloyId13!click!showWork"] && __alloyId13.addEventListener("click", showWork);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;