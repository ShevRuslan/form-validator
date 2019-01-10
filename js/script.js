let form = document.querySelector('form');
let inputs = [
    {
        name: 'email',
        regex: '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$',
        error: 'Неправильно набран email.',
    },
    {
        name: 'phone',
        regex: '^[a-zA-Zа-яёА-ЯЁ]+$',
        error: 'Неправильно набран телефон'
    },
    {
        name: 'name',
        error: 'Неправильно набрано имя.',
    },
    {
        name: 'surName',
        regex: '^[a-zA-Zа-яёА-ЯЁ]+$',
        error: 'Неправильно набрана фамилия.',
    },
    {
        name: 'o',
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

const callback = () => console.log(1);

let config = {
    elements: inputs,
    checkPasswords: false,
    callback: callback,
}
const validator = new Validator(config);

form.addEventListener('submit', (e) => {

    e.preventDefault()


    if(validator.validate()) {
        return true
    }

    return false;
});

