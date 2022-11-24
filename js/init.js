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
   const url = 'https://7h1pm3j8j8.execute-api.us-east-1.amazonaws.com/dev/email/send'
   const imageLoader = document.getElementById('image-loader')
   const submit = document.getElementById('submit')
   const errorMessage = document.getElementById('message-warning')
   const successMessage = document.getElementById('message-success')

   function post(url, body, callback) {
   var req = new XMLHttpRequest();
   req.open("POST", url, true);
   req.setRequestHeader("Content-Type", "application/json");
   req.addEventListener("load", function () {
      if (req.status < 400) {
         callback(null, JSON.parse(req.responseText));
      } else {
         callback(new Error("Request failed: " + req.statusText));
      }
   });
   req.send(JSON.stringify(body));
   }

   function success () {
      imageLoader.fadeOut()
      errorMessage.hidden()
      successMessage.fadeIn()

      submit.disabled = false
      submit.blur()
      form.contactName.focus()
      form.contactName.value = ''
      form.contactEmail.value = ''
      form.contactSubject.value = ''
      form.contactMessage.value = ''
   }

   function error (err) {
      imageLoader.fadeOut()
      errorMessage.innerHTML(err)
      errorMessage.fadeIn()
      submit.disabled = false
      console.log(err)
   }

   form.click(function () {
      imageLoader.fadeIn()
      submit.disabled = true  

      const payload = {
         name: form.contactName.value,
         email: form.contactEmail.value,
         subject: form.contactSubject.value,
         content: form.contactMessage.value
      }
      post(url, payload, function (err, res) {
         if (err) { return error(err) }
         success()
      })
   });

 });
