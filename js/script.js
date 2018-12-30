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
        arraySend.push(elem);
    });
    let formValidate  = new FormValidator(arraySend);
})

class FormValidator {
    constructor(elements) {
        this.elements = elements;
        this.init();
    }
    validateAllInputs() {
        // this.elements.forEach(function(elem) {
        //     this.validateOneInput(elem);
        // }.bind(this));
        this.elements.forEach(element => this.validateOneInput(element) );
    }
    validateOneInput(element) {
        if(element.value.trim() == ""){
            element.classList.add('border__red');
        }
        else {
            element.classList.remove('border__red');
        }
    }
    init() {
        this.validateAllInputs();
    }
}