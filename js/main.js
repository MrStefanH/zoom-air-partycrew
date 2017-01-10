var app = angular.module('zapc', ['duScroll']);
app.value('duScrollOffset', 125);

app.controller('zapc_footer', function(){
    this.copyrightDate = new Date();
});

app.controller('zapc_members',['$scope', '$http', function($scope, $http){
    var controller = this;
    $http.get('php/members.php').then(function(response){
        controller.members = response.data.records;
    });
}]);

app.controller('zapc_gigs',['$scope', '$http', function($scope, $http){
    var controller = this;
    $http.get('php/gigs.php').then(function(response){
        controller.gigs = response.data.records;
    });

    this.showHide = function (element,options) {
        var defaults = {
            speed: 500,
            easing: '',
            changeText: 0,
            showText: 'View',
            hideText: 'Close'
        };
        var options = $.extend(defaults, options);
        $('#' + element).slideToggle(options.speed, options.easing);
    };
}]);

app.controller('scrollTopController', ['$document', function($document){
    this.icon = 'icon-up-open';

    this.scrollToTop = function(){
        $document.scrollTopAnimated(0, 1200);
    };
}]);

app.controller('menuController', ['$document', function($document){
    this.scrollToElement = function(id){
        var element = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(element, 125, 1200);
    };
}]);

$( document ).ready(function() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

		if ($(this).scrollTop() > 130) {
            $('#header-wrapper').addClass('main-nav-top-fixed animated fadeInDown');
            $('#main-nav').removeClass('posabs');
            $('#header-wrapper').removeClass('main-bg');
            $('#header-wrapper .container').css('padding', '0.5em 0');
            $('#logo a img').css('margin-top', 0);
            $('#logo a').css('display', 'block');
            $('#logo').css('background', 'none');
            $('#logo').removeClass('mainlogo');
            $('#slider').css('height', '774px');
            $('#main-nav ul li a').addClass('bordertransparent');
            $('#main-nav ul li a').removeClass('bordernormal');
        } else if ($(this).scrollTop() === 0) {
            $('#header-wrapper').removeClass('main-nav-top-fixed animated fadeInDown');
            $('#header-wrapper').addClass('animated fadeInUp');
            $('#main-nav').addClass('posabs');
            $('#header-wrapper').addClass('main-bg');
            $('#header-wrapper .container').css('padding', '5em 0');
            $('#logo a').css('display', 'table-cell');
            $('#logo').addClass('mainlogo');
            $('#logo a img').css('margin-top', '3.2em');
            $('#slider').css('height', '600px');
            $('#main-nav ul li a').removeClass('bordertransparent');
            $('#main-nav ul li a').addClass('bordernormal');
        }
	});

	$("#send-mail").click(function () {

        var name = $('input#name').val(); // get the value of the input field
        var error = false;
        if (name == "" || name == " ") {
            $('#err-name').show(500);
            $('#err-name').delay(4000);
            $('#err-name').animate({
                height: 'toggle'
            }, 500, function () {
                // Animation complete.
            });
            error = true; // change the error state to true
        }

        var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
        var email = $('input#email').val().toLowerCase(); // get the value of the input field
        if (email == "" || email == " " || !emailCompare.test(email)) {
            $('#err-email').show(500);
            $('#err-email').delay(4000);
            $('#err-email').animate({
                height: 'toggle'
            }, 500, function () {
                // Animation complete.
            });
            error = true; // change the error state to true
        }


        var comment = $('textarea#nachricht').val(); // get the value of the input field
        if (comment === "" || comment == " ") {
            $('#err-nachricht').show(500);
            $('#err-nachricht').delay(4000);
            $('#err-nachricht').animate({
                height: 'toggle'
            }, 500, function () {
                // Animation complete.
            });
            error = true; // change the error state to true
        }

        if (error === false) {
            var dataString = $('#contact-form').serialize(); // Collect data from form
            $.ajax({
                type: "POST",
                url: $('#contact-form').attr('action'),
                data: dataString,
                timeout: 6000,
                error: function (request, error) {
                	$('#errorSend').removeClass('hidden');
					$('#errorSend').show();
                },
                success: function (response) {
                    response = $.parseJSON(response);
                    if (response.success) {
                        $('#errorSend').addClass('hidden');
                        $('#errorSend').hide();
                    	$('#successSend').removeClass('hidden');
                        $('#successSend').show();
                        $("#name").val('');
                        $("#email").val('');
                        $("#nachricht").val('');
                    } else {
                        $('#successSend').addClass('hidden');
                        $('#successSend').hide();
                    	$('#errorSend').removeClass('hidden');
                        $('#errorSend').show();
                    }
                }
            });
            return false;
        }

        return false; // stops user browser being directed to the php file
    });

    $('#members').bind('inview', function (event, visible) {
        if (visible === true) {
            $('.teammember').each(function(i){
                setTimeout(function() {
                    $('.teammember').eq(i).addClass('is-visible');
                }, 400 * i);
            });
        } else {
            $('.teammember').each(function(i){
                $('.teammember').eq(i).removeClass('is-visible');
            });
        }
    });

    $('.contact-form').bind('inview', function (event, visible) {
        if (visible === true) {
            $('.contact-form').addClass("animated bounceIn");
        } else {
            $('.contact-form').removeClass("animated bounceIn");
        }
    });
});

// Initialize google map for contact setion with your location.
function initMap() {

    var lat = '51.1958'; // Set your latitude.
    var lon = '11.9849'; // Set your longitude.

    var centerLon = lon - 0.0405;

    var myOptions = {
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
        center: new google.maps.LatLng(lat, centerLon),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Bind map to elemet with id map-canvas
    var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lon),

    });

    var infowindow = new google.maps.InfoWindow({
        content: "<strong>Weissenfels - Zoom Air Partycrew Homebase!</strong>"
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);
}
