(function ($) {
	$.get(ghost.url.api('posts', { fields: "id" })).done(function (data) {
		var postCount = data.posts.length;
		$('[data-toggle="postcount"]').text(postCount);
	}).fail(function (err) {
		console.log(err);
	});

	$.get(ghost.url.api('tags', { fields: "id" })).done(function (data) {
		var tagCount = data.tags.length;
		$('[data-toggle="tagcount"]').text(tagCount);
	}).fail(function (err) {
		console.log(err);
	});

	$.get(ghost.url.api('users', { fields: "id" })).done(function (data) {
		var userCount = data.users.length;
		$('[data-toggle="usercount"]').text(userCount);
	}).fail(function (err) {
		console.log(err);
	});
} (jQuery));