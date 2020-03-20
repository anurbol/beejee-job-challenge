export const inputText = (name, placeholder, oninputFn, value, validationTriggered, onValidationFailed, validationRules, type = 'text') => {
    const classes = new Set(['form-control']), messages = [];
    if (validationTriggered) {
        if (validationRules) {
            for (const rule of validationRules) {
                const errors = rule.validator(value).errors;
                if (errors.length) {
                    classes.add('invalid');
                    messages.push(...errors);
                    onValidationFailed();
                }
            }
        }
    }
    return `<div class="input-group mb-2">
    <input type="${type}" value="${value}" name="${name}" placeholder="${placeholder}" oninput="${oninputFn}(this)" class="${Array.from(classes).join(' ')}">
    </div>
    ${messages.length ? `<div class="validation-messages">${messages.join('<br>')}</div>` : ``}
    `;
};
