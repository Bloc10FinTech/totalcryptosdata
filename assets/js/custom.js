$( document ).ready(function() {
 var shrinkHeader = 300;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
      if ( scroll >= shrinkHeader ) {
           $('nav.navbar.navbar-inverse').addClass('shrink');
        }
        else {
            $('nav.navbar.navbar-inverse').removeClass('shrink');
        }
  });
function getCurrentScroll() { 
  return window.pageYOffset || document.documentElement.scrollTop;
}

});