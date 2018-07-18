$(function() {
	var wh = window.innerHeight,
		scrollItems = $('.scroll-item'),
		controller = new ScrollMagic.Controller()
		if(scrollItems.length) {
			[...scrollItems].forEach(function(item) {
				var tween = new TweenMax.fromTo(item, 0.5, {opacity: 0}, {opacity: 1});
				var scene = new ScrollMagic.Scene({
					triggerElement: item,
					triggerHook: 0.95,
					reverse: false
				})
				.setTween(tween)
				.addTo(controller);
			});
		}
});
