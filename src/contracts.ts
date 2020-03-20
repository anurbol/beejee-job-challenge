export interface Task {
    id: number
    username: string
    email: string
    title: string
    done: boolean
    edited_by_admin: boolean
}

export interface ValidationRule {
    validator: (val: any) => ValidationResult 
}

interface ValidationResult {
    errors: string[]
}

export interface Response {
    errors: string[],
    data?: any
}

export namespace responses {
    export interface GetTasks extends Response {
        data?: {
            current_page: number
            last_page: number
            data: Task[]
        }
    }

    export interface CreateTask extends Response {
        data?: Task
    }
    
    export interface UpdateTask extends Response {
        data?: {
            updated: boolean,
            task: Task
        }
    }

    export interface FetchSession extends Response {
        data?: {
            username: string,
            is_admin: boolean
        }
    }

    export interface Login extends Response {
        data?: {
            session_key: string,
            username: string,
            is_admin: boolean
        }
    }
    export interface Logout extends Response {
        data?: {
            logged_out: boolean
        }
    }
}

export const localStorageItems = {
    addTask: {
        fields: 'addTaskFields'
    },
    session_key: 'session_key'
}

type Collection = 'tasks' | 'sessions'

export class RequestBody {
    constructor(public collection: Collection, public payload: any) {
    }

    toJson() {
        return JSON.stringify(this)
    }
}

export interface PaginationItem {
    label: string, 
    targetPage: number, 
    active: boolean,
    disabled: boolean
}