/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   const form = document.getElementById('contactForm')
   const url = 'https://4ez8stxbd6.execute-api.us-east-1.amazonaws.com/prod/email'
   const errorMessage = document.getElementById('message-warning')
   const successMessage = document.getElementById('message-success')
   var name = $('#contactForm #contactName').val();
   var email = $('#contactForm #contactEmail').val();
   var subject = $('#contactForm #contactSubject').val();
   var content = $('#contactForm #contactMessage').val();

   function success () {
      $('#image-loader').fadeOut();
      $('#message-warning').hide();
      $('#contactForm').fadeOut();
      $('#message-success').fadeIn();   

   }

   function error (err) {
      $('#image-loader').fadeOut();
      $('#message-warning').html('Form missing data');
      $('#message-warning').fadeIn();
      console.log(err)
   }

   function sendData(e) {
      e.preventDefault()
      fetch(url, {
         headers:{
            "Content-type": "application/json"
         },
         method: "POST",
         body: JSON.stringify({
            name: form.contactName.value,
            email: form.contactEmail.value,
            subject: form.contactSubject.value,
            content: form.contactMessage.value
         }),
         mode: 'cors'
      })
      .then((resp) => resp.json())
      .then(function(data) {
         // console.log("data")
         // console.log(data)
         // console.log(typeof data)

         console.log(data)
         if (typeof data === 'object') {
            success()
         } else {
            error(data)
         }
      })
      .catch(function(err) {
         error(err)
      });
   };

   document.getElementById('submit').addEventListener('click', function(e) {
      $('#image-loader').fadeIn();
      sendData(e);
   });

});
