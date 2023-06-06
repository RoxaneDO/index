// ANIMATION HEADER
$(document).ready(function(){
    var mouseX, mouseY, originX, originY, stockDiffX;
    var traX, mouseYtraY;

    originX = 0;
    originY = 0;
    // Get center circle coordonates
    const circleHeader = document.querySelector('#header-circle');
    const squareHeader = document.querySelector('#header-square');

    // Mouse animation
    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;

        if(originX > mouseX){
            var deplacement = (mouseX * 0.05) - 50
            originX = mouseX
            $(circleHeader).css('right', deplacement + 'px');
        }

        if(originX < mouseX){
            var deplacement = (mouseX * 0.05) - 50
            originX = mouseX
            $(circleHeader).css('right', deplacement + 'px');
        }

        if(originY < mouseY){
            var deplacement = (mouseY * 0.05) - 276
            originY = mouseY
            $(circleHeader).css('bottom', deplacement + 'px');
        }

        if(originY > mouseY){
            var deplacement = (mouseY * 0.05) - 276
            originY = mouseY
            $(circleHeader).css('bottom', deplacement + 'px');
        }
    })
});

// Key words banner
$(document).ready(function() {
    var containers = $('.scrolling-container');

    if (containers.length) {
        containers.each(function() {
            var container = $(this);

            // Support small text - copy to fill screen width
            if (container.find('.scrolling-text').outerWidth() < $(window).width()) {
                var windowToScrolltextRatio = Math.round($(window).width() / container.find('.scrolling-text').outerWidth()),
                    scrollTextContent = container.find('.scrolling-text .scrolling-text-content').text(),
                    newScrollText = '';
                for (var i = 0; i < windowToScrolltextRatio; i++) {
                    newScrollText += '' + scrollTextContent;
                }
                container.find('.scrolling-text .scrolling-text-content').text(newScrollText);
            }

            // Init variables and config
            var scrollingText = container.find('.scrolling-text'),
                scrollingTextWidth = scrollingText.outerWidth(),
                scrollingTextHeight = scrollingText.outerHeight(true),
                startLetterIndent = parseInt(scrollingText.find('.scrolling-text-content').css('font-size'), 10) / 4.8,
                startLetterIndent = Math.round(startLetterIndent),
                scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
                transformAmount = 0,
                leftBound = 0,
                rightBound = scrollAmountBoundary,
                transformDirection = container.hasClass('left-to-right') ? -1 : 1,
                transformSpeed = 200;

            // Read transform speed
            if (container.attr('speed')) {
                transformSpeed = container.attr('speed');
            }

            // Make scrolling text copy for scrolling infinity
            container.append(scrollingText.clone().addClass('scrolling-text-copy'));
            container.find('.scrolling-text').css({'position': 'absolute', 'left': 0});
            container.css('height', scrollingTextHeight);

            var getActiveScrollingText = function(direction) {
                var firstScrollingText = container.find('.scrolling-text:nth-child(1)');
                var secondScrollingText = container.find('.scrolling-text:nth-child(2)');

                var firstScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(1)').css("left"), 10);
                var secondScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(2)').css("left"), 10);

                if (direction === 'left') {
                    return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                } else if (direction === 'right') {
                    return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                }
            }

            $(window).on('wheel', function(e) {
                var delta = e.originalEvent.deltaY;

                if (delta > 0) {
                    // going down
                    transformAmount += transformSpeed * transformDirection;
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(10deg)');
                }
                else {
                    transformAmount -= transformSpeed * transformDirection;
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(-10deg)');
                }
                setTimeout(function(){
                    container.find('.scrolling-text').css('transform', 'translate3d('+ transformAmount * -1 +'px, 0, 0)');
                }, 10);
                setTimeout(function() {
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(0)');
                }, 500)

                // Boundaries
                if (transformAmount < leftBound) {
                    var activeText = getActiveScrollingText('left');
                    activeText.css({'left': Math.round(leftBound - scrollingTextWidth - startLetterIndent) + 'px'});
                    leftBound = parseInt(activeText.css("left"), 10);
                    rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;

                } else if (transformAmount > rightBound) {
                    var activeText = getActiveScrollingText('right');
                    activeText.css({'left': Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + 'px'});
                    rightBound += scrollingTextWidth + startLetterIndent;
                    leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
                }
            });
        })
    }
});

