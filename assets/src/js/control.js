(function ($) {
    var totopToggle = '[data-toggle="totop"]',
        sidebarToggle = '[data-toggle="sidebar"]',
        menuToggle = '[data-toggle="menu"]';

    var toTop = function () {
        $('html, body').animate({scrollTop: 0}, 200);
    }

    var toggleSidebar = function (e) {
        $('body').toggleClass('fold');
    }

    var toggleMenu = function (event) {
        var $target = $(event.target).closest('[data-toggle="menu"]'),
            $toggleTarget = $($target.data('target'));

        $toggleTarget.toggleClass('open');
    }

    $(document).on('click.totopToggle', totopToggle, toTop);
    $(document).on('click.sidebarToggle', sidebarToggle, toggleSidebar);
    $(document).on('click.menuToggle', menuToggle, toggleMenu);

}(jQuery));