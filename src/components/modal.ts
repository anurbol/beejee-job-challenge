import { inputText } from "./inputText.js";
import { required } from "../validationRules.js";
import { state, setState } from "../state.js";

const onValidationFailed = (): any => setState(s => ({
    ...s,
    login: {
        ...s.login,
        validationFailed: true
    }
}), false);

export const modal = () => `<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Вход</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            ${inputText('username', 'Имя пользователя', 'app.loginForm.updateUsername', state.login.fields.username, state.login.validationTriggered, onValidationFailed, [required])}
            ${inputText('password', 'Пароль', 'app.loginForm.updatePassword', state.login.fields.password, state.login.validationTriggered, onValidationFailed, [required], 'password')}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" onclick="app.loginForm.submit()">Вход</button>
        </div>
    </div>
</div>
</div>`