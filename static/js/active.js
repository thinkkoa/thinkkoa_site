
var $, jQuery;

(function ($) {
    'use strict';
    
    var window_width =  $(window).width();
    
    
    function sliders() {
        if($.fn.owlCarousel){
            
            // brand slider

            var brand_slider = $('.brand_slider');
            brand_slider.owlCarousel({
                margin: 30,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });


            // featured slider

            var featured_slider = $('.featured_slider');
            featured_slider.owlCarousel({
                margin: 30,
                items: 6,
                dots: false,
                nav: false,
                responsive: {
                    0: {
                        items: 2,
                        margin: 15
                    },
                    768: {
                        items: 4
                    },
                    992: {
                        items: 6
                    }
                }
            });

        }

    }

    function plugins() {
    //    prettyphoto
        if(window_width > 767 && $.fn.prettyPhoto){
            $("a[data-rel^='prettyPhoto']").prettyPhoto();
        }else{
            $("a[data-rel^='prettyPhoto']").attr('target', '_blank');
        }

    //    stellar
        if($.fn.stellar){
            jQuery(window).stellar();
        }
        

    //    slickNav
        if($.fn.slicknav){
            $('.menu').slicknav({
                label: '',
                prependTo:'nav'
            });
        }

    //    parallax

        if($.fn.parallax){
            $('.scene').parallax({
                limitX: 90,
                limitY: 90,
            });
        }

    //    counterup
        if($.fn.counterUp){
            $('.count').counterUp({
                delay: 10,
                time: 2000
            });
        }

    //    onepagenav
        if($.fn.onePageNav){
            $('ul.menu, .slicknav_nav').onePageNav({
                currentClass: 'current-menu-item',
                scrollSpeed: 750,
                easing: 'swing'
            });
        }

    }

    function custom() {
            $('.loader_wrep').css('opacity', '.7');

            $('.sub-menu').siblings('a').addClass('sub-siblings');

            $('.top_scrl').on('click', function (event) {
                event.preventDefault();
                $("html, body").animate({scrollTop: 0}, "slow");
            });

            $("a[href='#']").on('click', function ($) {
                $.preventDefault();
            });

            $(window).on('scroll',function(){
                if($(window).scrollTop()>100){
                    $('header').addClass('sticky');
                }
                else{
                    $('header').removeClass('sticky');
                }
            });

            var header_hei = $('header').height();
            $('.sticky-anchor').height(header_hei);
    }

    function animation_time() {
        $(".animated").each(function () {
            var dur = $(this).attr("data-duration");
            var dly = $(this).attr("data-delay");

            if(dur != ""){
                $(this).css('animation-duration', dur);
            }
            if(dly != ""){
                $(this).css('animation-delay', dly);
            }
        });
    }

    function animation() {
        if($.fn.waypoint){
            $('.a_fu').css('opacity','0');
            $('.a_fu').waypoint(function () {
                $(this).addClass('fadeInUp');
                $('.a_fu.fadeInUp').css({
                    opacity: 1
                });
            }, {
                offset: '90%'
            });

            $('.a_fl').css('opacity','0');
            $('.a_fl').waypoint(function () {
                $(this).addClass('fadeInLeft');
                $('.a_fl.fadeInLeft').css({
                    opacity: 1
                });
            }, {
                offset: '90%'
            });

            $('.a_fr').css('opacity','0');
            $('.a_fr').waypoint(function () {
                $(this).addClass('fadeInRight');
                $('.a_fr.fadeInRight').css({
                    opacity: 1
                });
            }, {
                offset: '90%'
            });

            $('.a_sl').css('opacity','0');
            $('.a_sl').waypoint(function () {
                $(this).addClass('slideInLeft');
                $('.a_sl.slideInLeft').css({
                    opacity: 1
                });
            }, {
                offset: '90%'
            });

            $('.a_sr').css('opacity','0');
            $('.a_sr').waypoint(function () {
                $(this).addClass('slideInRight');
                $('.a_sr.slideInRight').css({
                    opacity: 1
                });
            }, {
                offset: '90%'
            });
        }
    }

    function configure_height() {

        if(window_width < 992){
            var home_img = $('.home_img');
            var home_img_wrap_width = home_img.width();
            var home_img_width = $('.home_img img:first-child').width();
            var home_img_pad = (home_img_wrap_width - home_img_width) / 2;
            home_img.find('img').css('padding', '0 ' + home_img_pad + 'px');
        }

        if(window_width > 991){
            var home_col = -1;
            $('.home_col').each(function () {
                if ($(this).height() > home_col) {
                    home_col = $(this).height();
                }
            });
            $('.home_col').height(home_col);


            var feature_col = -1;
            $('.features > div').each(function () {
                if ($(this).height() > feature_col) {
                    feature_col = $(this).height();
                }
            });
            $('.features > div').height(feature_col);

            var counter_col = -1;
            $('.counter_col').each(function () {
                if ($(this).height() > counter_col) {
                    counter_col = $(this).height();
                }
            });
            $('.counter_col > div').height(counter_col);

            $('.product_area .row').each(function () {
                var product_col = -1;
                $(this).children('.product_col').each(function () {
                    if ($(this).height() > product_col) {
                        product_col = $(this).height();
                    }
                });
                $(this).children('.product_col').height(product_col);
            });
        }
    }

    function preloader() {
        $('.loader_wrep').fadeOut(2000);
    }
    
    $(document).ready(function () {
        
        sliders();
        plugins();
        custom();
        animation_time();
    });
    
    $(window).load(function () {
        animation();
        configure_height();
        preloader();
    });

})(jQuery);