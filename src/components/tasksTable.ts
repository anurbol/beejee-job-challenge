import { tasksHeader } from "./tasksHeader.js";
import { tasks } from "./tasks.js";

export const tasksTable = async () => {

    return `<table class="table">
            ${tasksHeader()}
            ${tasks()}
    </table>`
}