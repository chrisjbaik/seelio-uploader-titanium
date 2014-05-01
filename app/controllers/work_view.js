var args = arguments[0] || {};

function createAttachmentView(attachment) {
	if (attachment.thumbs && attachment.thumbs.m) {
		var attachmentView = Titanium.UI.createView();
		var imageView = Titanium.UI.createImageView({
			image: attachment.thumbs.l
		});
		attachmentView.add(imageView);
		if (attachment.caption) {
			var captionView = Titanium.UI.createLabel({
				text: attachment.caption
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

createAttachmentViews(args.attachments);