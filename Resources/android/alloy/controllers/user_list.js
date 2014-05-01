function Controller() {
    function __alloyId8(e) {
        if (e && e.fromAdapter) return;
        __alloyId8.opts || {};
        var models = __alloyId7.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId6 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: "24"
                },
                title: "undefined" != typeof __alloyId4.__transform["fullName"] ? __alloyId4.__transform["fullName"] : __alloyId4.get("fullName"),
                _id: "undefined" != typeof __alloyId4.__transform["_id"] ? __alloyId4.__transform["_id"] : __alloyId4.get("_id"),
                leftImage: "undefined" != typeof __alloyId4.__transform["profile_photo_url"] ? __alloyId4.__transform["profile_photo_url"] : __alloyId4.get("profile_photo_url")
            });
            rows.push(__alloyId6);
            showUserWorks ? __alloyId6.addEventListener("click", showUserWorks) : __defers["__alloyId6!click!showUserWorks"] = true;
        }
        $.__views.__alloyId3.setData(rows);
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
    this.__controllerPath = "user_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("users");
    $.__views.user_list = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "user_list"
    });
    $.__views.user_list && $.addTopLevelView($.__views.user_list);
    $.__views.__alloyId3 = Ti.UI.createTableView({
        id: "__alloyId3"
    });
    $.__views.user_list.add($.__views.__alloyId3);
    var __alloyId7 = Alloy.Collections["users"] || users;
    __alloyId7.on("fetch destroy change add remove reset", __alloyId8);
    exports.destroy = function() {
        __alloyId7.off("fetch destroy change add remove reset", __alloyId8);
    };
    _.extend($, $.__views);
    var users = Alloy.Collections.users;
    retrieveUsersFromServer(users);
    __defers["__alloyId6!click!showUserWorks"] && __alloyId6.addEventListener("click", showUserWorks);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;