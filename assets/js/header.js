var getnav=1;
var currentlyopen=2;
var menustatus=0;
var menuclick=0;
var parentli=""
$(".primary-navbar ul li a").click(function() {
    if(currentlyopen=="#nav-7"){
        heartbubble(1); 
    }
    $(".primary-navbar ul li").removeClass("active");
    parentli=$(this).parent();
    setTimeout(function(){
        menuclick = 1;
    },50);
    
    
    getnav = "#" + $(this).attr("data-nav-link");
    console.log(getnav + " / " + currentlyopen);
    if(getnav==currentlyopen){
        menustatus=0;
        $(".sub-navigation").css("top","-200px");
        setTimeout(function(){
            $(".sub-nav").css("display","none");
        },250);
    }else{
        menustatus=1;
        if(currentlyopen==2){
            $(".sub-navigation").css("top","50px");
            $(getnav).css("display","block");
        }else{
            $(".sub-navigation").css("top","-200px");
            setTimeout(function(){
                $(".sub-nav").css("display","none");
                $(getnav).css("display","block");
                $(".sub-navigation").css("top","50px");
            },250)
        }
        if (getnav == "#nav-7") {
                heartbubble(1);
            }
        setTimeout(function(){
            parentli.addClass("active");
        },0);
        //$(".sub-navigation").css("top","50px");
        //$(".sub-nav").css("display","none");
        //$(getnav).css("display","block");
    }
    if(menustatus==1){
        currentlyopen=getnav;
    }else{
        currentlyopen=2;
    }
});

function removesubnav(){
    $(".primary-navbar ul li").removeClass("active");
    $(".sub-navigation").css("top","-200px");
    setTimeout(function(){
        $(".sub-nav").css("display","none");
        if(currentlyopen=="#nav-7"){
        heartbubble(1); 
        currentlyopen=2;
    }
    },250);
}

/*function removesubnav() {
    $(".sub-navigation").css({
        "display": "none"
    });
    $(".primary-navbar ul li").removeClass("active");
    setTimeout(function() {
        $(".sub-nav").css("margin-top","-200px");
        //$(getnav).hide();
    }, 250);
    getnavbackup = "";
}

function opensubnav(n) {
    alert(n);
    $(".sub-navigation").css({
        "top": "50px"
    });
}

$('.primary-navbar ul a').click(function() {
    $('.primary-navbar ul').removeClass('mobile');
});


var getnav = 1;
var getnavbackup = 2;
var menuclick = 0;

$(".primary-navbar ul li a").click(function() {
    getnav = "#" + $(this).attr("data-nav-link");
    tp = $(this).parent();
    console.log(getnav + " / " + getnavbackup);
    if(getnav==getnavbackup){
        removesubnav();
        console.log("just close");
    }else{
        console.log("close/open");
        //removesubnav();
        setTimeout(function() {
        console.log( "showing:" + getnav);
        $(".sub-navigation").css({"top": "50px"});
        //$(getnav).show();
        if (getnav == "#nav-7") {
                heartbubble(1);
        }
        alert(tp);
        tp.addClass("active");
        },300);
    }
    getnavbackup = getnav;
        /*setTimeout(function() {
            $(".primary-navbar ul li").removeClass("active");
            $(".sub-nav").hide();
            if (getnav == "#nav-7") {
                heartbubble(1);
            }
            if (getnav != getnavbackup) {
                setTimeout(function() {
                    tp.addClass("active")
                    $(getnav).css({
                        "display": "block"
                    });
                    $(".sub-navigation").css({
                        "top": "50px"
                    });
                    menuclick = 1;
                }, 300);
                getnavbackup = getnav;
            } else {
                getnavbackup = "";
            }       
        }, 250);
    //}
});
*/
function heartbubble(n) {
    if (n == 1) {
        target = ".favorites";
    }
    if (n == 2) {
        target = ".mfavorites";
    }
    var heartx = $(target + " .heart.original").offset().left+1;
    var hearty = 16; //$(target+" .heart.original").offset().top;
    $(target).prepend("<svg style='top:" + hearty + "px; left:" + heartx +
        "px;'  class='icon heart heart-fadeout' title='Favorites' role='image'><use xlink:href='assets/svg/svg-symbols.svg#icon-heart'></use></svg>"
    );
    //$(".heart-fadeout").animate({'height':'48px','width':'48px',"top":((hearty-42)+"px"),"left":((heartx-12)+"px"),"opacity":"0"},500);   
    if ($(window).width() > 504) {
        heartx1 = heartx - 2;
    } else {
        heartx1 = heartx - 1;
    }
    $(".heart-fadeout").animate({
        'top': hearty - 3,
        'left': heartx1,
        'height': '1.5em',
        'width': '1.6em'
    }, 100);
    setTimeout(function() {
        $(".heart-fadeout").animate({
            'top': hearty,
            'left': heartx,
            'height': '1.2em',
            'width': '1.4em'
        }, 100);
    }, 150);
    setTimeout(function() {
        $(".heart-fadeout").animate({
            'top': hearty - 3,
            'left': heartx1,
            'height': '1.5em',
            'width': '1.6em'
        }, 100);
    }, 300);
    setTimeout(function() {
        $(".heart-fadeout").animate({
            'top': hearty,
            'left': heartx,
            'height': '1.2em',
            'width': '1.4em'
        }, 100);
    }, 450);
    setTimeout(function() {
        $(".heart-fadeout").remove();
    }, 650);
}
$(document).click(function() {
    menuclick = 2;
    setTimeout(function() {
        
        if (menuclick == 2) {
            removesubnav();
        }
    }, 300);
});
navname = 1;
backupnavname = 2;
$("#mobile-nav a.haschild").click(function() {
    //$(".sub-navigation .subheader").remove();
    navname = "#" + ($(this).attr("data-nav-link"));
    $(".placeholders").hide();
    $("#mobile-nav li a").removeClass("active");
    $("#mobile-nav #menu1 li").css({
        "height": 48,
        "overflow-y": "auto"
    });
    $(".subheader-links").fadeOut();
    console.log("Closing");
    console.log(navname + "/ " + backupnavname);
    if (navname != backupnavname) {
        console.log("Opening");
        $(this).addClass('active');
        $(this).parent().append("<div class='subheader-links'>" + $(
            navname).html() + "</div>");
        targetname = $(this).siblings(".subheader-links");
        targetparent = $(this).parent();
        setTimeout(function() {
            heightval = $(targetname).height() + 68;
            console.log(targetparent);
            $(targetparent).css("height", heightval + "px");
        }, 10);
        backupnavname = navname;
    } else {
        backupnavname = "";
    }
});

