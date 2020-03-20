import { Task, localStorageItems, PaginationItem } from "./contracts.js";
import { render } from "./main.js";

let renderFn: typeof render

export const init = (_renderFn: typeof render) => {
    renderFn = _renderFn
    renderFn(true)
}

export interface State {
    tasks: Task[],
    sortBy: {
        column: keyof Task,
        direction: 'ascending' | 'descending'
    },
    addTask: {
        validationTriggered: boolean,
        validationFailed: boolean,
        fields: {
            username: string,
            email: string,
            title: string
        }
    },
    pagination: {
        currentPage: number,
        items: PaginationItem[]
    },
    loginStatus: {
        loggedIn: false | {
            username: string,
            isAdmin: boolean
        },
    },
    login: {
        validationTriggered: boolean,
        validationFailed: boolean,
        fields: {
            username: string,
            password: string
        }
    },
    editTask: {
        started: boolean,
        value: string,
        done: boolean,
        taskId: number
    }
}

export const state: DeepReadonly<State> = {
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
        value:''
    }
}

// todo del
Object.assign(window as any, {state})

export const setState = (setter: (state: DeepReadonly<State>) => DeepReadonly<State>, rerender: boolean = true) => {
    Object.assign(state, setter(state))
    return rerender ? renderFn() : Promise.resolve()
}

// https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript
type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};