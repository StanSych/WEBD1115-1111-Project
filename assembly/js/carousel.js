//define the widget giving it a namespace and name
//see also https://msdn.microsoft.com/en-us/library/hh404085.aspx
$.widget("custom.carousel_auto",
{
	//public properties
	options:{
		interval: 2000,
		zoom: 1.5,
		margin: 30,
		num_screen: 3,
		height: 200,
	},

	//private method
	_create: function()
	{

		var z = this.options.zoom;
		var n_s = this.options.num_screen;
		var m = this.options.margin;
		var h = this.options.height;

		var window_w = $(window).width();
		var window_change = false;
		//initialization


		carouselUpdate(z, n_s, m, h);
		// carouselUpdate;

		var t = setInterval(
			animateAlert, //function to run every so many seconds
			this._limitInterval(this.options.interval), //interval before changing, in milliseconds
			//How to pass value to animateAlert.
			//https://stackoverflow.com/questions/15410384/javascript-setinterval-function-with-arguments
			// this.options.interval,
			z,
			n_s,
			m,
			h,
		);



		function animateAlert(zoom, num_screen, margin, height)
		// function animateAlert()
		{

			// var li_width = $('.carousel_container ul li:nth-child(1)').outerWidth(true);

			//update if windows width changed
			if (window_w != $(window).width()) {
				window_w = $(window).width();
				window_change = true;
			}

			//responsive
			if(window_w > 1024){
				num_screen = n_s;
				margin = m;
			}
			else if(window_w > 640){
				num_screen = 2;
				margin = 20;
			}
			else{
				num_screen = 1;
				margin = 10;
			}


			var animate_interval = 1000;

			var width = window_w / (num_screen - 1 + zoom);
			//window.innerWidth
			// var li_img_width = $('.carousel_container ul li:nth-child(1)').outerWidth();
			// var li_height = $('.carousel_container ul li:nth-child(1)').outerHeight();
			var left_indent = parseInt($('.carousel_container ul').css('left')) - width;

			$('.carousel_container ul').animate
			(
				{
					'left':left_indent,
				},
				animate_interval,
				function(){
					$('.carousel_container ul li:last').after($('.carousel_container ul li:first'));
					$('.carousel_container ul').css({
						'left' : -width +'px',
					});

					//update the carousel
					if(window_change){
						//width is changed, need to be updated
						carouselUpdate(zoom, num_screen, margin, height);
						window_change = false;
					}
				}
			);

			$('.carousel_container ul li:nth-child('+ parseInt(num_screen / 2 + 3) +')').animate(
				{
					'height' : zoom * height + 'px',
					'top' : (height - zoom * height) / 2 + 'px',
					'width': (width * zoom - margin * 2) + 'px',
				},
				animate_interval,
			);


			$('.carousel_container ul li:nth-child('+ parseInt(num_screen / 2 + 2) +') ').animate(
				{
					'height' : height + 'px',
					'top':0,
					'width': (width - margin * 2) + 'px',
				},
				animate_interval,
			);



		}

		function carouselUpdate(zoom, num_screen, margin, height){

			// alert();
			//responsive
			if(window_w > 1024){
				num_screen = n_s;
				margin = m;
			}
			else if(window_w > 640){
				num_screen = 2;
				margin = 20;
			}
			else{
				num_screen = 1;
				margin = 10;
			}

			var num_total = $('.carousel_container ul li').length;
			$('.carousel_container').css({
				'float':'left', // necessary for in line position
				'width': 'calc(100vw)',
				'overflow':'hidden', //hides items outside the width
			});



			$('.carousel_container ul').css({
				'position':'relative',
				'list-style-type':'none',
				// 'padding':'0px',
				'left' : 'calc(-100vw / '+(num_screen - 1 + zoom)+')',
				'width':'calc(100vw / '+(num_screen - 1 + zoom) +' * '+ (zoom + num_total - 1)+')',
			});

			// if zoom<1 no need to deduct the height of ul
			if(zoom > 1){
				$('.carousel_container ul').css({
					'height' : (height * zoom) + 'px',
					'margin' : (height * (zoom - 1) / 2) + 'px 0',
				});
			}

			$('.carousel_container ul li').css({
				'float':'left',
				'position': 'relative',
				'width':'calc(100vw / ' + (num_screen - 1 + zoom) + ' - ' + margin + 'px * 2)',
				'height' : height + 'px',
				'margin' : '0 ' + margin + 'px',
			});

			$('.carousel_container ul li:nth-child(' + parseInt(num_screen / 2 + 2) + ')').css({
				'width':'calc(100vw / ' + (num_screen - 1 + zoom) + ' * ' + zoom + ' - ' + margin + 'px * 2)',
				'height' : (height * zoom) + 'px',
				'top' : parseInt((height - zoom * height) / 2) + 'px',
			});

			$('.carousel_container ul li img').css({
				'height':'100%',
				'width': '100%',
			});

		}


		this.element.addClass("carousel_auto");
	},

	_limitInterval: function(interval)
	{
		if(interval>5000)
		{
			interval = 5000;
		}

		if(interval < 500)
		{
			interval = 500;
		}
		return interval;
	}

});
