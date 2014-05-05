function Controller() {
    function __alloyId16(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId16.opts || {};
        var models = __alloyId15.models;
        var len = models.length;
        var __alloyId11 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId12 = models[i];
            __alloyId12.__transform = {};
            var __alloyId14 = {
                template: "userListTemplate",
                image: {
                    image: "undefined" != typeof __alloyId12.__transform["profile_photo_url"] ? __alloyId12.__transform["profile_photo_url"] : __alloyId12.get("profile_photo_url")
                },
                label: {
                    text: "undefined" != typeof __alloyId12.__transform["fullName"] ? __alloyId12.__transform["fullName"] : __alloyId12.get("fullName")
                },
                properties: {
                    _id: "undefined" != typeof __alloyId12.__transform["_id"] ? __alloyId12.__transform["_id"] : __alloyId12.get("_id"),
                    fullName: "undefined" != typeof __alloyId12.__transform["fullName"] ? __alloyId12.__transform["fullName"] : __alloyId12.get("fullName"),
                    profile_photo_url: "undefined" != typeof __alloyId12.__transform["profile_photo_url"] ? __alloyId12.__transform["profile_photo_url"] : __alloyId12.get("profile_photo_url")
                }
            };
            __alloyId11.push(__alloyId14);
        }
        opts.animation ? $.__views.__alloyId10.setItems(__alloyId11, opts.animation) : $.__views.__alloyId10.setItems(__alloyId11);
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
    function showUserWorks(e) {
        var section = $.userList.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var args = {
            _user: item.properties._id,
            actionBarTitle: item.properties.fullName,
            clickHandler: "showWork",
            profile_photo_url: item.properties.profile_photo_url
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
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    var __alloyId2 = {};
    var __alloyId5 = [];
    var __alloyId7 = {
        type: "Ti.UI.ImageView",
        bindId: "image",
        properties: {
            left: 0,
            width: 40,
            height: 40,
            bindId: "image"
        }
    };
    __alloyId5.push(__alloyId7);
    var __alloyId9 = {
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
    __alloyId5.push(__alloyId9);
    var __alloyId4 = {
        properties: {
            backgroundSelectedColor: "#71BBEA",
            name: "userListTemplate"
        },
        childTemplates: __alloyId5
    };
    __alloyId2["userListTemplate"] = __alloyId4;
    $.__views.__alloyId10 = Ti.UI.createListSection({
        id: "__alloyId10"
    });
    var __alloyId15 = Alloy.Collections["users"] || users;
    __alloyId15.on("fetch destroy change add remove reset", __alloyId16);
    var __alloyId17 = [];
    __alloyId17.push($.__views.__alloyId10);
    $.__views.userList = Ti.UI.createListView({
        sections: __alloyId17,
        templates: __alloyId2,
        id: "userList",
        defaultItemTemplate: "userListTemplate"
    });
    $.__views.window.add($.__views.userList);
    showUserWorks ? $.__views.userList.addEventListener("itemclick", showUserWorks) : __defers["$.__views.userList!itemclick!showUserWorks"] = true;
    exports.destroy = function() {
        __alloyId15.off("fetch destroy change add remove reset", __alloyId16);
    };
    _.extend($, $.__views);
    var users = Alloy.Collections.users;
    $.window.addEventListener("open", function() {
        users.reset([]);
        retrieveUsersFromServer(users);
        if ($.window.activity) {
            $.window.activity.actionBar.title = "Browse";
            $.window.activity.actionBar.setDisplayHomeAsUp(true);
            $.window.activity.actionBar.onHomeIconItemSelected = function() {
                $.window.close();
            };
        }
    });
    $.window.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.userList!itemclick!showUserWorks"] && $.__views.userList.addEventListener("itemclick", showUserWorks);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;