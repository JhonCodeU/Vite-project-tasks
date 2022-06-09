import { v4 } from 'uuid'
import Toastify from 'toastify-js'

import "toastify-js/src/toastify.css"
import './style.css';

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  id: string
  title: string;
  description: string;
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  const title = taskForm['title'] as unknown as HTMLFormElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  tasks.push({
    id: v4(),
    title: title.value,
    description: description.value
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

  Toastify({
    text: 'Task added',
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast()

  rederTask(tasks)

  taskForm.reset()
  title.focus()
})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  rederTask(tasks)
})

function rederTask(tasks: Task[]) {

  taskList!.innerHTML = ''

  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 rounded-lg p-4 hover:bg-zinc-700 hover:cursor-pointer'

    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('span')
    title.innerText = task.title

    const btnDelete = document.createElement('button')
    btnDelete.className = 'bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md'
    btnDelete.innerText = 'Delete'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))

      Toastify({
        text: 'Task deleted',
        duration: 3000,
        style: {
          background: "linear-gradient(to right,  #C70039 , #FF5733)",
        }
      }).showToast()

      rederTask(tasks)
    })
    
    header.append(title)
    header.append(btnDelete)
    
    const description = document.createElement('p')
    description.innerText = task.description
    
    taskElement.append(header)
    taskElement.append(description)

    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400 text-xs'
    taskElement.append(id)

    taskList?.append(taskElement)
  })
};