
import { tasksTable } from "./components/tasksTable.js";
import { Task, responses, localStorageItems, RequestBody } from "./contracts.js";
import { init, setState, state, State } from "./state.js";
import { pagination } from "./components/pagination.js";
import { addTask } from "./components/addTask.js";
import { sort, updateAddTaskField, constructPaginationItems, updateLoginField } from "./utils.js";
import { modal } from "./components/modal.js";
import { logInOut } from "./components/logInOut.js";

const rootComponents = [tasksTable, pagination, addTask, modal, logInOut];

export const render = (firstTime?: true) => Promise.all(
  rootComponents.map(async component => {

    const
      fullname = `app-${component.name}`,
      el = firstTime
        ? document.getElementsByTagName(fullname)[0]
        : document.getElementById(fullname)!,
      tpl = document.createElement('template'),
      result = component(),
      HTML = result instanceof Promise ? (await result).trim() : result.trim()

    tpl.innerHTML = HTML

    if (tpl.content.childElementCount > 1) {
      tpl.innerHTML = `<section style="display: contents">${HTML}</section>`
    }

    const newEl = tpl.content.firstElementChild!;

    newEl.setAttribute('id', `app-${component.name}`)

    el.replaceWith(newEl)
  })
)

init(render)


const reducers = {
  async fetchUser() {
    const key = localStorage.getItem(localStorageItems.session_key)

    if (key) {
      const response: responses.FetchSession = await (await fetch(`./server/api.php?collection=sessions&key=${key}`)).json(),
        data = response.data

      if (data) {
        await setState(state => ({
          ...state,
          login: {
            fields: {
              username: '',
              password: ''
            },
            validationFailed: false,
            validationTriggered: false
          },
          loginStatus: {
            loggedIn: {
              isAdmin: data.is_admin,
              username: data.username
            }
          }
        }))
      }
    }
  },
  async fetchTasks() {

    const
      orderByDirection = state.sortBy.direction === 'ascending' ? 'asc' : 'desc',
      page = state.pagination.currentPage,
      response: responses.GetTasks = await (await fetch(`./server/api.php?collection=tasks&page=${page}&orderBy=${state.sortBy.column}&direction=${orderByDirection}`)).json(),
      data = response.data

    if (data) {
      const tasks = data.data,
        paginationItems = constructPaginationItems(response)

      tasks.sort(sort(state.sortBy.direction))

      setState(state => ({
        ...state,
        tasks,
        pagination: {
          currentPage: data.current_page,
          items: paginationItems
        }
      }))
    }

  },
  async sort(column: keyof Task) {

    let direction: State['sortBy']['direction'];

    if (state.sortBy.column === column) {

      direction = state.sortBy.direction === 'ascending'
        ? 'descending'
        : 'ascending'
    } else {
      direction = 'ascending'
    }
    await setState(state => ({
      ...state,
      tasks: state.tasks.slice().sort(sort(direction)),
      sortBy: {
        column,
        direction
      },
    }), false)

    await this.fetchTasks();
  },
  addTask: {
    updateUsername: updateAddTaskField('username'),
    updateEmail: updateAddTaskField('email'),
    updateTitle: updateAddTaskField('title'),
    async submit() {

      await setState(state => ({
        ...state,
        addTask: {
          ...state.addTask,
          validationFailed: false,
          validationTriggered: true
        }
      }))

      if (!state.addTask.validationFailed) {

        const response: responses.CreateTask = await (await fetch('./server/api.php', {
          method: 'POST',
          body: new RequestBody('tasks', state.addTask.fields).toJson()
        })).json(),
          created = response.data

        if (created) {

          await setState(state => ({
            ...state,
            addTask: {
              fields: {
                email: '',
                title: '',
                username: ''
              },
              validationFailed: false,
              validationTriggered: false
            }
          }))

          window.alert('Задача создана!');

          // Fetch tasks to refresh the table according to the current sorting settings.
          reducers.fetchTasks()
        }
      }
    }
  },
  async setPage(page: number) {
    await setState(s => ({
      ...s,
      pagination: {
        currentPage: page,
        items: []
      }
    }), false)

    await this.fetchTasks()
  },
  loginForm: {
    updateUsername: updateLoginField('username'),
    updatePassword: updateLoginField('password'),
    async submit() {

      await setState(state => ({
        ...state,
        login: {
          ...state.login,
          validationFailed: false,
          validationTriggered: true
        }
      }), false)

      const modal = document.getElementById('app-modal')!;
      modal.click()
      await render()

      if (state.login.validationFailed) {
        const modalBtn = document.getElementById('app-logInOut')!;
        modalBtn.click()
      } else {

        const response: responses.Login = await (await fetch('./server/api.php?collection=sessions', {
          method: 'POST',
          body: new RequestBody('sessions', state.login.fields).toJson()
        })).json(),
          data = response.data

        if (response.errors.length) {
          const modalBtn = document.getElementById('app-logInOut')!;
          modalBtn.click()
          alert(response.errors.join('\n'))
        }

        if (data) {

          localStorage.setItem(localStorageItems.session_key, data.session_key);

          await setState(state => ({
            ...state,
            login: {
              fields: {
                username: '',
                password: ''
              },
              validationFailed: false,
              validationTriggered: false
            },
            loginStatus: {
              loggedIn: {
                isAdmin: data.is_admin,
                username: data.username
              }
            }
          }), false)

          const modal = document.getElementById('app-modal')!;
          modal.click()
          await render()
        }
      }
    }
  },
  async logout() {

    const sessionKey = localStorage.getItem(localStorageItems.session_key)
    localStorage.removeItem(localStorageItems.session_key);

    if (sessionKey) {
      const response: responses.Logout = await (await fetch('./server/api.php', {
        method: 'DELETE',
        body: new RequestBody('sessions', sessionKey).toJson()
      })).json()

      if (response.data?.logged_out) {
        setState(state => ({
          ...state,
          loginStatus: {
            loggedIn: false
          }
        }))
      } else {
        alert('Ошибка')
      }
    }
  },
  editTask: {
    updateField(e: HTMLInputElement) {
      setState(state => ({
        ...state,
        editTask: {
          ...state.editTask,
          value: e.value
        }
      }), false)
    },
    async startEdit(taskId: number) {

      const task = state.tasks.find(t => t.id === taskId)!;

      await setState(state => ({
        ...state,
        editTask: {
          taskId,
          started: true,
          value: task.title,
          done: task.done
        }
      }))

      const input = document.querySelector(`input[data-edit-task="${taskId}"]`)! as HTMLElement;
      input.focus()

    },
    async save() {
      const task = state.tasks.find(t => t.id === state.editTask.taskId)!;
      const newTask: Task = { ...task, title: state.editTask.value },
        session_key = localStorage.getItem(localStorageItems.session_key)

        const response: responses.UpdateTask = await (await fetch('./server/api.php', {
          method: 'PATCH',
          body: new RequestBody('tasks', {
            session_key,
            task: newTask
          }).toJson()
        })).json()

        if (response.errors.length) {
          alert(response.errors.join('\n'))
        } else if (!response.data || !response.data.updated) {
          alert("Произошла ошибка")
        } else {
          await setState(s => ({
            ...s,
            tasks: s.tasks.map(t => t.id === task.id ? response.data!.task : t),
            editTask: {
              started: false,
              taskId: -1,
              value: '',
              done: false
            }
          }))
        }
    },
    cancel() {
      setState(s => ({
        ...s,
        editTask: {
          started: false,
          taskId: -1,
          value: '',
          done: false
        }
      }))
    }
  },
  async completeTask(taskId: number) {
    const task = state.tasks.find(t => t.id === taskId)!;
    const newTask: Task = { ...task, done: !task.done },
      session_key = localStorage.getItem(localStorageItems.session_key)

    const response: responses.UpdateTask = await (await fetch('./server/api.php', {
      method: 'PATCH',
      body: new RequestBody('tasks', {
        session_key,
        task: newTask
      }).toJson()
    })).json()

    if (response.errors.length) {
      alert(response.errors.join('\n'))
    } else if (!response.data || !response.data.updated) {
      alert("Произошла ошибка")
    } else {
      await setState(s => ({
        ...s,
        tasks: s.tasks.map(t => t.id === task.id ? response.data!.task : t),
      }))
    }
  }
};

(window as any).app = reducers;

reducers.fetchUser()
reducers.fetchTasks()
