var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var indWin = null;

Alloy.Globals.showIndicator = function() {
    try {
        null == indWin && (indWin = Alloy.createController("indicator").getView());
        indWin.showIndicator();
    } catch (e) {
        Ti.API.info("Exception in opening indicator");
    }
};

Alloy.Globals.hideIndicator = function() {
    try {
        if (null != indWin) {
            indWin.hideIndicator();
            indWin = null;
        }
    } catch (e) {
        Ti.API.info("Exception in hiding indicator");
    }
};

Alloy.createController("index");