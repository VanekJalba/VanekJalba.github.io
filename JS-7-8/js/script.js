$(function() {
    var $title = $('.tabs').find('.title');
    var num = 1;
    $title.click(function() {
            if (num != ($(this).attr('data-num'))) {
                toggle(num);
                num = $(this).attr('data-num');
                toggle(num);

                function toggle(num) {
                    var $title = $('.title__container').find('[data-num="' + num + '"]');
                    $title.toggleClass('title-active');
                    var $article = $('.article__container').find('[data-num="' + num + '"]');
                    $article.toggleClass('article-active');
                }
            }
        })
        

    var hover;
    var focus;
    var $form = $('.inputs__container');
    var $inputs = $form.find('input');
    $inputs.attr('hover', '0');
    $inputs.attr('focus', '0');
    

    $inputs.each(function() {
            var $elem = $(this);
            var tooltipText = ('<span>' + $elem.attr('tooltip') + '</span>');
            $elem.parent().append(tooltipText);
            $elem.next('span').hide().addClass('tooltip');
        })
        
    $inputs.hover(function() {
            $('.tooltip').stop(false, true);
            hover = +$(this).attr('hover');
            focus = +$(this).attr('focus');
            if (focus === 0) {
                addTooltip($(this));
            }
            $(this).attr('hover', '1');
        },
        
        function() {
            hover = +$(this).attr('hover');
            focus = +$(this).attr('focus');
            if (focus === 0) {
                removeTooltip($(this));
            }
            $(this).attr('hover', '0');
        });
    
    $inputs.focus(function() {
        hover = +$(this).attr('hover');
        focus = +$(this).attr('focus');
        if (hover === 0) {
            addTooltip($(this));
        }
        $(this).attr('focus', '1');
    });

    
    $inputs.blur(function() {
        hover = +$(this).attr('hover');
        focus = +$(this).attr('focus');
        if (hover === 0) {
            removeTooltip($(this));
        }
        $(this).attr('focus', '0');
    })
    $('.reg .showAllTooltip').click(showAllTooltip);

    function addTooltip($elem) {
        $elem.next('.tooltip').animate({
            opacity: 'show'
        }, 300);
    }

    function removeTooltip($elem) {
        $elem.next('.tooltip').animate({
            opacity: 'hide'
        }, 300);
    }

    function showAllTooltip() {
        $('.tooltip').stop(false, true);
        $inputs.each(function() {
            var arg = $(this);
            addTooltip(arg);
        })
        $inputs.attr('hover', '1');
    }
});
