$(window).on("load resize",function(e){
  $( "#reference" ).trigger( "click" );
});


$(".tabs-inf").on("click",".a-inf",function(e){
  e.preventDefault();
  $('.tabs-inf .a-inf').removeClass("active");
  $(this).addClass('active');
  var activeWidth = $(this).innerWidth()+10;
  var itemPos = $(this).position();
  $(".selector-inf").css({
    "left":(itemPos.left-5) + "px", 
    "width": activeWidth + "px"
  });
});


