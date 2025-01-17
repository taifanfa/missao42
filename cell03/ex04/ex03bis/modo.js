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
    const tasks = $('.tarefa').map(function() {
        return $(this).text();
    }).get();
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
    const taskDiv = $('<div>').addClass('tarefa').text(task);
    taskDiv.on('click', function() {
        if (confirm('Deseja remover esta tarefa?')) {
            $(this).remove();
            saveTasks();
        }
    });
    $('#ft_list').prepend(taskDiv); // ADICIONA AO TOPO
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
$(document).ready(function() {
    $('#addTaskBtn').on('click', addNewTask);
});

// CARREGAR TAREFAS AO CARRECAR PÁGINA
$(document).ready(function() {
    loadTasks();
});

// document.querySelectorAll() -> $('.tarefa')
// document.createElement() -> $('<div>')
// classList.add() -> addClass()
// textContent -> text()
// onclick -> on('click')
// insertBefore() -> prepend()
// remove() foi mantido, pois já é compatível com jQuery
// document.getElementById('addTaskBtn').onclick -> $(document).ready()