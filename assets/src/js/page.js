(function ($) {
	hljs.initHighlightingOnLoad();

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