(() => {
    const app = {
        init() {
            this.cacheElements();
            setInterval(() => {
                this.generateUi()
            }, 2000);
        },
        cacheElements() {
            this.$placeHolder = document.querySelector('.input')
        },
        generateUi() {
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
            this.$placeHolder.placeholder = tasksArray[randomTask];
        }
    };
    app.init();
})()
