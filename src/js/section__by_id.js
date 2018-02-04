import httpGet from './http.js';

export default class JokeById {
    constructor(options) {

        /*
        options: {
                navigationHeaderId,
                sectionContainerName,
                sectionHTML,
                inputAreaId,
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
        const url = `https://api.chucknorris.io/jokes/${query}`;

        if (query === '') {
            this.blinkInputError();
            return;
        }

        this.freezeButton(this.submitButton, 'Ждём ответа...');

        httpGet(url)
            .then(res => {
                this.unfreezeButton(this.submitButton);
                this.renderSearchResultInSection(JSON.parse(res));
            },
            (err) => {
                this.unfreezeButton(this.submitButton);
                this.showError(err, url);
            });
    }

    freezeButton(el, disabledText) {
        el.setAttribute('disabled', '');
        el.setAttribute('data-original-text', el.innerText);

        el.innerText = disabledText;

    }

    unfreezeButton(el) {
        el.removeAttribute('disabled');
        el.innerText = el.getAttribute('data-original-text');

        el.removeAttribute('data-original-text');
    }

    // blinking input form borders with red in case of invalid input
    blinkInputError() {
        let inputForm = this.inputForm;

        inputForm.classList.add('error');

        clearTimeout(this.inputFormBorderBlinkTimer);
        this.inputFormBorderBlinkTimer = setTimeout(() => {
            inputForm.classList.remove('error');
        }, 1000);
    }

    renderSearchResultInSection(res) {
        this.outputContainer.innerHTML = `
        <div class="section__joke-block">
            <div class="section__joke_avatar_wrap">
                <img src="${res.icon_url}" class="section__chuck_avatar">
            </div>
            <div class="section__joke_text">
                ${res.value}
            </div>
        </div>`;
    }

    showError(err, url) {
        const errorMessageWrap = document.createElement('div');
        errorMessageWrap.classList.add('sections__error_message');

        // preventing possible XSS injection (user input in variable url)
        errorMessageWrap.innerText = `Обработчик запроса вернул ошибку ${err}. 
        
            С почти 100% вероятностью это произошло из-за того, что API \
            неадекватно обработала URL ${url}, который без проблем откроется\
            в браузере.`;

        this.outputContainer.innerHTML = '';
        this.outputContainer.appendChild(errorMessageWrap);
    }
}