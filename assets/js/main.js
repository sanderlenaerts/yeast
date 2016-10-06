
$(document).ready(function () {


  $('.js-toggle-menu-button').on('click', function(event) {
    event.preventDefault();

    $('#main-content').toggleClass('reveal');
    $('#navigation').toggleClass('reveal');
  });

  $('.navigation ul li a').on('click', function(event) {

    $('#main-content').toggleClass('reveal');
    $('#navigation').toggleClass('reveal');
  });




  $('body').keyup(function(event) {
    event.preventDefault();

    var code = event.keyCode || event.which;

   $(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() >= 540) {
        $('#main-content').removeClass('reveal');
        $('#navigation').removeClass('reveal');
      }
    });

});
