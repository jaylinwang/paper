(function ($) {
	hljs.initHighlightingOnLoad();

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
	$.get(ghost.url.api('users/1')).done(function (data) {
		var user = data.users[0];
		$('[data-toggle="userimage"]').attr('src', user.image);
		$('[data-toggle="username"]').text(user.name.toUpperCase());
		$('[data-toggle="userlocation"]').text(user.location);
		$('[data-toggle="userbio"]').text(user.bio);
	}).fail(function (err) {
		console.log(err);
	});
} (jQuery));