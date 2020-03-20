import { arrow } from "./arrow.js";
import { state } from "../state.js";
import { Task } from "../contracts.js";

const columns: [keyof Task, string][] = [
    ['id', '#'], 
    ['username', 'Имя'], 
    ['email', 'Email'], 
    ['title', 'Текст']
];

export const tasksHeader = () => `<thead>
<tr>${columns.map(([name, title]) => {
        const arrowDirection = state.sortBy.column === name 
            ? state.sortBy.direction === 'ascending' ? 'down' : 'up'
            : null;
        return `<th class="sortable" id="column-${name}" scope="col" onclick=app.sort('${name}')>${title} ${arrow(arrowDirection)}</th>`
    }).join('')}
</tr>
</thead>`