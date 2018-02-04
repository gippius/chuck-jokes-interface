import httpGet from './http.js';

export default class SectionFeed {
    constructor(options) {

        /*
        options: {
            sectionsWrapId,
            navigationHeaderId,
            sectionContainerName,
            outputContainerId
        }
        */

        this.options = options;
        this.sectionContainerName = options.sectionContainerName;

        this.menuItem = document.getElementById(options.navigationHeaderId);
        this.sectionContainer = document.getElementById(options.sectionContainerName);

        this.sectionHTML = options.sectionHTML;
    }

    init() {
        const options = this.options;

        this.sectionContainer.innerHTML = this.sectionHTML;

        this.sectionContainer = document.getElementById(options.sectionContainerName);
        this.outputContainer = document.getElementById(options.outputContainerId);

        this.sectionContainer.addEventListener('wheel', this.feedScrolled.bind(this));

        this.initialFeedFill(10);
    }

    // loads n jokes to feed on page open
    initialFeedFill(n) {
        let i = 0;
        while (i < n) {
            this.loadNewJokeToFeed();
            i += 1;
        }
    }

    feedScrolled(e) {
        const menuItem = this.menuItem;
        if (menuItem.id !== 'navigation__feed' ||
            !menuItem.classList.contains('selected') ||
            e.deltaY < 0 ||
            (window.innerHeight + window.scrollY + 100) < document.body.offsetHeight) {
            return;
        }

        this.loadNewJokeToFeed();
    }

    loadNewJokeToFeed() {
        const url = `https://api.chucknorris.io/jokes/random`;
        httpGet(url)
            .then(res => {
                this.addJokeToFeed(JSON.parse(res));
            },
            (err) => {
                this.showError(err, url);
            });
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

    addJokeToFeed(res) {
        this.outputContainer.innerHTML += `
        <div class="section__joke-block">
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