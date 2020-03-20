import { state } from "../state.js";
export const logInOut = () => {
    return state.loginStatus.loggedIn
        ? `<div>${state.loginStatus.loggedIn.username} <a href="#" onclick="app.logout()"> Выйти</a></div>`
        : `<a href="#" data-toggle="modal" data-target="#app-modal"> Войти</a>`;
};
