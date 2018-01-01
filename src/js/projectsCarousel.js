var $ = require('jquery');
import 'slick-carousel';
import '../../node_modules/slick-carousel/slick/slick.scss';
import '../../node_modules/slick-carousel/slick/slick-theme.scss';

$('.home-projects-container').slick({
    dots: true,
    slidesToShow: 1,
    arrows: true,
    infinite: false
});