function removenavpanel() {
    $(navname).animate({
        "right": "-100%"
    }, 250);
}

function removemobilenav() {
    navmenuopen = 0;
    $('#mobile-nav').fadeOut(250);
    $("body").css({
        "overflow": "auto"
    });
}
var navmenuopen = 0;
var backupn = 0;
$('.menu-icon').click(function() {
    openmenu(1);
});
$('.search-icon').click(function() {
    openmenu(2);
});

function openmenu(n) {
    if (n == 1) {
        console.log("Show 1");
        $("#menu1").show();
        $("#menu2").hide();
        $(".menu-icon").addClass("active");
    } else {
        console.log("Show 2");
        $("#menu2").show();
        $("#menu1").hide();
        $(".menu-icon").removeClass("active");
        heartbubble(2);
    }
    if (n == backupn) {
        if (navmenuopen != 1) {
            $('#mobile-nav').fadeIn(250);
            navmenuopen = 1;
            $("body").css({
                "overflow": "hidden"
            });
        } else {
            $('#mobile-nav').fadeOut(250);
            navmenuopen = 0;
            $("body").css({
                "overflow": "auto"
            });
            $(".menu-icon").removeClass("active");
        }
    } else {
        $('#mobile-nav').fadeIn(250);
        $("body").css({
            "overflow": "hidden"
        });
        navmenuopen = 1;
    }
    backupn = n;
}
$(function() {
    if ($(window).width() > 969) {
        marleft = $(".primary-navbar ul").offset().left - $(".primary-navbar .container").offset().left;
        $(".sub-navigation .sub-nav .wrapper").css({
            "margin-left": marleft
        });
    }
});
$(document).scroll(function() {
    removesubnav();
    if ($(window).width() > 767) {
        if ($(document).scrollTop() > 100) {
            $('.cars-logo-img').css('opacity', 0);
            $('.primary-navbar a.logo').css('top', '-10px');
        }
        if ($(window).width() == 768) {
            if ($(document).scrollTop() > 100) {
                $('.cars-logo-img').css('opacity', 0);
                $('.primary-navbar a.logo').css('top', '-4px');
            }
        }
        if ($(document).scrollTop() < 100) {
            $('.cars-logo-img').css('opacity', 1);
            $('.primary-navbar a.logo').css('top', '7px');
        }
    } else {
        if ($(document).scrollTop() > 100) {
            $('.cars-logo-img').css('opacity', 0);
            $('.primary-navbar a.logo').css('top', '-30px');
        }
        if ($(document).scrollTop() < 100) {
            $('.cars-logo-img').css('opacity', 1);
            $('.primary-navbar a.logo').css('top', '-14px');
        }
    }
});
$(".main-header").css({
    "position": "fixed",
    "top": "0",
    "width": "100%"
});
var lastScrollTop = 0;
$(window).scroll(function() {
    //if($(window).width()>767){
    var st = $(window).scrollTop();
    if ((st > 60) && (st > lastScrollTop)) {
        $(".main-header").css({
            "opacity": "0",
            "top": "-100px"
        });
        $(".overview-stuck").css({ 
            "padding-top": "0", 
            "top": "0px" 
        }); 

        $(".nav-main-menu").css({"padding-top":"0","top":"0px"});
        console.log("hide");
    } else {
        $(".main-header").css({
            "opacity": "1",
            "top": "0px"
        });
        $(".overview-stuck").css({
            "top": "50px"
        });
        $(".nav-main-menu").css({"padding-top":"0px","top":"50px"});
        console.log("show");
    }
    lastScrollTop = st;
    //}
});