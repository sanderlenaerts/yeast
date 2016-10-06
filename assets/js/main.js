
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

    // Hit the 'Tab' key to trigger the menu
    // if (code == '9') {
    //   $('.js-toggle-menu-button').trigger('click');
    // }
   });


   $(window).on('resize', function(){
     console.log('Resizing');
      var win = $(this); //this = window
      if (win.width() >= 540) {
        $('#main-content').removeClass('reveal');
        $('#navigation').removeClass('reveal');
      }
    });

});
