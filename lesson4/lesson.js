(function ($) {
    $(function () {
        // По-умолчанию делаем активной первую вкладку
        $('.tabs__caption li').eq(0).addClass('active');
        $('div.tabs__content').eq(0).show();
        $('ul.tabs__caption').on('click', 'li', function(event) {
            $('.tabs__caption li').removeClass('active');
            $(this).addClass('active');
            $('div.tabs__content').hide().eq($(this).index()).show();
            event.preventDefault();
        })
    })
})(jQuery);