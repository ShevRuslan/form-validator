# Перейти к **[Демонстрации](https://shevruslan.github.io/form-validator/)**.
## Что это?
Это  __JavaScript__ библиотека, упрощающая валидацию форм и дальнейших действий с ней.
## Как подключить?
Чтобы подключить данную библиотеку, вы должны скачать, или вставить код из **[файла](https://github.com/ShevRuslan/form-validator/blob/master/js/form-validator.js)**.
После этого нужно  подключить этот файл в __html__ (в конец _body_ ) до того, как подключен основной скрипт
```html
  <script src="js/form-validator.js"></script>
  <script src="js/script.js"></script>  
```
После подключения можно использовать данную библиотеку.
## Синтаксис
Чтобы инициализировать валидатор, напишите вот такой код:
```javascript
let validator = new Validator(config);
```
Данной строчкой создается экземпляр класса, который предназначен для валидации формы.

Конструктор принимает параметры настроек(_config_) :
```javascript
let config = {
    elements: inputs,
    callback: functionCallback,
    checkPasswords: true,
}
```
__elements__ - все поля, которые должны пройти проверку (_принимает либо один объект о поле, либо массив объектов о полях_).

_Пример:_

```javascript
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
]
```
Каждый объект поля должен содержать следующие:
- __name__   - id поля, по-которому он будет искаться (__обязательный параметр__)
- __regex__  - регулярное выражение, по-которому будет проверятся значение поле (__необязательный параметр__), если не передан - то проверка по этому полю пройдет.
- __error__  - текст ошибки, которая будет выведена, если поле не пройдет валидацию.

__callback__ - функция, которая будет исполнена, после успешного завершения валидации (принимает функцию).

_Пример:_
```javascript
const callback = () => console.log('Поля прошли валидацию!');
```
__checkPassword__ - булево значение, показывающие, будет ли проверятся на идентичность по значению 2 пароля. 
- true - пароли будут проверятся на идентичность по значению
- false - пароли не будут проверятся на идентичность по значению
- __Если значение не передано, то будет *false*.__

> Чтобы функция по проверки паролей работало корректно, вы должны дать __id__ полям с паролями, соответственно __password__ и  __repeatPassword__.
## Ошибки.
Если произошла какая-то ошибка, в console все будет написано.
#### __Ошибка в поиске элемента__.
Данная ошибка может возникать, если в настройках был передан не валидный id.

В связи с чем, поле невозможно найти.

Но, валидация остальных полей продолжиться.
#### __Ошибка в валидации__.
Валидация данного поле не прошла.

Такая ошибка может возникнуть, если вы передали неправильный id или регулярное выражение.

## Методы.
В библиотеки если дополнительные методы, с помощью которых можно проверить на валидацию поле, либо проверить поле на регулярное выражение, либо проверить за схожесть паролей.

- __validateOneInput(object)__
Этот метод проверяет одно поле на валидность.

Принимает объект поля, которое содержит _name_ (id), _error_ (ошибка, которая будет написана), _regex_ (регулярное выражение, по-которому будет проверятся поле).

Возвращает _true/false_.

__Использование__ :

```javascript
let input = {
    name: 'email',
    regex: '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$',
    error: 'Неправильно набран email.',
}

const validator = new Validator({
    elements: input,
});

validator.validateOneInput(input)
```
> В объекте поля (в данном случае input) должен содержаться __name__, который равен id поля, это __обязательное условие__.

- __checkPasswordAndRepeatPassword(valuePass, valueRepeatPass)__
Этот метод проверяет на схожесть двух паролей по их значенибю

Принимает два значение - паролей из полей.

Возвращает true / false
```javasccript
console.log(validator.checkPasswordAndRepeatPassword('qwerty', 'qwerty'));
//true
console.log(validator.checkPasswordAndRepeatPassword('qwertTy', 'qwerty'));
//false
```
## Как это использовать?

После того, как вы проинициализировали валидатор, и отдали ему параметры настроек, вы должны получить форму в переменную и дать ей обработчик события __'submit'__ :

```javascript
const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {

    e.preventDefault();


    if(validator.validate()) {
        e.currentTarget.submit();
    }

    return false;
});

```
Строчка __e.preventDefault()__ нужна для того, чтобы форма сразу не отсылалась на сервер, а прошла валидацию.

Если форма прошла валидацию, то строчка __e.currentTarget.submit()__ отправляет ее данные на сервер.

Это пример показал отправку на сервер без технологии __ajax__, если вам нужно отправить с помощью __ajax__, вы можете передать функцию в callback (при инициализации валидатора), либо использовать __следующий образом:__

```javascript
form.addEventListener('submit', (e) => {

    e.preventDefault();


    if(validator.validate()) {
        funcAjax();
    }

    return false;
});
```
__Таким образом произойдет валидация, и данные с форм отправятся на обработку, или выполнится какое-то другое действие.__

## Пример
- Написать форму и добавить инпуты.
```html
    <form class="form" method="POST">

          <label for="email">Email input</label>
          <input type="email" id="email" name="email" class="form-control " placeholder="E-mail">
          <div id="error_email"></div>

          <button class="btn  btn-block my-4 btnSubmit" type="submit">Sign in</button>
      </form>     
```
__У вас всегда должно быть что-то похожее на это__
```html
<input type="email" id="email" name="email" class="form-control " placeholder="E-mail">
<div id="error_email"></div>
```
Блок, в котором будет писаться ошибка, должен содержать id = __error_ + name(id инпута)__ - __обязательное условие__

- Переходим в js файл и пишем следующий код: 

```javascript
    let form = document.querySelector('.form');
    let inputs = [
        {
            name: 'email',
            regex: '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$',
            error: 'Неправильно набран email.',
        },
    ]
    const callback = () => console.log(1);

    let config = {
        elements: inputs,
        checkPasswords: true,
        callback: callback
    }

    const validator = new Validator(config);

    form.addEventListener('submit', (e) => {

        e.preventDefault();


        validator.validate();

        return false;
    });
```
> Т.к я передаю функцию-callback, то я не буду отсылать данные с форм на сервер, ибо это можно занести в функцию-callback и ее передать.

- Если форма пройдет валидацию, то функция callback будет выполнена, если не пройдет, то выведет ошибки на полях.

# Конец документации
Спасибо, что прочитали документации и начали использовать мою библиотеку.

Если возникнут вопросы, то вы можете обратиться ко мне - https://vk.com/rshruslan