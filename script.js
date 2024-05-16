const form = document.querySelector('form');

function validate(et) {
  if (['SELECT', 'INPUT'].includes(et.tagName)) {
    const val = et.value;
    const name = et.name;
    const parent = et.parentElement;

    if (parent.lastElementChild.className === 'info')
      parent.lastElementChild.remove();

    let faults = [];
    let pattern;
    let radio;

    switch (name) {
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
        pattern.test(val) === false
          ? faults.push('Sähköposti ei ole oikean muotoinen')
          : '';
        break;

      case 'gender':
        radio = form.elements[name];
        radio.value === ''
          ? faults.push('Et valinnut sukupuolta')
          : '';
        break;

      case 'lang':
        radio = form.elements[name];
        radio.value === ''
          ? faults.push('Et valinnut kieltä')
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

      return false;
    }
  }
}

function onSubmit(event) {
  event.preventDefault();
  let isValid = true;
  let result;
  Array.from(form.elements).forEach((input) => {
    result = validate(input);
    result === false ? (isValid = false) : '';
  });

  console.log(`Form is valid: ${isValid}`);
}

function onfocusOut(event) {
  validate(event.target);
}

form.addEventListener('focusout', onfocusOut);
form.addEventListener('submit', onSubmit);
