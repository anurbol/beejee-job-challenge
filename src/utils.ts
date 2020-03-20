import { State, state, setState } from "./state.js";
import { Task, localStorageItems, PaginationItem, responses } from "./contracts.js";

export const sort = (direction: State['sortBy']['direction']) => direction === 'ascending'
    ? (a: Task, b: Task) => a[state.sortBy.column] > b[state.sortBy.column] ? 1 : -1
    : (a: Task, b: Task) => a[state.sortBy.column] < b[state.sortBy.column] ? 1 : -1

export const updateAddTaskField = (field: keyof State['addTask']['fields']) => (e: HTMLInputElement) => setState(state => {
    const newState = {
        ...state,
        addTask: {
            ...state.addTask,
            fields: {
                ...state.addTask.fields,
                [field as any]: e.value
            }
        }
    }

    localStorage.setItem(localStorageItems.addTask.fields, JSON.stringify(newState.addTask.fields))

    return newState;
}, false)

export const updateLoginField = (field: keyof State['login']['fields']) => (e: HTMLInputElement) => setState(state => {
    const newState = {
        ...state,
        login: {
            ...state.login,
            fields: {
                ...state.login.fields,
                [field as any]: e.value
            }
        }
    }

    localStorage.setItem(localStorageItems.addTask.fields, JSON.stringify(newState.addTask.fields))

    return newState;
}, false)

export const constructPaginationItems = (response: responses.GetTasks): PaginationItem[] => {
    const items: PaginationItem[] = [],
        data = response.data;

    if (data) {
        items.push({
            active: false,
            disabled: data.current_page === 1,
            label: '&laquo;',
            targetPage: 1
        })

        for (let p = 1; p <= data.last_page; p++) {
            if (Math.abs(data.current_page - p) > 3) {
                continue
            }

            items.push({
                active: data.current_page === p,
                disabled: false,
                label: String(p),
                targetPage: p
            })
        }

        items.push({
            active: false,
            disabled: data.current_page === data.last_page,
            label: '&raquo;',
            targetPage: data.last_page
        })
    }




    return items;
}