// MOUSE CIRCLE
// $(document).ready(function(){
//     const circle = document.getElementById('projects_circle');
//     const circleStyle = circle.style;
//     const projectsContainer = document.getElementById('projects');
//     const worksDiv = projectsContainer.querySelectorAll("div[type='button']");
//
//     document.addEventListener('mousemove', e => {
//         window.requestAnimationFrame(() => {
//             circleStyle.top = `${e.clientY - circle.offsetHeight/2}px`;
//             circleStyle.left = `${e.clientX - circle.offsetWidth/2}px`;
//         });
//     });
//
//     for(let i = 0; i<worksDiv.length; i++){
//         worksDiv[i].addEventListener('mouseover', () => {
//             circle.classList.add("zoom-circle-button");
//         })
//         projectsContainer.addEventListener('mouseout', () => {
//             circle.classList.remove("zoom-circle-button");
//         })
//     }
//
//     projectsContainer.addEventListener('mouseover', () => {
//         circle.classList.remove("d-none");
//     })
//
//     projectsContainer.addEventListener('mouseout', () => {
//         circle.classList.add("d-none");
//     })
// });

// NAVBAR
$(document).ready(function() {
    const nav = document.querySelector('#nav_container');

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 0){
            nav.classList.remove("nav-container-mid")
            nav.classList.add("nav-container-top")
        }
        if (scroll > 20){
            nav.classList.remove("nav-container-bot")
            nav.classList.remove("nav-container-top")
            nav.classList.add("nav-container-mid")
        }

        if ($(window).scrollTop() + $(window).height() > $(document).height() - 20){
            nav.classList.remove("nav-container-mid")
            nav.classList.add("nav-container-bot")
        }
    })
});


// VIEWPORT
var getElementsInArea = (function(docElm){
    var viewportHeight = docElm.clientHeight;

    return function(e, opts){
        var found = [], i;

        if( e && e.type == 'resize' )
            viewportHeight = docElm.clientHeight;

        for( i = opts.elements.length; i--; ){
            viewportHeight = docElm.clientHeight;
            var elm        = opts.elements[i],
                pos        = elm.getBoundingClientRect(),
                topPerc    = pos.top    / viewportHeight * 100,
                bottomPerc = pos.bottom / viewportHeight * 100,
                middle     = (topPerc + bottomPerc)/2,
                inViewport = middle > opts.zone[0] &&
                             middle < (100-opts.zone[1]);

            elm.classList.toggle(opts.markedClass, inViewport);

            var elmDetail   = elm.getElementsByClassName("project-detail")
            elmDetail[0].classList.toggle("opa-100", inViewport);

            if( inViewport )
                found.push(elm);
        }
    };
})(document.documentElement);

function f(e){
    getElementsInArea(e, {
        elements    : document.querySelectorAll('.project'),
        markedClass : 'highlight--1',
        zone        : [43, 43] // percentage distance from top & bottom
    });
}

window.addEventListener('scroll', f)
window.addEventListener('resize', f)


// PARALAX
function parallaxe(element, vitesse, direction)
{
    if( $(element).length > 0 )
    {
        var posY = $(element).css('top').split('px');
        var posY = parseFloat(posY[0]);

        var posX = $(element).css('left').split('px');
        var posX = parseFloat(posX[0]);

        $(window).scroll(function() {

            var scroll = $(window).scrollTop();

            switch( direction )
            {
                case 'top':
                    var deplacement = posY - (scroll * vitesse);
                    $(element).css('top', deplacement + 'px');
                break;

                case 'bottom':
                    var deplacement = posY + (scroll * vitesse);
                    $(element).css('top', deplacement + 'px');
                break;

                case 'left':
                    var deplacement = posX - (scroll * vitesse);
                    $(element).css('left', deplacement + 'px');
                break;

                case 'right':
                    var deplacement = posX + (scroll * vitesse);
                    $(element).css('left', deplacement + 'px');
                break;
            }
        });
    }

}
parallaxe('#whoiam_bg', 0.4, 'top');
parallaxe('#whoiam_bg', 0.2, 'right');
parallaxe('#header_square', 0.8, 'top');

// SCROLL SQUARE SKILLS
function paralaxeScale(element, vitesse){
    var transform = $(element).css('width').split('px');
    var width = parseFloat(transform[0]);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var varWidth = width + (scroll * vitesse);
        $(element).css('width', varWidth + 'px');
        $(element).css('height', varWidth + 'px');
    })
}
paralaxeScale('#skills_square', 0.4)
