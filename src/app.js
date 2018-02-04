import "babel-polyfill";

import Storage from './js/storage.js';

import NavigationHeader from './js/header__nav.js';
import SectionRandom from './js/section__random.js';
import SectionById from './js/section__by_id.js';
import SectionSearch from './js/section__search.js';
import SectionFeed from './js/section__feed.js';

const storage = new Storage({
    cachingURL: 'https://api.chucknorris.io/jokes/search'
});

const sectionRandom = new SectionRandom({
    navigationHeaderId: 'navigation__random',
    sectionContainerName: 'content',
    sectionHTML: `
        <section id="section__random" class="main_section">
            <div class="main_section__hint">
                Нажмите, чтобы получить случайную шутку
            </div>
            <button id="section_random__button" class="section_random__button fl_button">Получить!</button>
            <div id="section_random__output_container" class="section__output_container"></div>
        </section>`,
    buttonId: 'section_random__button',
    outputContainerId: 'section_random__output_container'
});

const sectionById = new SectionById({
    navigationHeaderId: 'navigation__by_id',
    sectionContainerName: 'content',
    sectionHTML: `
        <section id="section__by_id" class="main_section">
            <div class="main_section__hint">
                Введите ID шутки и попробуйте получить её по ID.
            </div>
            <div class="section__by_id__controls">
                <input id="section__by_id__input" class="section_by_id__input" value="cntXaaW-RX2n4mUq6jTX5Q">
            </div>
            <button id="section_by_id__button" class="section_by_id__button fl_button">Попробовать</button>
            <div id="section__by_id__output_container"></div>
        </section>`,
    inputAreaId: 'section__by_id__input',
    submitButtonId: 'section_by_id__button',
    outputContainerId: 'section__by_id__output_container'
});

const sectionSearch = new SectionSearch({
    navigationHeaderId: 'navigation__search',
    sectionContainerName: 'content',
    sectionHTML: `
    <section id="section__search" class="main_section">
        <div class="main_section__hint">
            Введите ключевое слово и нажмите кнопку, чтобы запустить поиск по слову в базе. Не забудьте указать удобный размер выдачи.
        </div>
        <div class="section__search__controls">
            <input id="section__search__input" value="horse" class="section_search__input" placeholder="введите Ваш запрос..">
            <select id="section__search__select" class="section_search__select">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
        <button id="section_search__button" class="section_random__button fl_button">Поиск</button>
        <div id="section__search__output_container" class="section__output_container"></div>
    </section>`,
    sectionSearchContainerName: 'section_search__controls',
    inputAreaId: 'section__search__input',
    countSelectorFormId: 'section__search__select',
    submitButtonId: 'section_search__button',
    outputContainerId: 'section__search__output_container'
});

const sectionFeed = new SectionFeed({
    navigationHeaderId: 'navigation__feed',
    sectionContainerName: 'content',
    sectionHTML: `
        <section id="section__feed" class="main_section">
            <div class="main_section__hint">
                Листайте страничку вниз — в ленту будут бесконечно подгружаться новые шутки.
            </div>
            <div id="section__feed__output_container" class="section__output_container"></div>
        </section>`,
    outputContainerId: 'section__feed__output_container'
});


const nav = new NavigationHeader({
    navigationHeaderId: 'navigation'
});

nav.init(
    [
        sectionRandom,
        sectionById,
        sectionSearch,
        sectionFeed
    ]
);

nav.initialTabOpen(0);

export default storage;