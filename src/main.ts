import './style.css';

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  title: string;
  description: string;
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  const title = taskForm['title'] as unknown as HTMLFormElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  tasks.push({
    title: title.value,
    description: description.value
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

  rederTask(tasks)

  taskForm.reset()
  title.focus()
})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  console.log(tasks);
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
    
    header.append(title)
    header.append(btnDelete)
    
    const description = document.createElement('p')
    description.innerText = task.description
    
    taskElement.append(header)
    taskElement.append(description)

    taskList?.append(taskElement)
  })
};