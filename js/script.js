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
                    newScrollText += ' ' + scrollTextContent;
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

// PROGRESS BAR
$(document).ready(function(e){
        var progressing = 0;
        var progressBar1 = document.querySelector('#projects_progressBar_1');
        var progressBar2 = document.querySelector('#projects_progressBar_2');
        var progressBar3 = document.querySelector('#projects_progressBar_3');

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var distanceToTop = window.pageYOffset;
        var keywords = document.querySelector('#keywords').getBoundingClientRect();
        var projects = document.querySelector('#projects').getBoundingClientRect();
        var projectsTitle = document.querySelector('#projects_title').getBoundingClientRect();
        var projectsContainer = document.querySelector('#projects_container').getBoundingClientRect();

        var progressBar1_bottom = progressBar1.getBoundingClientRect().bottom;
        var progressBar2_bottom = progressBar2.getBoundingClientRect().bottom;
        var progressBar3_bottom = progressBar3.getBoundingClientRect().bottom;

        // STARTING PRONGRESSBAR IN END OF KEYWORD DIV
        if(keywords.bottom > 0){
            $('#projects_progressBar_1').css('height', 0 + '%');
        }
        if(keywords.bottom <= 0){
            progressing = Math.abs(keywords.bottom*0.25)
            $('#projects_progressBar_1').css('height', progressing + '%');
            if(progressing > 101) {
                $('#projects_progressBar_1').css('height', 100 + '%');
            }
        }

        const project1 = document.querySelector('#project1')
        const project2 = document.querySelector('#project2')
        const project3 = document.querySelector('#project3')
        const project4 = document.querySelector('#project4')
        // const project5 = document.querySelector('#project5')
        // const project6 = document.querySelector('#project6')

        //var isOnProject1 = throwProject(distanceToTop, project1.getBoundingClientRect(), progressBar1_bottom, 0)
        //console.log("isOnProject1", isOnProject1)
        //
        //
        //var isComingOnProject2 = throwProject(distanceToTop, project2.getBoundingClientRect(), progressBar1_bottom, 10)
        //progressingBar(isOnProject1, isComingOnProject2, progressBar2, 0.25);


        var isOnProject2 = throwProject(distanceToTop, project2.getBoundingClientRect(), progressBar2_bottom, 0)
        console.log("isOnProject2", isOnProject2)
        // var isComingOnProject3 = throwProject(distanceToTop, project3.getBoundingClientRect(), progressBar2_bottom, 10)
        // progressingBar(isOnProject2, isComingOnProject3, progressBar3, 0.25);


        // var isOnProject3 = throwProject(distanceToTop, project3.getBoundingClientRect(), progressBar3_bottom, 10)



        // var isOnProject4 = throwProject(distanceToTop, project4.getBoundingClientRect(), progressBar3_bottom, 10)
        // var isOnProject5 = throwProject(distanceToTop, project5.getBoundingClientRect(), progressBar4_bottom, 10)
        // var isOnProject6 = throwProject(distanceToTop, project6.getBoundingClientRect(), progressBar5_bottom, 10)



        // progressingBar(isOnProject3, isOnProject4, progressBar3, 0.25);
        // progressingBar(isOnProject3, isOnProject4, progressBar4, 0.25);
        // progressingBar(isOnProject4, isOnProject5, progressBar5, 0.25);
        // progressingBar(isOnProject5, isOnProject6, progressBar6, 0.25);


        if(isOnProject1){
            displayNone($(".project-detail", "#project1"), $(".project-detail", "#project2"), $(".project-detail", "#project2"))
        }
        if(isComingOnProject2){
            displayNone($(".project-detail", "#project2"), $(".project-detail", "#project1"), $(".project-detail", "#project3"))
        }
        if(isComingOnProject3){
            displayNone($(".project-detail", "#project3"), $(".project-detail", "#project2"), $(".project-detail", "#project4"))
        }
        // if(isOnProject4){
        //     displayNone($(".project-detail", "#project4"), $(".project-detail", "#project3"), $(".project-detail", "#project5"))
        // }
        // if(isOnProject5){
        //     displayNone($(".project-detail", "#project5"), $(".project-detail", "#project4"), $(".project-detail", "#project6"))
        // }
        // if(isOnProject6){
        //     displayNone($(".project-detail", "#project6"), $(".project-detail", "#project5"), $(".project-detail", "#project5"))
        // }
    });

    function displayNone(projectOpen, projectClose1, projectClose2){
        projectClose1.addClass("d-none");
        projectClose2.addClass("d-none");
        projectOpen.removeClass("d-none");
        projectOpen.addClass("d-block");
    }

    function progressingBar(isBefore, isStart, progressBar, vitesse){
        var progress;
        if(isBefore){
            var progress = 0
            $(progressBar).css('height', 0 + '%');
        }
        if(isStart){
            progressing++
            $(progressBar).css('height', progressing*vitesse + '%');
            if(progressing*vitesse > 101) {
                $(progressBar).css('height', 100 + '%');
            }
        }
    }

    function throwProject(distanceToTop, project, progressBar, range){
        console.log("top ", (Math.ceil(distanceToTop + project.top) - range) )
        console.log("bottom ", (Math.ceil(distanceToTop + project.bottom) + range) )
        console.log("progressBar ", Math.ceil(distanceToTop + progressBar) )
        console.log("cond1", ((Math.ceil(distanceToTop + project.top) - range) <= Math.ceil(distanceToTop + progressBar)))
        console.log("cond2", (Math.ceil(distanceToTop + project.bottom) + range > Math.ceil(distanceToTop + progressBar)))
        return ((Math.ceil(distanceToTop + project.top) - range) <= Math.ceil(distanceToTop + progressBar)) && (((Math.ceil(distanceToTop + project.bottom) + range) >= Math.ceil(distanceToTop + progressBar)))
    }
})

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
parallaxe('#triangle', 0.4, 'top');
parallaxe('#triangle', 0.2, 'right');
parallaxe('#header-square', 0.8, 'top');

// SCROLL SQUARE
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
