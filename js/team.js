var membersAnimate = function() {
  var members = $('#members');
  if ( members.length > 0 ) {

    members.waypoint( function( direction ) {

      if( direction === 'down' && !$(this.element).hasClass('animated') ) {


        setTimeout(function() {
          members.find('.to-animate').each(function( k ) {
            var el = $(this);

            setTimeout ( function () {
              el.addClass('fadeInUp animated');
            },  k * 200, 'easeInOutExpo' );

          });
        }, 200);



        $(this.element).addClass('animated');

      }
    } , { offset: '80%' } );

  }
};
