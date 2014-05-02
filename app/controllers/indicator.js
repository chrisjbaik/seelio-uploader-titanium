if (Ti.Platform.osname === 'ipad')
    $.activityInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.BIG;


$.indicator.showIndicator = function() {
    try {
        $.indicator.open();
        $.activityInd.show();

    } catch(e) {
        Ti.API.info("Exception in opening indicator");
    }

};
// Function to hide Indicator

$.indicator.hideIndicator = function() {
    try {
        $.activityInd.hide();
        $.indicator.close();
    } catch(e) {
        Ti.API.info("Exception in hiding indicator");
    }
};

$.activityInd.show();