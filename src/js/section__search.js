import httpGet from './http.js';

export default class JokeSearch {
    constructor(options) {

        /*
        options: {
            navigationHeaderId,
            sectionContainerName,
            sectionHTML,
            sectionSearchContainerName,
            inputAreaId,
            countSelectorFormId,
            submitButtonId,
            outputContainerId
        }
        */

        this.options = options;
        this.sectionHTML = options.sectionHTML;

        this.menuItem = document.getElementById(options.navigationHeaderId);
        this.sectionContainer = document.getElementById(options.sectionContainerName);

        this.inputFormBorderBlinkTimer = null;
    }

    init() {
        const options = this.options;

        this.sectionContainer.innerHTML = this.sectionHTML;

        this.inputForm = document.getElementById(options.inputAreaId);
        this.countSelectorForm = document.getElementById(options.countSelectorFormId);
        this.submitButton = document.getElementById(options.submitButtonId);
        this.outputContainer = document.getElementById(options.outputContainerId);

        this.inputForm.addEventListener('keyup', this.inputFormSentWithKeyboard.bind(this));
        this.submitButton.addEventListener('click', this.submitButtonClicked.bind(this));
    }

    inputFormSentWithKeyboard(e) {
        if (e.key !== 'Enter') return;

        this.inputFormSubmit();
    }

    submitButtonClicked() {
        this.inputFormSubmit();
    }

    inputFormSubmit() {

        // side-trimmed value of input form
        const query = this.inputForm.value.replace(/^\s+|\s+$/g, '');
        const url = `https://api.chucknorris.io/jokes/search?query=${query}`;

        if (query === '') {
            this.blinkInputError();
        } else {
            this.freezeButton(this.submitButton, 'Ждём ответа...');

            httpGet(url)
                .then(res => {
                    this.unfreezeButton(this.submitButton);
                    this.renderSearchResultInSection(JSON.parse(res), query);
                },
                (err) => {
                    this.unfreezeButton(this.submitButton);
                    this.showError(err, url);
                });
        }
    }

    freezeButton(element, disabledText) {
        element.setAttribute('disabled', '');
        element.setAttribute('data-original-text', element.innerText);

        element.innerText = disabledText;
    }

    unfreezeButton(element) {
        element.removeAttribute('disabled');
        element.innerText = element.getAttribute('data-original-text');

        element.removeAttribute('data-original-text');
    }

    // blinking input form borders with red in case of invalid input
    blinkInputError() {
        const inputForm = this.inputForm;

        inputForm.classList.add('error');

        clearTimeout(this.inputFormBorderBlinkTimer);
        this.inputFormBorderBlinkTimer = setTimeout(() => {
            inputForm.classList.remove('error');
        }, 1000);
    }

    renderSearchResultInSection(res = {}, query) {
        if (res.total > 0) {
            this.outputContainer.innerHTML = res.result
                .splice(0, this.countSelectorForm.value)
                .map(res => `
                <div class="section__joke-block">
                    <div class="section__joke_avatar_wrap">
                        <img src="${res.icon_url}" class="section__chuck_avatar">
                    </div>
                    <div class="section__joke_text">
                        ${res.value}
                    </div>
                </div>`)
                .join('');
        } else {
            this.noResultFound(query);
        }
    }

    noResultFound(query) {
        const errorMessageWrap = document.createElement('div');
        errorMessageWrap.classList.add('sections__error_message');

        // preventing possible XSS injections
        errorMessageWrap.innerText = `К сожалению, по запросу ${query} результатов не найдено. \nПопробуйте другие!`;

        this.outputContainer.innerHTML = '';
        this.outputContainer.appendChild(errorMessageWrap);
    }

    showError(err) {
        this.outputContainer.innerHTML = `<span class="sections__error_message">
        Обработчик запроса вернул ошибку ${err}.
            Увы.</span>`;
    }
}