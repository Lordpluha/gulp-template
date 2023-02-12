const testWebP = callback => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
        callback(webP.height == 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebP(support => { support == true ? document.querySelector('body').classList.add('webp') : document.querySelector('body').classList.add('no-webp') })

const ibg = () => {
	let ibg = document.querySelectorAll('.ibg')
	for (let i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')'
		}
	}
}

export { ibg }
export { testWebP }