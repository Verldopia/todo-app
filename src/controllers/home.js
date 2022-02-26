export const home = (req, res) => {
    const categories = [
        {
            text: "Default",
            url: "https://google.com"
        },
        {
            text: "Gaming",
            url: "https://google.com"
        },
        {
            text: "Household",
            url: "https://google.com"
        },
        {
            text: "Others",
            url: "https://google.com"
        },
    ]
    const tasks = [
        {
            task: "Buy a new gaming laptop"
        },
        {
            task: "Complete the dishes"
        },
        {
            task: "Create video for Youtube"
        },
        {
            task: "Create a new portfolio site"
        },
    ]
    const tasksDone = [
        {
            task: "Buy a new gaming laptop"
        },
        {
            task: "Complete the dishes"
        },
        {
            task: "Create video for Youtube"
        },
        {
            task: "Create a new portfolio site"
        },
        {
            task: "Buy cookies"
        },
        {
            task: "Create a new portfolio site"
        },
    ]
    
    res.render('home', {categories, tasks, tasksDone})
};
