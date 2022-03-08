
export default {
    button: function(method, action, classy, type, text) {
        return `
        <form method="${method}" action="${action}">
            <button class="${classy}" type="${type}">${text != "[object Object]" ? text : ""}</button>
        </form>`
    },
    length: function(taskData, boolean, state) {
        const task = taskData.filter((task) => task.checked === boolean)
        return `
        <h3 class="p--pending">You have ${task.length === 0 ? "no" : task.length} ${state} task${task.length === 1 ? "" : "s"}</h3>
        `
    },
}