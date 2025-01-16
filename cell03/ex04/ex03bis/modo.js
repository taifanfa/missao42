// CARREGAR AS TAREFAS SALVAS NOS COOKIES
function loadTasks() {
    const tasks = getCookie('tasks');
    if (tasks) {
        const taskList = JSON.parse(tasks);
        taskList.forEach(task => addTaskToDOM(task));
    }
}

// SALVAR AS TAREFAS NOS COOKIES
function saveTasks() {
    const taskElements = document.querySelectorAll('.tarefa');
    const tasks = [];
    taskElements.forEach(task => {
        tasks.push(task.textContent);
    });
    setCookie('tasks', JSON.stringify(tasks), 7); // CONDIÇÃO - SALVA POR 7 DIAS
}

// OBTER UM COOKIE PELO NOME
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// CONFIGURAR COOKIE
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// ADICIONAR TAREFA NO DOM
function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tarefa');
    taskDiv.textContent = task;
    taskDiv.onclick = function() {
        if (confirm('Deseja remover esta tarefa?')) {
            taskDiv.remove();
            saveTasks();
        }
    };
    const taskList = document.getElementById('ft_list');
    taskList.insertBefore(taskDiv, taskList.firstChild); // ADICIONA AO TOPO
}

// ADICIONAR UMA NOVA TAREFA
function addNewTask() {
    const task = prompt('Digite a nova tarefa:');
    if (task && task.trim() !== '') {
        addTaskToDOM(task.trim());
        saveTasks();
    } else {
        alert('Tarefa não pode ser vazia!');
    }
}

// BOTÃO
document.getElementById('addTaskBtn').onclick = addNewTask;

// CARREGAR TAREFAS AO CARRECAR PÁGINA
loadTasks();
