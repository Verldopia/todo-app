const drag = {
    init() {
        this.orderIDs = [];
        
        this.cacheElements();
        this.initOrder();
        this.initDragAndDrop(); 

    },
    cacheElements() {
        this.$tasksUl = document.querySelector('.tasks');
        // .box-categories
        this.$allTasksLi = document.querySelectorAll('.tasks li');
        // .box-categories li
    },
    initOrder() {
        this.$allTasksLi.forEach(($taskLi) => {
        this.orderIDs.push($taskLi.id);
        });
    },
    initDragAndDrop() {
        let $currentLi = null;
        this.$allTasksLi.forEach( $taskLi => {
        $taskLi.draggable = true;

        // Make valid drop element
        $taskLi.ondragover = (e) => {
            e.preventDefault()
        };

        // Start dragging
        $taskLi.ondragstart = (e) => {
            $currentLi = $taskLi;
            this.$allTasksLi.forEach((i) => {
            i.classList.add('hint__drag')
            })
        };

        // Dragging is aborted
        $taskLi.ondragend = (e) => {
            this.$allTasksLi.forEach((i) => {
            i.classList.remove('hint__drag')
            i.classList.remove('active__drag')
            })
        };

        //  On drag enter
        $taskLi.ondragenter = (e) => {
            if($taskLi === $currentLi) return false;
            $taskLi.classList.add('active__drag');
        };

        // On drag leave
        $taskLi.ondragleave = (e) => {
            $taskLi.classList.remove('active__drag');
        };

        // On drag leave
        $taskLi.ondrop = (e) => {
            if($taskLi === $currentLi) return false;
            
            // delete current id from array of id's
            const currentInd = this.orderIDs.indexOf($currentLi.id);
            this.orderIDs.splice(currentInd, 1)

            // get index of dropped item (in order id's)
            const newInd = this.orderIDs.indexOf($taskLi.id);

            if(currentInd <= newInd) {
            this.orderIDs.splice(newInd + 1, 0, $currentLi.id);
            } else {
            this.orderIDs.splice(newInd, 0, $currentLi.id);
            }

            this.initReorder();
            this.postNewOrder();
        };  
        })
    },
    initReorder() {
        const newTasks = [];
        this.orderIDs.forEach((id) => {
        const el = document.querySelector(`#${id}`);
        newTasks.push(el)
        });

        this.$tasksUl.innerHTML = '';
        newTasks.forEach((el) => {
        this.$tasksUl.appendChild(el);
        })

    },
    postNewOrder() {
        // Fetch a post request to api, with new order
        // / --> this.orderIds

    },
};

drag.init();