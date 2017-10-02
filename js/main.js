$(function() {
/* General */

    $('#to-top').click(function(event) {
        $('html, body').animate({'scrollTop': 0}, 400);
    });

    let time_line_li = $('.timeline li');
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    function callback(){
        // to-top button
        if($(this).scrollTop()>100){
            $('#to-top').fadeIn("400");
        }else{
            $('#to-top').fadeOut("400");
        }
        for (var i = 0; i < time_line_li.length; i++) {
            if (isElementInViewport(time_line_li[i])) {
                $(time_line_li[i]).addClass('inview');
            }
        }

    }

    $(window).scroll(function() {
        callback();
    });
    $(window).resize(function() {
        callback();
    });
    $(window).load(function() {
        callback();
    });

/* Navigation */
    let drawer = new mdc.drawer.MDCTemporaryDrawer($('.mdc-temporary-drawer')[0]);
    $('.menu').click(function() {
        drawer.open = !drawer.open;
    });

/* Page */
    // Generate article's head link
    if ($('#temp-page-list-desktop').length > 0) {
        let temp_page_list_desktop = document.querySelector('#temp-page-list-desktop').content;
        let temp_page_list_mobile = document.querySelector("#temp-page-list-mobile").content;

        let temp_desktop = temp_page_list_desktop.querySelector('.page__drawer-list__item');
        let temp_mobile = temp_page_list_mobile.querySelector('.mdc-tab');


        $('.page__article').children('h1, h2').map(function(index) {
            let id = 'page__article__headline-' + index;
            $(this).attr('id', id);

            $(temp_desktop).children().attr('href', '#' + id).text($(this).text());
            $(temp_mobile).attr('href', '#' + id).text($(this).text());

            let item_desktop = document.importNode(temp_desktop, true);
            let item_mobile = document.importNode(temp_mobile, true);

            $('.page__drawer-list').append(item_desktop);
            $('.page__drawer-mobile').append(item_mobile);
        });
    }
    

    $('.page__drawer-list__link').first().addClass('.page__drawer-list__link--active');
    // Fix article's head link target offset
    $('.page__drawer-list__link').click(function(event) {
        event.preventDefault();
        $('.page__drawer-list__link--active').removeClass('page__drawer-list__link--active');
        $(this).addClass('page__drawer-list__link--active');
        let target = $(this).attr('href');
        let top = $(target).offset().top - $('.mdc-toolbar').height();
        $('html, body').animate({scrollTop:top}, 400);
    });
    $('.page__drawer-mobile .mdc-tab').click(function(event) {
        event.preventDefault();
        $('.mdc-tab--active').removeClass('mdc-tab--active').attr('style','');
        $(this).addClass('mdc-tab--active');
        let target = $(this).attr('href');
        let top = $(target).offset().top - $('.mdc-toolbar').height() - $('#mdc-tab-bar').height();
        $('html, body').animate({scrollTop:top}, 400);
    });
    // Ripple effect
    $('.mdc-ripple-surface').map(function() {
        mdc.ripple.MDCRipple.attachTo(this);
    });
    mdc.tabs.MDCTabBar.attachTo(document.querySelector('#mdc-tab-bar'));
    // mdc.tabs.MDCTabBarScroller.attachTo(document.querySelector('#mdc-tab-bar'));
});

