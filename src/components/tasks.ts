import { task } from "./task.js";
import { state } from "../state.js";

export const tasks = () => {
    return `<tbody>${state.tasks.map(t => task(t)).join('')}</tbody>`
}