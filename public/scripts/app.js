import { themes } from './themes.js';

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
            this.$switch = document.querySelector('#checkbox');
        },
        generateUi() {
            const root = document.documentElement;
            this.$switch.addEventListener('click', () => {
                root.style.setProperty('--primary-pink', '#00093a');
                root.style.setProperty('--primary-yellow', '#7556e4');
                root.style.setProperty('--primary-text', '#FFFFFF');
                root.style.setProperty('--primary-black', '#000000');
            })
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
