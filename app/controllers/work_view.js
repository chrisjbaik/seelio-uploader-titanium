var args = arguments[0] || {};

var win = Ti.UI.createWindow();

var view1 = Ti.UI.createView({ backgroundColor:'#123' });
var view2 = Ti.UI.createView({ backgroundColor:'#246' });
var view3 = Ti.UI.createView({ backgroundColor:'#48b' });

var scrollableView = Ti.UI.createScrollableView({
  views:[view1,view2,view3],
  showPagingControl:true
});

win.add(scrollableView);
win.open();