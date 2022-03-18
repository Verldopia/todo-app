import { themes } from './themes.js';

(() => {
  const app = {
    init() {
      // Get defined themes from themes module
      this.themes = themes;
      this.root = document.documentElement;
      this.index = localStorage.getItem('activeIndex');
      this.index = this.index ?? 1;

      this.cacheElements();
      this.registerListeners();
      this.shake();
      this.changeDOMTheme();
    },
    cacheElements() {
      this.$switch = document.querySelector('.switch__img');
      this.$switchBox = document.querySelector('.switch-box');
      this.$overlay = document.querySelector('.overlay__box');
    },
    registerListeners() {
      this.$switch.addEventListener('click', () => {
        // Loop through themes
        this.activeThemeName =
          this.themes[
            this.index < this.themes.length ? this.index++ : (this.index = 0)
          ];
        this.index = this.index || 1;

        // Set active state and delete after 1.5seconds
        this.$switch.classList.add('active');
        this.$overlay.classList.add('overlay');
        setTimeout(() => {
          this.$switch.classList.remove('active');
        }, 1500);
        setTimeout(() => {
          this.$overlay.classList.remove('overlay');
        }, 600);

        // Change in local storage
        localStorage.setItem('activeIndex', this.index);
        localStorage.setItem('activeThemeName', this.activeThemeName.slug);
        this.changeDOMTheme();
      });
    },
    shake() {
      setInterval(() => {
        this.$switchBox.classList.add('shaking');
      }, 3000);
      setInterval(() => {
        this.$switchBox.classList.remove('shaking');
      }, 6000);
    },
    changeDOMTheme() {
      const activeTheme = this.themes.find(
        (theme) => theme.slug === localStorage.getItem('activeThemeName')
      );

      activeTheme.items.forEach((item) => {
        this.root.style.setProperty(`--${item.name}`, item.var);
      });
    },
  };
  app.init();
})();
