// Variabilă globală pentru indexul curent al mesajelor
var currentMsgIndex = 1;
var totalMessages = $(".message p").length;
var galleryActivators = [];
var galleryState = {
  baseIndex: 0,
  intervalId: null,
  displays: []
};
var galleryImageCaptions = {
  '11.jpg': 'Octombrie 2024',
  '12.jpg': 'Noiembrie 2024',
  '13.jpg': 'Decembrie 2024',
  '14.jpg': 'Februarie 2025',
  '15.jpg': 'Martie 2025',
  '16.jpg': 'Aprilie 2025',
  '17.jpg': 'Mai 2025',
  '18.jpg': 'Iunie 2025',
  '19.jpg': 'August 2025',
  '20.jpg': 'Septembrie 2025'
};
var galleryRotationDelay = 10000;

// Funcția existentă de loop
function msgLoop(i) {
  $(".message p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function () {
    i = i + 1;
    $(".message p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
    currentMsgIndex = i;
    if (i == totalMessages) {
      $(".message p:nth-child(" + (totalMessages - 1) + ")").fadeOut('slow').promise().done(function () {
        $('.cake').fadeIn('fast');
      });
    } else {
      msgLoop(i);
    }
  });
}

$(window).load(function(){
        $('.loading').fadeOut('fast');
        $('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
		var galleryImages = ['11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'];

                function setDisplaySource(display, baseIndex, images) {
                                var imageIndex = (baseIndex + display.offset + images.length) % images.length;
                                var nextImage = images[imageIndex];
                                display.$image.attr('src', nextImage);
                                display.$caption.text(galleryImageCaptions[nextImage] || '');
                }

                function transitionDisplay(display, baseIndex, images) {
                                var imageIndex = (baseIndex + display.offset + images.length) % images.length;
                                var nextImage = images[imageIndex];
                                var nextCaption = galleryImageCaptions[nextImage] || '';

                                $.when(
                                                display.$image.fadeOut(1000),
                                                display.$caption.fadeOut(1000)
                                ).done(function(){
                                                display.$image.attr('src', nextImage).fadeIn(1000);
                                                display.$caption.text(nextCaption).fadeIn(1000);
                                });
                }

                function startGalleryRotation(images) {
                                if (galleryState.intervalId !== null || !images.length) {
                                                return;
                                }

                                galleryState.intervalId = setInterval(function(){
                                                galleryState.baseIndex = (galleryState.baseIndex + 1) % images.length;
                                                galleryState.displays.forEach(function(display){
                                                                transitionDisplay(display, galleryState.baseIndex, images);
                                                });
                                }, galleryRotationDelay);
                }

                function initSideGallery(selector, images, startIndex) {
                                var $container = $(selector);
                                if (!$container.length || !images.length) {
                                                return;
                                }

                                var display = {
                                                offset: startIndex % images.length,
                                                $image: $('<img/>', {
                                                                'class': 'side-gallery__image',
                                                                alt: 'Galerie foto'
                                                }).hide(),
                                                $caption: $('<div/>', {
                                                                'class': 'side-gallery__caption'
                                                }).hide()
                                };

                                setDisplaySource(display, galleryState.baseIndex, images);
                                $container.append(display.$image, display.$caption);
                                galleryState.displays.push(display);

                                galleryActivators.push(function(){
                                                setDisplaySource(display, galleryState.baseIndex, images);
                                                if (!display.$image.is(':visible')) {
                                                                display.$image.fadeIn(1000);
                                                }
                                                if (!display.$caption.is(':visible')) {
                                                                display.$caption.fadeIn(1000);
                                                }
                                                startGalleryRotation(images);
                                });
                }

                initSideGallery('#left-gallery', galleryImages, 0);
                initSideGallery('#right-gallery', galleryImages, 1);

		$(window).resize(function(){
			 vw = $(window).width()/2;
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b11').animate({top:240, left: vw-350},500);
			$('#b22').animate({top:240, left: vw-250},500);
			$('#b33').animate({top:240, left: vw-150},500);
			$('#b44').animate({top:240, left: vw-50},500);
			$('#b55').animate({top:240, left: vw+50},500);
			$('#b66').animate({top:240, left: vw+150},500);
			$('#b77').animate({top:240, left: vw+250},500);
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		 vw = $(window).width()/2;

		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22')
		$('#b3').attr('id','b33')
		$('#b4').attr('id','b44')
		$('#b5').attr('id','b55')
		$('#b6').attr('id','b66')
		$('#b7').attr('id','b77')
		$('#b11').animate({top:240, left: vw-350},500);
		$('#b22').animate({top:240, left: vw-250},500);
		$('#b33').animate({top:240, left: vw-150},500);
		$('#b44').animate({top:240, left: vw-50},500);
		$('#b55').animate({top:240, left: vw+50},500);
		$('#b66').animate({top:240, left: vw+150},500);
		$('#b77').animate({top:240, left: vw+250},500);
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
        $('#story').click(function(){
                $(this).fadeOut('slow');

                galleryActivators.forEach(function(activate){
                        activate();
                });

                $('.cake').fadeOut('fast').promise().done(function(){
                        var $message = $('.message');
                        var $paragraphs = $message.find('p');

                        $paragraphs.hide();

                        $message.fadeIn('slow', function(){
                                $paragraphs.first().fadeIn('slow', function(){
                                        currentMsgIndex = 1;
                                        msgLoop(currentMsgIndex);
                                });
                        });
                });

        });
});




//alert('hello');