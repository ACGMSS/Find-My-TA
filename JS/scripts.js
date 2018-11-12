function windowcheck() {
    if (($(window).height() > $(window).width()*0.9) || ($(window).width() < 800)) {
        $(view1).removeClass("leftwindow");
        $(view2).removeClass("rightwindow");
        $(view1).addClass("topwindow");
        $(view2).addClass("botwindow");
    }
    else {
        $(view1).addClass("leftwindow");
        $(view2).addClass("rightwindow");
        $(view1).removeClass("topwindow");
        $(view2).removeClass("botwindow");
    }
}