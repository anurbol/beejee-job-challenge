import { state, setState } from "../state.js";
import { ValidationRule } from "../contracts.js";

export const inputText = (name: string, placeholder: string, oninputFn: string, value: string, validationTriggered: boolean, onValidationFailed: () => any, validationRules?: ValidationRule[], type: 'text' | 'password' = 'text') => {

    const classes = new Set(['form-control']),
        messages: string[] = []

    if (validationTriggered) {

        if (validationRules) {
            for (const rule of validationRules) {
                const errors = rule.validator(value).errors;
                if (errors.length) {
                    classes.add('invalid')
                    messages.push(...errors)
                    onValidationFailed()
                }
            }
        }
    }

    return `<div class="input-group mb-2">
    <input type="${type}" value="${value}" name="${name}" placeholder="${placeholder}" oninput="${oninputFn}(this)" class="${Array.from(classes).join(' ')}">
    </div>
    ${messages.length ? `<div class="validation-messages">${messages.join('<br>')}</div>` : ``}
    `
}