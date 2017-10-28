$(function() {
/* Clear defualt */
    // $('link[rel="stylesheet"]').first().remove();
    // $('#sideMenu').remove();
    // $('.pop_why_cover').remove();
    // $('.pop_why_box').remove()
    // $("p:last").remove()


/* General */

    

    $('#to-top').click(function(event) {
        $('html, body').animate({'scrollTop': 0}, 400);
    });

    let tiemline_item = $('.timeline li');
    $(tiemline_item).click(function(e) {
        e.preventDefault();
        $(this).next('.detail').slideToggle(400);
        $(this).toggleClass('detail-opened');
    });
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
            $('#to-top').removeClass('exit-motions')
        }else{
            $('#to-top').addClass('exit-motions');
        }
        for (var i = 0; i < tiemline_item.length; i++) {
            if (isElementInViewport(tiemline_item[i]) && $(tiemline_item[i]).parents('article').css('display') != 'none') {
                $(tiemline_item[i]).addClass('inview');
            } else if($(tiemline_item[i]).parents('article').css('display') == 'none') {
                $(tiemline_item[i]).removeClass('inview');
            }
        }
        if($('#page__drawer-mobile-container').css('display') == 'none') {
            if ($('.page__article:visible').offset().top - $(this).scrollTop() < $('.mdc-toolbar').height() + $('.mdc-toolbar').position().top) {
                $('.page__drawer').css({
                    'position': 'fixed',
                    'top': $('.mdc-toolbar').height() + $('.mdc-toolbar').position().top +  'px'
                });
                $('.page__article').css({
                    'left': $('.page__drawer').outerWidth(true)+ 5 +'px',
                });
            }else{
                $('.page__drawer').css({
                    'position': 'relative',
                    'top': 0
                });
                $('.page__article').css({
                    'left': '0',
                });
            }
        }else{
            $('.page__article').css({
                    'position': 'relative',
                    'left': '0',
                });
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

    $('.sub-nav').prev('a').click(function(event) {
        event.preventDefault();
        $(this).children('.multi-nav-icon').toggleClass('multi-nav-icon-rotate');
        $(this).next('nav').slideToggle();
    });


/* NoteBook */
    $('.notebook .mdc-list-item').click(function() {
        $(this).next('.detail').slideToggle(400);
        $(this).toggleClass('mdc-list-item--opened');
    });

/* Page */
    var tab_bar;
    if ($('.page__drawer-mobile').length > 0) {
       tab_bar  =  mdc.tabs.MDCTabBar.attachTo($('#mdc-tab-bar')[0]);
    }
    // Generate article's head link
    if($('.tabs').length > 0) {
        $('.tabs a:eq(0)').addClass('tab_actived');
        $('.page__article:gt(0)').slideUp(0);
    }
    page_drawer();
    
    $('.tabs a').click(function(e) {
        e.preventDefault();
        $('.tab_actived').removeClass('tab_actived');
        $(this).addClass('tab_actived');
        let target = $(this).attr('href');
        $(target).siblings('article:visible').slideUp(400, function () {
            $(target).slideDown(800);
            page_drawer();
        });
        
        
    });
    function page_drawer() {
        if ($('#temp-page-list-desktop').length > 0) {
            let temp_page_list_desktop = document.querySelector('#temp-page-list-desktop').content;
            let temp_page_list_mobile = document.querySelector("#temp-page-list-mobile").content;
    
            let temp_desktop = temp_page_list_desktop.querySelector('.page__drawer-list__item');
            let temp_mobile = temp_page_list_mobile.querySelector('.mdc-tab');
    
            $('.page__drawer-list li').remove();
            $('.page__drawer-mobile a').remove();
            $('.page__article:visible').children('h1').map(function(index) {
                let id = 'page__article__headline-' + index;
                $(this).attr('id', id);
    
                $(temp_desktop).children().attr('href', '#' + id).text($(this).text());
                $(temp_mobile).attr('href', '#' + id).text($(this).text());
    
                let item_desktop = document.importNode(temp_desktop, true);
                let item_mobile = document.importNode(temp_mobile, true);
    
                $('.page__drawer-list').append(item_desktop);
                $('.page__drawer-mobile').append(item_mobile);
            });
            tab_bar.root_ = null;
            tab_bar.constructor($('#mdc-tab-bar')[0]);
            tab_bar_scroll();
        }
    }
    

    $('.page__drawer-list__link').first().addClass('page__drawer-list__link--active');

    function tab_bar_scroll() {
            // Fix article's head link target offset
        $('.page__drawer-list__link').click(function(event) {
            event.preventDefault();
            $('.page__drawer-list__link--active').removeClass('page__drawer-list__link--active');
            $(this).addClass('page__drawer-list__link--active');
            let target = $(this).attr('href');
            let top = $(target).offset().top - $('.mdc-toolbar').height() - 24;
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
    }
    tab_bar_scroll();
    // Ripple effect
    $('.mdc-ripple-surface').map(function() {
        mdc.ripple.MDCRipple.attachTo(this);
    });

});

