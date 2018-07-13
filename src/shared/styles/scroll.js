$(function() {
	var wh = window.innerHeight,
		scrollItems = $('.scroll-item'),
		controller = new ScrollMagic.Controller();

		if(scrollItems.length) {
			scrollItems.forEach(function(item) {
				var scene = new ScrollMagic.Scene({
					triggerElement: '#' + item.id
				})
				.setTween("#" + item.id, 0.5, {autoAlpha: 1, positionY: 0})
			});
		}

});