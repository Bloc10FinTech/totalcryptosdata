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


/* Js to give format to Large Numbers */
  var _sep = ",";
  var _number = $(".FormatNum").text().replace("$","");
  _number = typeof _number != "undefined" && _number > 0 ? _number : "";
  _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
  if(typeof _sep != "undefined" && _sep != " ") {
    _number = _number.replace(/\s/g, _sep);
  }
  $(".FormatNum").html('$'+_number);
/* Js to give format to Large Numbers */


  $('#top_exchange').marquee({direction:'horizontal', delay:0, timing:20});
        
  $("#top_exchange").children('li').each(function(){
    var cls=this.className.split(" ");
    cls=cls[cls.length-1];
    if($(".hidden_"+cls)){
      var val=$(".hidden_"+cls).val();
      if(val!=undefined){
        $(".chart_"+cls).html('');
        $(".chart_"+cls).sparkline(val.split(","), {type: 'line',width: '100%',height: '50',lineColor: '#ff6439',fillColor: "transparent"});
      }
    }
  });

});
