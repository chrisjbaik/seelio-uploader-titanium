var args = arguments[0] || {};

function normalizeUrl(url) {
	if(url.match(/^\/[^\/]/)) {
		url = url.replace(/^\//, 'https://seelio.com/');
	}
	return url.replace(/^\/\//, 'http://');
}

function createAttachmentView(attachment) {
	if (attachment.thumbs && attachment.thumbs.l) {
		var attachmentView = Titanium.UI.createView();
		
		if (attachment.html && attachment.html.o && attachment.html.o.match(/iframe/)) {
			var match = attachment.html.o.match(/src="([^"]+)"/);
			if (match.length > 1) {
				var webView = Titanium.UI.createWebView({
					url: normalizeUrl(match[1]),
					width: '75%',
					height: '75%'
				});
				attachmentView.add(webView);
			}
		} else {
			attachment.thumbs.l = normalizeUrl(attachment.thumbs.l);
			var imageView = Titanium.UI.createImageView({
				image: attachment.thumbs.l
			});
			attachmentView.add(imageView);
		}
		if (attachment.caption) {
			var captionView = Titanium.UI.createLabel({
				text: attachment.caption,
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
				color: '#fff',
				bottom: 40
			});
			attachmentView.add(captionView);
		}
		$.attachmentsScrollableView.addView(attachmentView);
	}
}


function createAttachmentViews(attachments) {
	attachments.forEach(function (attachment) {
		createAttachmentView(attachment);
	});
}

$.window.addEventListener("open", function(){
	createAttachmentViews(args.attachments);
	
	if (Ti.Platform.osname === "android") {
		if ($.window.activity) {
			$.window.activity.actionBar.title = args.title;
			if (args.cover) {
				$.window.activity.actionBar.setIcon(args.cover);
			}
			$.window.activity.actionBar.setDisplayHomeAsUp(true);
			$.window.activity.actionBar.onHomeIconItemSelected = function () {
				$.window.close();
			};
			$.window.activity.actionBar.hide();
		}
	}
});