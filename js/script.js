let buttonSubmit = document.querySelector('.btnSubmit');
let form = document.querySelector('form');

buttonSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let elements = Array.from(form.elements);
    let arraySend = [];
    elements.forEach(function(elem){
        if(elem.type == 'submit') {
            return;
        }
        arraySend[elem.name] = elem.value;
    });
    let formValidate  = new FormValidator(arraySend, null);
})

class FormValidator {
    constructor(elements, validator) {
        this.elements = elements;
        this.functionValidator = validator;
        this.init();
    }
    check() {
        for(let key in this.elements) {
            let element = document.querySelector('#' + key);

            if(this.elements[key] == ""){
                console.log(key);
                element.classList.add('border__red');
                continue;
            }
            element.classList.remove('border__red');
        }
    }
    init() {
        this.check();
    }
}