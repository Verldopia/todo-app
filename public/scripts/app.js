import { themes } from "./themes.js";

(() => {
    const app = {
        init() {
            // Get defined themes from themes module
            this.themes = themes;
            this.root = document.documentElement;
            this.index = localStorage.getItem("activeIndex");
            this.index = this.index === null ? 1 : this.index;
            console.log(this.index);
            
            this.cacheElements();
            this.registerListeners();
            this.changeDOMTheme();
        },
        cacheElements() {
            this.$switch = document.querySelector('.switch__img');
        },
        registerListeners() {
            console.log(this.index);
            this.$switch.addEventListener('click', () => {
                // Loop through themes
                this.activeThemeName = this.themes[this.index < this.themes.length ? this.index++ : this.index = 0];
                this.index = this.index === 0 ? 1 : this.index;

                // Set active state and delete after 1.5seconds
                this.$switch.classList.add("active");
                setTimeout(() => {
                    this.$switch.classList.remove("active")
                }, 1500)

                // Change in local storage
                localStorage.setItem("activeIndex", this.index);
                localStorage.setItem("activeThemeName", this.activeThemeName.slug);
                this.changeDOMTheme();
            });
        },
        changeDOMTheme() {
            const activeTheme = this.themes.find((theme) => theme.slug === localStorage.getItem("activeThemeName"));

            activeTheme.items.forEach((item) => {
                this.root.style.setProperty(`--${item.name}`, item.var);
            });
        }
    };
    app.init();
})()
