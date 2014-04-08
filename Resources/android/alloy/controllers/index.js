function Controller() {
    function __alloyId7(e) {
        if (e && e.fromAdapter) return;
        __alloyId7.opts || {};
        var models = __alloyId6.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: "24"
                },
                title: "undefined" != typeof __alloyId3.__transform["fullName"] ? __alloyId3.__transform["fullName"] : __alloyId3.get("fullName"),
                _id: "undefined" != typeof __alloyId3.__transform["_id"] ? __alloyId3.__transform["_id"] : __alloyId3.get("_id"),
                leftImage: "undefined" != typeof __alloyId3.__transform["profile_photo_url"] ? __alloyId3.__transform["profile_photo_url"] : __alloyId3.get("profile_photo_url")
            });
            rows.push(__alloyId5);
            showUserWorks ? __alloyId5.addEventListener("click", showUserWorks) : __defers["__alloyId5!click!showUserWorks"] = true;
        }
        $.__views.__alloyId2.setData(rows);
    }
    function retrieveUsersFromServer(users) {
        var url = "http://stagingapi.seelio.com/v1/users?api_key=seelio";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var result = JSON.parse(this.responseText);
                result.forEach(function(userData) {
                    var user = Alloy.createModel("users", userData);
                    users.add(user);
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
    function showUserWorks(event) {
        var user = event.source;
        var args = {
            _user: user._id
        };
        var workListView = Alloy.createController("work_list", args).getView();
        workListView.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("users");
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId2 = Ti.UI.createTableView({
        id: "__alloyId2"
    });
    $.__views.index.add($.__views.__alloyId2);
    var __alloyId6 = Alloy.Collections["users"] || users;
    __alloyId6.on("fetch destroy change add remove reset", __alloyId7);
    exports.destroy = function() {
        __alloyId6.off("fetch destroy change add remove reset", __alloyId7);
    };
    _.extend($, $.__views);
    var users = Alloy.Collections.users;
    retrieveUsersFromServer(users);
    $.index.open();
    __defers["__alloyId5!click!showUserWorks"] && __alloyId5.addEventListener("click", showUserWorks);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;