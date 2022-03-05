import { themes } from "./themes.js";

(() => {
    const app = {
        init() {
            // Get defined themes from themes module
            this.themes = themes;
            this.root = document.documentElement;
            
            this.cacheElements();
            this.registerListeners();
            this.changeDOMTheme();
        },
        cacheElements() {
            this.$switch = document.querySelector('.switch__img');
        },
        registerListeners() {
            let i = 1;
            this.$switch.addEventListener('click', () => {
                // Loop through themes
                this.activeThemeName = this.themes[i < this.themes.length ? i++ : i = 0];

                // Set active state and delete after 1.5seconds
                this.$switch.classList.add("active");
                setTimeout(() => {
                    this.$switch.classList.remove("active")
                }, 1500)

                // Change in local storage
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
