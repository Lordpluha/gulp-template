import * as webpfuncs from './modules/functions.js';
import Swiper, { Navigation, Pegination} from 'swiper';
import { animOnScroll } from './modules/beauty_load.js'

const swiper = new Swiper();

// Красивая загрузка елементов страницы
document.addEventListener('DOMContentLoaded', function() {
	window.addEventListener('scroll', animOnScroll());

	webpfuncs.testWebP(function () {});
	webpfuncs.ibg();

	setTimeout(animOnScroll, 300);

	console.log('JS succesfully initializated!');
});