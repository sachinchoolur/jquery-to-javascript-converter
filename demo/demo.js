const $ = $utils.default;
$('#highlight').on('click', () => {
    $('.vue').siblings().addClass('highlight');
});
$('#highlight-jquery').on('click', () => {
    $('.jquery').css({
        'font-weight': 'bold',
        'font-style': 'italic',
        color: 'yellow',
    });
});
$('#remove-styles').on('click', () => {
    $('ul li').removeAttr('style').removeClass('highlight');
});
