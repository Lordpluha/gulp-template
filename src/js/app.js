import Swiper, { Navigation, Pegination} from 'swiper'
import { animOnScroll } from './modules/beauty_load.js'
import { ibg } from './modules/ibg.js'
import './modules/testWebp.js'

const swiper = new Swiper()

// Красивая загрузка елементов страницы
window.onDOMContentLoaded = (e) => ibg()

window.onload = (e) => {
	setTimeout(animOnScroll, 300)
	window.addEventListener('scroll', animOnScroll)
}