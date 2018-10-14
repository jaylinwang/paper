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
})();
