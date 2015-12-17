//var hamb = document.querySelector('#hamb')
//
//function menu(){
//    hamb.style.transform = "rotate(90deg)";
//};

$hamb    = $('#hamb'),
    $topHamb = $('#topHamb'),
    $navBar  = $('.navBar'),
    $resp    = $('#responsiveNav');

$hamb.on('click',function()
         {
    $hamb.toggleClass('rotated'),
        $navBar.toggleClass('open');

        if ($navBar.hasClass('open')){
            $resp.hide().velocity('transition.slideDownIn', { duration: 200 });
            } else{
            $resp.hide().velocity('transition.slideDownOut', { duration: 500 });
};


});

$(function() {
    FastClick.attach(document.body);
});

