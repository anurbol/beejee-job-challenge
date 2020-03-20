import { Task } from "../contracts";
import { state } from "../state.js";

export const task = (task: Task) => `<tr>
<th>${task.id}</th>
<th>${task.username}</th>
<th>${task.email}</th>
<th>
${state.editTask.started && state.editTask.taskId === task.id
        ? `<input data-edit-task=${task.id} type="text" value="${task.title}" oninput="app.editTask.updateField(this)">
        <br><a href="#" onclick="app.editTask.save()">Сохранить</a><br><a href="#" onclick="app.editTask.cancel()">Отмена</a>`
        : `${task.title}
    ${state.loginStatus.loggedIn && state.loginStatus.loggedIn.isAdmin
            ? `<br><input onchange="app.completeTask(${task.id})" type="checkbox" ${task.done ? `checked="checked"` : ``} title="Выполнено" /> <a href="#" onclick="app.editTask.startEdit(${task.id})">Редактировать</a>`
            : ``}`
    }

${task.edited_by_admin ? `<br><span class="badge badge-primary">Отредактировано администратором</span>` : ``}
${task.done ? `<br><span class="badge badge-success">Выполнено</span>` : ``}
</th>
</tr>`