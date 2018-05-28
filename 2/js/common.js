$(function() {

	$(".personal-carousel").owlCarousel({
		loop: true,
		items: 4,
		nav: true,
		dots: false,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 4
			}
		}
	});

$(".worker-carousel").owlCarousel({
		loop: true,
		items: 1,
		nav: true,
		dots: false,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsiveClass: true,
		
	});

$(".partners-carousel").owlCarousel({
		loop: true,
		items: 4,
		nav: true,
		dots: false,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 4
			}
			
		}
	});

$(".hamburger").click(function() {
	$(".main-mnu").slideToggle();
	return false;
});




});


