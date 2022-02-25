// import themes from './themes.js';
// console.log(themes);

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.generateUi();
            setInterval(() => {
                this.generateRandomTask()
            }, 2000);
        },
        cacheElements() {
            this.$input = document.querySelector('.input');
        },
        generateUi() {
            const themes = [
                {
                    name: 'light',
                    colors: [
                        {name:'primary-pink', hex: '#cc38b8'},
                        {name:'primary-yellow', hex: '#bd8c22'},
                        {name:'primary-text', hex: '#FFFFFF'},
                        {name:'primary-border', hex: '#8b267e'}
                    ]
                },
                {
                    name: 'dark',
                    colors: [
                        {name:'primary-pink', hex: '#00093a'},
                        {name:'primary-yellow', hex: '#7556e4'},
                        {name:'primary-text', hex: '#FFFFFF'},
                        {name:'primary-border', hex: '#000000'}
                    ]
                }
            ]
            console.log(themes[0].colors[0].hex);

            const root = document.documentElement;
            // root.style.setProperty('--primary-pink', '#cc38b8');
            // root.style.setProperty('--primary-yellow', '#bd8c22');
            // root.style.setProperty('--primary-text', '#FFFFFF');
            // root.style.setProperty('--primary-black', '#FFF');
            
        },
        generateRandomTask() {
            const tasksArray = [
                "Travel to another country",
                "Break a bone",
                "Win a contest",
                "Ride a bike",
                "Be on TV",
                "Meet a celebrity",
                "Built a piece of furniture",
                "Fix my car",
                "Go skydiving",
                "Climb a mountain",
                "Write a book",
                "Have a car accident",
                "See my favorite band in concert",
                "Meet Kim Jong-Un"
            ]
            randomTask = Math.floor(Math.random() * tasksArray.length);
            this.$input.placeholder = tasksArray[randomTask];
        }
    };
    app.init();
})()
