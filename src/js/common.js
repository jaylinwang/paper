;(function () {
    $('[data-toggle="startSearch"]').on('click', function () {
        $('.search').addClass('active');
    });
    $('[data-toggle="closeSearch"]').on('click', function () {
        $('.search').removeClass('active');
    });
    $('.search-icon').on('click', function () {
        $('.search-form').submit();
    });
    $('.toc-icon').on('click', function () {
        if (!$('.toc').hasClass('active')) {
            $('.toc').addClass('active');
        } else {
            $('.toc').removeClass('active');
        }
    });
})();