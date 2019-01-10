class FormValidator {
    constructor({elements, callback, checkPasswords}) {
        this.elements = elements;
        this.funcCallback = callback;
        this.checkPasswords = checkPasswords || false;
        this._addEventInputs = false;
    }
    _addEvent() {
        this.elements.forEach(function(elem) {
            let element = document.querySelector('#' + elem.name);
            if(element === null) console.error(`Ошибка в поиске элемента: \n Элемента с именем '${elem.name}' не существует! \n Проверьте id у этого поля. `);
            else element.addEventListener('input', () => {this.validateOneInput(elem)});
        }.bind(this));
    }
    validateAllInputs() {

        if(this._addEventInputs == false) {
            this._addEvent();
            this._addEventInputs = true;
        }
        let validate = true;

        this.elements.forEach(function(element) {;
            if( this.validateOneInput(element) == false) validate = false;
        }.bind(this));

        return validate;
    }
    validate() {
        if(this.validateAllInputs() == true) {

            if(this.checkPasswords) {
                let password = document.querySelector('#password');
                let repeatPassword = document.querySelector('#repeatPassword');

                if(this.checkPasswordAndRepeatPassword(password.value, repeatPassword.value)) {
                    return true;
                }
                return false;
            }

            if(typeof this.funcCallback === 'function') this.funcCallback();

            return true;
        }
        
        return false;

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
        if(element !== null) {
            let validator = this.validateByTemplate(element.value.trim(), _object.regex);
            let wrapperError = document.querySelector('#error_' + _object.name);

            if(element.value.trim() == "" || validator == false) {
                element.classList.add('border__red');
                wrapperError.textContent = _object.error;
                return false;
            }
            element.classList.remove('border__red');
            wrapperError.textContent = '';

            return true;
        }
        else {
            console.error(`Ошибка в валидации: \n Поле с id '${_object.name}' не может пройти валидацию, т.к такого элемента не существует! \n Проверьте id у этого поля.`);
        }
    }
    validateByTemplate(value, template) {

        if(template === undefined) {
            return true
        }

        let _template = new RegExp(template);

        if(_template.test(value) == false) {
            return false;
        }

        return true;
    }
}



window.Validator = FormValidator;
