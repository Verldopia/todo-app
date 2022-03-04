export default {
    button: function(method, action, classy, type, text) {
        return `
        <form method="${method}" action="${action}">
            <button class="${classy}" type="${type}">${text != "[object Object]" ? text : ""}</button>
        </form>`
    },
}