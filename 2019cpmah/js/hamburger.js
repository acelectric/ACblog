//$('.carousel').carousel();

$(document).ready(function () {
    var nav = $('#nav');
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