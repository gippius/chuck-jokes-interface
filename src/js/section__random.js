import httpGet from './http.js';

export default class SectionRandom {
    constructor(options) {

        /* 
        options: {
            navigationHeaderId,
            sectionContainerName,
            sectionHTML,
            buttonId,
            outputContainerId
        } 
        */

        this.options = options;
        this.sectionHTML = options.sectionHTML;

        this.menuItem = document.getElementById(options.navigationHeaderId);
        this.sectionContainer = document.getElementById(options.sectionContainerName);
    }

    init() {
        const options = this.options;

        this.sectionContainer.innerHTML = this.sectionHTML;

        this.submitButton = document.getElementById(options.buttonId);
        this.outputContainer = document.getElementById(options.outputContainerId);

        this.submitButton.addEventListener('click', this.submitButtonClicked.bind(this));
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

    submitButtonClicked() {
        this.getRandomJoke();
    }

    getRandomJoke() {
        const url = 'https://api.chucknorris.io/jokes/random';

        this.freezeButton(this.submitButton, 'Ждём ответа...');

        httpGet(url)
            .then(res => {
                this.unfreezeButton(this.submitButton);
                this.addJokeInSection(JSON.parse(res))
            },
            (err) => {
                this.unfreezeButton(this.submitButton);
                this.showError(err, url);
            });
    }

    addJokeInSection(res) {
        this.outputContainer.innerHTML = `
        <div class="section__joke-block section_random__joke-block">
            <div class="section__joke_avatar_wrap">
                <img src="${res.icon_url}" class="section__chuck_avatar">
            </div>
            <div class="section__joke_text">
                ${res.value}
            </div>
        </div>`;
    }

    showError(err) {
        this.container.innerHTML = `<span class="sections__error_message">
        Обработчик запроса вернул ошибку ${err}.
            Увы.</span>`;
    }
}