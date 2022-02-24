
export default {
    button: function(type, use, options) {
        const validUse = ['first', 'second', 'third'];
        const validType = ['submit', 'button', 'reset'];

        if(validUse.includes(use) && validType.includes(type)) {
            return `<button class="${use}" type="${type}">${options.fn(this)}</button>`
        }
        return `<button class="primary" type="button">${options.fn(this)}</button>`
    }
}