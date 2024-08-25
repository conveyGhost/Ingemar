(function () {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	// navigation
	var OnePageNav = function () {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function (e) {
			e.preventDefault();
			var hash = this.hash;

			$('html, body').animate({

				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});
		});
		$("#pb-navbar ul li a[href^='#']").on('click', function (e) {
			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});

		$('body').on('activate.bs.scrollspy', function () {
			console.log('nice');
		})
	};


	var offCanvasNav = function () {
		// var toggleNav = $('.js-pb_nav-toggle'),
		// 		offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		// if( toggleNav.length > 0 ) {
		// 	toggleNav.click(function(e){
		// 		$(this).toggleClass('active');
		// 		offcanvasNav.addClass('active');
		// 		e.preventDefault();
		// 	});
		// }
		// offcanvasNav.click(function(e){
		// 	if (offcanvasNav.hasClass('active')) {
		// 		offcanvasNav.removeClass('active');
		// 		toggleNav.removeClass('active');
		// 	}
		// 	e.preventDefault();
		// })
	};



	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function () {
		var i = 0;
		$('.site-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('site-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .site-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn site-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft site-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight site-animated');
							} else {
								el.addClass('fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};

	var navbarState = function () {

		var lastScrollTop = 0;
		$(window).scroll(function () {

			var $this = $(this),
				st = $this.scrollTop(),
				navbar = $('.site-navbar');

			if (st > 200) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if (navbar.hasClass('scrolled') && st > 300) {
				if (st > lastScrollTop) {
					// if (navbar.hasClass('scrolled')) {
					// navbar.removeClass('awake');
					// navbar.addClass('sleep');
					// }
				} else {
					// if (navbar.hasClass('scrolled')) {
					// navbar.addClass('awake');
					// navbar.removeClass('sleep');
					// }
				}
				lastScrollTop = st;
			}

		});




	};




	var siteStellar = function () {
		$(window).stellar({
			responsive: true,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	};




	// Page Nav
	var clickMenu = function () {

		$('.navbar-nav a:not([class="external"])').click(function (event) {

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
			if (isMobile.any()) {
				$('.navbar-toggle').click();
			}
			if ($('[data-section="' + section + '"]').length) {
				$('html, body').animate({
					scrollTop: $('[data-section="' + section + '"]').offset().top
				}, 500, 'easeInOutExpo');
			}

			event.preventDefault();
			return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function () {

		var $section = $('section[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function () {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 500);
			return false;
		});
	};

	var magnificPopupControl = function () {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function (openerElement) {
					// openerElement is the element on which popup was initialized, in this case its <a> tag
					// you don't need to add "opener" option if this code matches your needs, it's defailt one.
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function (item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};




	var portfolioMasonry = function () {
		$('.filters ul li').click(function () {
			$('.filters ul li').removeClass('active');
			$(this).addClass('active');

			var data = $(this).attr('data-filter');
			$grid.isotope({
				filter: data
			})
		});


		if (document.getElementById("section-portfolio")) {
			var $grid = $(".grid").isotope({
				itemSelector: ".all",
				percentPosition: true,
				masonry: {
					columnWidth: ".all"
				}
			})
		};


	};
	new Typed('#typed', {
		strings: ['Blockchain', 'Frontend Developer'],
		typeSpeed: 100,
		delaySpeed: 100,
		loop: true
	});

	$('.site-hero').ripples({
		resolution: 512,
		dropRadius: 60,
		perturbance: 0.1,
	});

	function createAutoRipples() {
		var $hero = $('.site-hero');
		var x = Math.random() * $hero.outerWidth();
		var y = Math.random() * $hero.outerHeight();
		var dropRadius = 20 + Math.random() * 30; // Randomize drop radius if needed
		var strength = 0.02 + Math.random() * 0.04; // Randomize strength if needed
		$hero.ripples('drop', x, y, dropRadius, strength);
	}

	// Create ripples at regular intervals
	setInterval(createAutoRipples, 1000); // Adjust the interval as needed

	$(function () {

		OnePageNav();
		offCanvasNav();
		contentWayPoint();
		navbarState();
		clickMenu();
		smoothScroll();
		portfolioMasonry();
	});

	var offsetTop = $('#skills').offset().top;
	$(window).scroll(function () {
		var height = $(window).height();
		if ($(window).scrollTop() + height > offsetTop) {
			jQuery('.skillbar').each(function () {
				jQuery(this).find('.skillbar-bar').animate({
					width: jQuery(this).attr('data-percent')
				}, 2000);
			});
		}
	});


	// Show the button when the user scrolls down 20px from the top of the document
	window.onscroll = function () {
		var scrollToTopBtn = document.getElementById("scrollToTopBtn");
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			scrollToTopBtn.style.display = "block";
		} else {
			scrollToTopBtn.style.display = "none";
		}
	};

	// Scroll to the top of the document when the user clicks the button
	document.getElementById("scrollToTopBtn").onclick = function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// ///////////////////////////////////////  prevent safe ///////////////////////////////////////////////////////////

	// // Prevent right-click context menu
	// document.addEventListener('contextmenu', function (e) {
	// 	e.preventDefault();
	// });

	// // Prevent text selection and copying
	// document.addEventListener('selectstart', function (e) {
	// 	e.preventDefault();
	// });

	// document.addEventListener('copy', function (e) {
	// 	e.preventDefault();
	// });

	// // Prevent Ctrl + S (Save As), Ctrl + U (View Source), F12 (DevTools)
	// document.addEventListener('keydown', function (e) {
	// 	if ((e.ctrlKey && e.key === 's') ||
	// 		(e.ctrlKey && e.key === 'u') ||
	// 		e.key === 'F12') {
	// 		e.preventDefault();
	// 	}
	// });

	// // Prevent opening DevTools using right-click > Inspect
	// document.addEventListener('keydown', function (e) {
	// 	if (e.key === 'F12' ||
	// 		(e.ctrlKey && e.shiftKey && e.key === 'I') ||
	// 		(e.ctrlKey && e.shiftKey && e.key === 'C') ||
	// 		(e.ctrlKey && e.shiftKey && e.key === 'J') ||
	// 		(e.ctrlKey && e.key === 'U')) {
	// 		e.preventDefault();
	// 	}
	// });

	// // Prevent opening DevTools using right-click > Inspect (for older browsers)
	// document.onkeydown = function (e) {
	// 	if (e.keyCode == 123) {
	// 		return false;
	// 	} else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
	// 		return false; // Prevent Ctrl+Shift+I
	// 	} else if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
	// 		return false; // Prevent Ctrl+Shift+J
	// 	} else if (e.ctrlKey && e.keyCode == 85) {
	// 		return false; // Prevent Ctrl+U
	// 	}
	// };

	// ///////////////////////////////////////  end prevent safe ///////////////////////////////////////////////////////////

	$('.site-form').on('submit', function(e) {
		e.preventDefault();

		// Get form values
		var name = $('input[placeholder="Your Name"]');
		var email = $('input[placeholder="Your Email"]');
		var phone = $('input[placeholder="Your Phone"]');
		var message = $('textarea[placeholder="Write a Message"]');

		// Validation
		if ($.trim(name.val()) === '') {
			toastr.error('Please enter your name.', 'Validation Error!');
			name.focus();
			return;
		}

		if ($.trim(email.val()) === '') {
			toastr.error('Please enter your email.', 'Validation Error!');
			email.focus();
			return;
		}

		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!emailPattern.test($.trim(email.val()))) {
			toastr.error('Please enter a valid email address.', 'Validation Error!');
			email.focus();
			return;
		}

		if ($.trim(phone.val()) === '') {
			toastr.error('Please enter your phone number.', 'Validation Error!');
			phone.focus();
			return;
		}

		var phonePattern = /^[0-9]+$/;
		if (!phonePattern.test($.trim(phone.val()))) {
			toastr.error('Please enter a valid phone number.', 'Validation Error!');
			phone.focus();
			return;
		}

		if ($.trim(message.val()) === '') {
			toastr.error('Please enter your message.', 'Validation Error!');
			message.focus();
			return;
		}

		// If validation passes
		toastr.success('Success! Your message has been sent.', 'Success!');

		// Clear the form fields
		name.val('');
		email.val('');
		phone.val('');
		message.val('');
	});
})();


