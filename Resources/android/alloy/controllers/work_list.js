function Controller() {
    function __alloyId16(e) {
        if (e && e.fromAdapter) return;
        __alloyId16.opts || {};
        var models = __alloyId15.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId12 = models[i];
            __alloyId12.__transform = {};
            var __alloyId14 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: "24"
                },
                title: "undefined" != typeof __alloyId12.__transform["title"] ? __alloyId12.__transform["title"] : __alloyId12.get("title"),
                attachments: "undefined" != typeof __alloyId12.__transform["attachments"] ? __alloyId12.__transform["attachments"] : __alloyId12.get("attachments"),
                leftImage: "undefined" != typeof __alloyId12.__transform["cover_m"] ? __alloyId12.__transform["cover_m"] : __alloyId12.get("cover_m")
            });
            rows.push(__alloyId14);
            showWork ? __alloyId14.addEventListener("click", showWork) : __defers["__alloyId14!click!showWork"] = true;
        }
        $.__views.__alloyId11.setData(rows);
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
    $.__views.work_list = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "work_list"
    });
    $.__views.work_list && $.addTopLevelView($.__views.work_list);
    $.__views.__alloyId11 = Ti.UI.createTableView({
        id: "__alloyId11"
    });
    $.__views.work_list.add($.__views.__alloyId11);
    var __alloyId15 = Alloy.Collections["works"] || works;
    __alloyId15.on("fetch destroy change add remove reset", __alloyId16);
    exports.destroy = function() {
        __alloyId15.off("fetch destroy change add remove reset", __alloyId16);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var works = Alloy.Collections.works;
    retrieveWorksFromServer(works, args._user);
    __defers["__alloyId14!click!showWork"] && __alloyId14.addEventListener("click", showWork);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;