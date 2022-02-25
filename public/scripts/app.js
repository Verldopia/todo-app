import { themes } from "./themes.js";
(() => {
    const app = {
        init() {
            // Get defined themes from themes module
            this.themes = themes;
            this.root = document.documentElement;
            
            // Set active theme get from local storage
            this.activeThemeName = localStorage.getItem("activeThemeName") || "light";
            this.cacheElements();
            this.registerListeners();

            // Populate dropdown box
            this.populateSelect();

            // Change theme, based on active theme
            this.changeDOMTheme();
        },
        cacheElements() {
            this.$selectSwitch = document.querySelector('#theme-switcher');
        },
        registerListeners() {
            this.$selectSwitch.addEventListener("change", (e) => {
                // Change active theme here
                this.activeThemeName = e.target.value;
                // Change in local storage
                localStorage.setItem("activeThemeName", e.target.value);
                // Other theme, so change the dom colors
                this.changeDOMTheme();
            });
        },
        populateSelect() {
            const options = themes.map((theme) => {
                return `<option value="${theme.slug}" ${theme.slug == this.activeThemeName ? "selected" : ""}>${theme.name}</option>`
            });
            this.$selectSwitch.innerHTML = options.join('');
        },
        changeDOMTheme() {
            const activeTheme = this.themes.find((theme) => theme.slug == this.activeThemeName);

            activeTheme.colors.forEach((color) => {
                this.root.style.setProperty(`--${color.name}`, color.hex);
            });
        }
        
    };
    app.init();
})()
