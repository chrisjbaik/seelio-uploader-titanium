

$.browseButton.addEventListener('click', function (e) {
	var userListView = Alloy.createController("user_list").getView();
	userListView.open();
});

$.uploadButton.addEventListener('click', function (e) {
	Titanium.Media.showCamera({
		saveToPhotoGallery: true,
		success: function (event) {
			var args = {
				_user: '501bd1a0fca473f97d000017',
				actionBarTitle: 'Select a work',
				blob: event.media,
				clickHandler: 'uploadPhotoToWork'
			};
			var workListView = Alloy.createController("work_list", args).getView();
			workListView.open();
		},
		error: function () {
			alert('There was an error taking the photo.');
		}
	});
});

$.index.addEventListener('open', function(){
	$.index.activity.actionBar.hide();
});

$.index.open();