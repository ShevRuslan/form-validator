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
            element.addEventListener('input', () => {this.validateOneInput(elem)});
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
                let password = form.querySelector('#password');
                let repeatPassword = form.querySelector('#repeatPassword');

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
        let validator = this.validateByTemplate(element.value.trim(), _object.regex);
        let wrapperError = form.querySelector('#error_' + _object.name);

        if(element.value.trim() == "" || validator == false) {
            element.classList.add('border__red');
            wrapperError.textContent = _object.error;
            return false;
        }
        element.classList.remove('border__red');
        wrapperError.textContent = '';

        return true;
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
