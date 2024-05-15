const form = document.querySelector('form');

function validate(e) {
  console.log(e);
  if (['SELECT', 'INPUT', 'RADIO'].includes(e.target.tagName)) {
    const val = e.target.value;
    const id = e.target.id;
    console.log(id);
    const parent = e.target.parentElement;

    if (parent.lastElementChild.className === 'info') parent.lastElementChild.remove();

    let faults = [];
    let pattern;

    switch (id) {
      case 'uid':
        if (val.length < 6) {
          faults.push('Minimi pituus 6 merkkiä');
        }
        break;

      case 'password':
        if (val.length <= 6) {
          faults.push('Minimi pituus 6 merkkiä');
        }

        if (/[!@£$€&%#]/.test(val) === false) {
          faults.push('1 merkki');
        }

        if (/[A-Ö]/.test(val) === false) {
          faults.push('1 iso kirjain');
        }

        if (/[0-9]/.test(val) === false) {
          faults.push('1 numero');
        }

        break;

      case 'zipcode':
        if (val.length !== 5 || /[0-9]/.test(val) === false) {
          faults.push('Pituus täytyy olla 5 numeroa');
        }
        break;

      case 'email':
        pattern = /[a-z|0-9|.]+[@][a-z]+[.][a-z]/di;

        if (val === '') {
          faults.push('Kenttä ei saa olla tyhjä');
        } else if (pattern.test(val) === false) {
          faults.push('Sähköposti ei ole oikean muotoinen');
        }
        break;

      case 'country':
        if (val === '') {
          faults.push('Maa ei saa olla tyhjä');
        }
        break;

      default:
        if (val === '') {
          faults.push('Kenttä ei saa olla tyhjä');
        }
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
  for (element of event.target.elements) {
    validate(event.target.elements[element.id]);
  }
}
form.addEventListener('focusout', validate);
form.addEventListener('submit', onSubmit);
