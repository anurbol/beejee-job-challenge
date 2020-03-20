import { inputText } from "./inputText.js"
import { state, setState } from "../state.js"
import { required, email } from "../validationRules.js"

const onValidationFailed = (): any => setState(s => ({
    ...s,
    addTask: {
        ...s.addTask,
        validationFailed: true 
    }
}), false);

export const addTask = () => `<fieldset>
<legend>Добавить задачу</legend>
${inputText('username', 'Имя', 'app.addTask.updateUsername', state.addTask.fields.username, state.addTask.validationTriggered, onValidationFailed, [required])}
${inputText('email', 'Email', 'app.addTask.updateEmail', state.addTask.fields.email, state.addTask.validationTriggered, onValidationFailed, [required, email])}
${inputText('title', 'Текст', 'app.addTask.updateTitle', state.addTask.fields.title, state.addTask.validationTriggered, onValidationFailed, [required])}
<button type="button" class="btn btn-primary" onclick="app.addTask.submit()"> Добавить задачу </button>
</fieldset>
`