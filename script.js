const form = document.querySelector('form');

function validate(et) {
	if (['SELECT', 'INPUT', 'RADIO'].includes(et.tagName)) {
		const val = et.value;
		const id = et.id;
		const parent = et.parentElement;

		if (parent.lastElementChild.className === 'info')
			parent.lastElementChild.remove();

		let faults = [];
		let pattern;

		switch (id) {
			case 'uid':
				val.length < 6
					? faults.push('Minimi pituus 6 merkkiä')
					: '';
				break;

			case 'password':
				val.length < 6
					? faults.push('Minimi pituus 6 merkkiä')
					: '';
				/[!@£$€&%#]/.test(val) === false
					? faults.push('1 merkki')
					: '';
				/[A-Ö]/.test(val) === false
					? faults.push('1 iso kirjain')
					: '';
				/[0-9]/.test(val) === false
					? faults.push('1 numero')
					: '';
				break;

			case 'zipcode':
				val.length !== 5 || /[0-9]/.test(val) === false
					? faults.push('Pituus täytyy olla 5 numeroa')
					: '';
				break;

			case 'email':
				pattern = /[a-z|0-9|.]+[@][a-z]+[.][a-z]/di;
				val === ''
					? faults.push('Kenttä ei saa olla tyhjä')
					: '';
				pattern.test(val) === false
					? faults.push('Sähköposti ei ole oikean muotoinen')
					: '';
				break;

			default:
				val === ''
					? faults.push('Kenttä ei saa olla tyhjä')
					: '';
				break;
		}

		if (faults.length > 0) {
			const ul = document.createElement('ul');
			ul.className = 'info';
			for (f of faults) {
				const li = document.createElement('li');
				const text = document.createTextNode(f);
				li.appendChild(text);
				ul.appendChild(li);
			}

			parent.appendChild(ul);
		}
	}
}

function onSubmit(event) {
	event.preventDefault();
	for (i in event.target.elements) {
		validate(event.target.elements[i]);
	}
}

function onfocusOut(event) {
	validate(event.target);
}
form.addEventListener('focusout', onfocusOut);
form.addEventListener('submit', onSubmit);
