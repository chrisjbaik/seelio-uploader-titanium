

$.browseButton.addEventListener('click', function (e) {
	var userListView = Alloy.createController("user_list").getView();
	userListView.open();
});

$.uploadButton.addEventListener('click', function (e) {
	Titanium.Media.showCamera({
		saveToPhotoGallery: true,
		success: function (event) {
			var args = {
				blob: event.media
			};
			var selectAndUploadView = Alloy.createController("work_selectAndUpload", args).getView();
			selectAndUploadView.open();
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