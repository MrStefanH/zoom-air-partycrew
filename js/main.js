$( document ).ready(function() {

	var lastId,
    topMenu = $("#top-navigation"),
    topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var href = $(this).attr("href");

            if(href.indexOf("#") === 0){
                var item = $($(this).attr("href"));
                if (item.length) {

                    return item;
                }
            }
        });

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

		// Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 10;

		// Get id of current scroll item
        var cur = scrollItems.map(function () {
            if (($(this).offset().top -130) < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
            .parent().removeClass("active")
            .end().filter("[href=\\#" + id + "]").parent().addClass("active");
        }
	});

	$('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    function filterPath(string) {
        return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
    }

    $('a[href*=\\#]').each(function () {
        if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
            var $targetId = $(this.hash),
            $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

            if ($target) {

                $(this).click(function () {
                    var targetOffset = $target.offset().top - 130;
                    $('html, body').animate({
                        scrollTop: targetOffset
                    }, 800);
                    return false;
                });
            }
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

	// Initial mixitup, used for animated filtering portgolio.
    $('#gig-list').mixitup({
        'onMixStart': function (config) {
            $('div.toggleDiv').hide();
        }
    });

	// Function for show or hide portfolio desctiption.
    $.fn.showHide = function (options) {
        var defaults = {
            speed: 1000,
            easing: '',
            changeText: 0,
            showText: 'Show',
            hideText: 'Hide'
        };
        var options = $.extend(defaults, options);
        $(this).click(function () {
            $('.toggleDiv').slideUp(options.speed, options.easing);
            var toggleClick = $(this);
            var toggleDiv = $(this).attr('rel');
            $(toggleDiv).slideToggle(options.speed, options.easing, function () {
                if (options.changeText == 1) {
                    $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
                }
            });
            return false;
        });
    };

	$('div.toggleDiv').hide();
	$('.show_hide').showHide({
        speed: 500,
        changeText: 0,
        showText: 'View',
        hideText: 'Close'
    });

    $('#members').bind('inview', function (event, visible) {
        console.log('tes');
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
function initializeMap() {

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
