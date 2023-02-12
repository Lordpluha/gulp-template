// Content upploading effect
const AnimItems = document.querySelectorAll('._anim-elem')

const offset = element => {
	let rect = element.getBoundingClientRect(),
		scrollLeft = window.pageXOffset,
		scrollTop = window.pageYOffset
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

const animOnScroll = () => {
	for (let i = 0; i < AnimItems.length; i++) {
		// Текущие параметры елемента
		let AnimItem = AnimItems[i]
		let AnimItemHeight = AnimItem.offsetHeight
		let AnimItemOffset = offset(AnimItem).top
		// Часть страницы, при которой срабатывает еффект
		const animStart = 4
		// Точка налача анимации
		let animItemPoint = window.innerHeight - AnimItemHeight / animStart

		if (AnimItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart
		}
		if((window.pageYOffset > AnimItemOffset - animItemPoint) &&
			window.pageYOffset < (AnimItemOffset + AnimItemHeight)) {
				AnimItem.classList.add('_active-fx')
		}
	}
}

export { animOnScroll }
