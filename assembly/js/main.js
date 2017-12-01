$(
	function()
	{
		//----------------
		//ONLY below values are adjustable
		var i = 2000;//interval
		var z = 1.5;//zoom size
		var m = 30;//left and right margins among the slides in li
		var n_s = 3;//numbers to display on screen. odd number is recommended
		var h = 200;//the height of zoomed image


		//ONLY above values are adjustable
		//----------------


		$(".carousel").carousel_auto({
			interval:i,
			zoom: z,
			margin: m,
			num_screen: n_s,
			height: h,
		});
	}
);
