(function ($) {
	var postTotals = (function () {
		var total = 0;
		$('#TagCloud>a').each(function () {
			total += $(this).data('posts-count');
		});
		return total;
	} ());

	$('#TagsCount').text(postTotals);

	// $('#TagCloud>a').each(function () {
	// 	var $this = $(this),
	// 		postCount = $(this).data('posts-count');
	// 	console.log(parseInt('55595c',10));
	// 	console.log();
	// 	$this.css('font-size',Math.floor(12+(postCount/postTotals)*12)+'px');
	// 	$this.css('color')
	// });
} (jQuery));