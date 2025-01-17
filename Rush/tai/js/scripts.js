// Função para adicionar/remover a classe ativa no menu
function setActiveMenuItem() {
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-item');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            menuItems.forEach(item => item.classList.remove('active'));
            menuItems[index].classList.add('active');
        }
    });
}

// Função para detectar quando uma seção entra na tela e aplicar a animação
function animateSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });
}

// Evento de rolagem
window.addEventListener('scroll', () => {
    setActiveMenuItem();  // Atualiza o item ativo do menu
    animateSections();    // Aplica animação nas seções
});

// Evento de clique para rolar até a seção correspondente
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão de link
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

