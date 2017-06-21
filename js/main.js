$(function() {
/* General */
    // Ripple effect
    $('.mdc-ripple-surface').map(function() {
        mdc.ripple.MDCRipple.attachTo(this);
    });

    $(window).scroll(function() {
        if($(this).scrollTop()>100){
            $('#to-top').fadeIn("400");
        }else{
            $('#to-top').fadeOut("400");
        }
    });
    $('#to-top').click(function(event) {
        $('html, body').animate({'scrollTop': 0}, 400);
    });

/* Navigation */
    let drawer = new mdc.drawer.MDCTemporaryDrawer($('.mdc-temporary-drawer')[0]);
    $('.menu').click(function() {
        drawer.open = !drawer.open;
    });

/* Page */
    // Generate article's head link
    if ($('#temp-page-list').length > 0) {
        let temp_page_list = document.querySelector('#temp-page-list').content;
        let temp = temp_page_list.querySelector('.page__drawer-list__item');
        $('.page__article').children('h1, h2, h3, h4, h5').map(function(index) {
            let id = 'page__article__headline-' + index;
            $(this).attr('id', id);
            $(temp).children().attr('href', '#' + id).text($(this).text());
            let item = document.importNode(temp, true);
            $('.page__drawer-list').append(item);
        });
    }
    

    // Fix article's head link target offset
    $('.page__drawer-list__link').click(function(event) {
        event.preventDefault();
        $('.page__drawer-list__link--active').removeClass('page__drawer-list__link--active');
        $(this).addClass('page__drawer-list__link--active');

        let target = $(this).attr('href');
        let top = $(target).offset().top - $('.mdc-toolbar').height();
        $('html, body').animate({scrollTop:top}, 400);
    });



});
