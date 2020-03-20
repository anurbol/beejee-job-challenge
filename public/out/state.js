import { localStorageItems } from "./contracts.js";
let renderFn;
export const init = (_renderFn) => {
    renderFn = _renderFn;
    renderFn(true);
};
export const state = {
    tasks: [],
    sortBy: {
        column: 'id',
        direction: 'ascending'
    },
    addTask: {
        validationTriggered: false,
        validationFailed: false,
        fields: JSON.parse(localStorage.getItem(localStorageItems.addTask.fields) || '""') || {
            username: '',
            email: '',
            title: ''
        },
    },
    pagination: {
        currentPage: 1,
        items: []
    },
    loginStatus: {
        loggedIn: false,
    },
    login: {
        validationTriggered: false,
        validationFailed: false,
        fields: {
            username: '',
            password: ''
        }
    },
    editTask: {
        started: false,
        taskId: -1,
        done: false,
        value: ''
    }
};
// todo del
Object.assign(window, { state });
export const setState = (setter, rerender = true) => {
    Object.assign(state, setter(state));
    return rerender ? renderFn() : Promise.resolve();
};
