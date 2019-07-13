//$('.carousel').carousel();
function scrollChangeNav() {
    if (window.scrollY > 10) {
        $('#nav').css('background-color', "rgba(182,182,182,1)");
    } else {
        $('#nav').css('background-color', "rgba(182,182,182,0.85)");
    }
}
$(document).ready(function () {
    var nav = $('#nav');
    $(this).scroll(scrollChangeNav);
    $('#hamburger').click(function () {
        $(this).css('display', 'none');
        $('#hamburger-close').css('display', 'block');
        $('.nav-item').css('display', 'block');
    });
    $('#hamburger-close').click(function () {
        $(this).css('display', 'none');
        $('#hamburger').css('display', 'flex');
        $('.nav-item').css('display', 'none');
    });
});