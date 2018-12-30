let buttonSubmit = document.querySelector('.btnSubmit');
let form = document.querySelector('form');
//массив со всеми объектами(инпутами)
let inputs = [
    {
        name: 'email',
        regex: '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$',
        error: 'Неправильно набран email.',
    },
    {
        name: 'name',
        regex: '^[a-zA-Zа-яёА-ЯЁ]+$',
        error: 'Неправильно набрано имя.',
    },
    {
        name: 'surName',
        regex: '^[a-zA-Zа-яёА-ЯЁ]+$',
        error: 'Неправильно набрана фамилия.',
    },
    {
        name:  'password',
        regex: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}',
        error: 'Неправильно набран пароль.'

    },
    {
        name:  'repeatPassword',
        regex: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}',
        error: 'Пароли не совпадают.'
    }
]
class FormValidator {
    constructor(elements) {
        this.elements = elements;
        this.addEventInputs = false;
    }
    _addEvent(elements) {
        this.elements.forEach(function(elem) {
            let element = document.querySelector('#' + elem.name);
            element.addEventListener('input', () => {this.validateOneInput(elem)});
        }.bind(this));
    }
    validateAllInputs() {

        if(this.addEventInputs == false) {
            this._addEvent();
            this.addEventInputs = true;
        }

        this.elements.forEach(element => this.validateOneInput(element));
    }
    validateOneInput(object) {
        let _object = object;
        let element = document.querySelector('#' + _object.name);
        let validator = this.validateByTemplate(element.value.trim(), _object.regex);
        let wrapperError = form.querySelector('#error_' + _object.name);

        if(element.value.trim() == "" || validator == false) {
            element.classList.add('border__red');
            wrapperError.textContent = _object.error;
        }
        else {
            element.classList.remove('border__red');
            wrapperError.textContent = '';
        }
    }
    validateByTemplate(value, template) {
        let _template = new RegExp(template);

        if(_template.test(value) == false) {
            return false;
        }

        return true;
    }
}
let validator = new FormValidator(inputs);

buttonSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    
    validator.validateAllInputs();
});