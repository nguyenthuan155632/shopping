/*price range*/

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/

$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});

$(document).ready(function(){ 
	var attrClass = function(element, remove) {
		if(!remove) {
			$(element).addClass('error-input');
		}
		else {
			$(element).removeClass('error-input');
		}
	};
	var validation = function(element) {
		var validate = true;
		if($(element).val() == "") {
			attrClass(element, false);
			validate = false;
		}
		else {
			attrClass(element, true);
		}
		return validate;
	};
	$('#submit-login').click(function() {
		var validate = true;
		if(!validation('form#login-form input[name=email]')) {
			validate = false;
		}
		if(!validation('form#login-form input[name=password]')) {
			validate = false;
		}
		if(!validate) {
			return false;
		}
	});
	$('#submit-signup').click(function() {
		var validate = true;
		if(!validation('form#signup-form input[name=email]')) {
			validate = false;
		}
		if(!validation('form#signup-form input[name=password]')) {
			validate = false;
		}
		if(!validation('form#signup-form input[name=password_confirm]')) {
			validate = false;
		}
		if(($('form#signup-form input[name=password]').val() != $('form#signup-form input[name=password_confirm]').val())) {
			$('form#signup-form input[name=password]').addClass('error-input');
			$('form#signup-form input[name=password_confirm]').addClass('error-input');
			validate = false;
		}
		if(!validation('form#signup-form input[name=address]')) {
			validate = false;
		}
		if(!validation('form#signup-form input[name=phone]')) {
			validate = false;
		}
		if(!validation('form#signup-form input[name=birthday]')) {
			$('form#signup-form .input-group-addon').addClass('error-input');
			validate = false;
		}
		else {
			$('form#signup-form .input-group-addon').removeClass('error-input');
		}
		if(!validation('form#signup-form select')) {
			validate = false;
		}
		if(!validate) {
			return false;
		}
	});
});