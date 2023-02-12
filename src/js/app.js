import * as webpfuncs from './modules/functions.js'
import Swiper, { Navigation, Pegination} from 'swiper'
import { animOnScroll } from './modules/beauty_load.js'

const swiper = new Swiper()

// Красивая загрузка елементов страницы
document.onload(() => {
	webpfuncs.ibg()
	webpfuncs.testWebP(() => {})

	setTimeout(animOnScroll, 300)
	window.addEventListener('scroll', animOnScroll)
})

document.addEventListener('DOMContentLoaded', () => {

})