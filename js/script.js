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
        name: 'ot',
        regex: '^[a-zA-Zа-яёА-ЯЁ]+$',
        error: 'Неправильно набрано отчество.',
    },
    {
        name:  'password',
        regex: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}',
        error: 'Неправильно набран пароль.'

    },
    {
        name:  'repeatPassword',
        regex: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}',
        error: 'Неправильно набран пароль.'
    }
]
class FormValidator {
    constructor(elements) {
        this.elements = elements;
        this.addEventInputs = false;
    }
    _addEvent() {
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
        let validate = true;

        this.elements.forEach(function(element) {;
            if( this.validateOneInput(element) == false) validate = false;
        }.bind(this));

        return validate;
    }
    get() {
        if(this.validateAllInputs() == true) {
            let password = form.querySelector('#password');
            let repeatPassword = form.querySelector('#repeatPassword');

            if(this.checkPasswordAndRepeatPassword(password.value, repeatPassword.value)) {
                console.log("Все поля прошли валидацию. Пароли верны.");
            }
            else{
                console.log('Пароли не верны.');
            }
        }
        else {
            console.log('Поля не прошли валидацию');
        }

    }
    checkPasswordAndRepeatPassword(pass, repeatPass) {
        if(pass == repeatPass) {
            return true;
        }

        return false;
    }
    validateOneInput(object) {
        let _object = object;
        let element = document.querySelector('#' + _object.name);
        let validator = this.validateByTemplate(element.value.trim(), _object.regex);
        let wrapperError = form.querySelector('#error_' + _object.name);

        if(element.value.trim() == "" || validator == false) {
            element.classList.add('border__red');
            wrapperError.textContent = _object.error;
            return false;
        }
        else {
            element.classList.remove('border__red');
            wrapperError.textContent = '';
        }

        return true;
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
    
    validator.get();
});