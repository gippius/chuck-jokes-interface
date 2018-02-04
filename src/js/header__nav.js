export default class NavigationHeader {
    constructor(options) {

        /*
        options: { [ section, ... ] }
        */

        this.menu = document.getElementById(options.navigationHeaderId);

        this.menuItems = [];
        this.sections = [];
        this.activeTab = null;
    }

    init(sections) {
        sections.forEach(section => {
            const menuItem = section.menuItem;

            this.menuItems.push(menuItem);
            this.sections.push(section);

            menuItem.addEventListener('click', (e) => {
                section.init.call(section);
                this.selectMenuItem(e.target);
            });
        });
    }

    initialTabOpen(tabNumber) {
        this.sections[tabNumber].init();
        this.selectMenuItem(this.menuItems[tabNumber]);
    }

    selectMenuItem(item) {
        [...this.menuItems].forEach(element => {
            if (element.isSameNode(item)) {
                element.classList.add('selected');
                this.activeTab = item;
            } else {
                element.classList.remove('selected');
            }
        });
    }
}