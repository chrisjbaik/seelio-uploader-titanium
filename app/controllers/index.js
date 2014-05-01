$.index.open();

function uploadPhotoToWork(_work, blob) {
	var url = 'http://stagingapi.seelio.com/v1/works/' + _work + '/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b';
	var xhr = Ti.Network.createHTTPClient({
		onload: function (e) {
			alert('Successfully uploaded attachment!');
		},
		onerror: function(e) {
			console.log(e.error);
		},
		timeout: 5000
	});
	xhr.open("POST", url);
	xhr.send({
		file: blob
	});	
}

$.browseButton.addEventListener('click', function (e) {
	var userListView = Alloy.createController("user_list").getView();
	userListView.open();
});

$.uploadButton.addEventListener('click', function (e) {
	Titanium.Media.showCamera({
		saveToPhotoGallery: true,
		success: function (event) {
			uploadPhotoToWork('5356c483000bb05d750000fc', event.media);
		}
	});
});