// Alternância de Modo Claro/Escuro
const toggleMode = document.getElementById('modeToggle');
const body = document.body;

function setTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
}

if (localStorage.getItem('theme') === 'dark') {
    setTheme('dark');
}

toggleMode.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Scroll Suave para Navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Reveal - Animações ao Rolagem com IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
const observerOptions = { threshold: 0.1 };

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
revealElements.forEach(element => observer.observe(element));

// Carrossel de Depoimentos
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = (index === currentIndex) ? 'block' : 'none';
    });
    currentIndex = (currentIndex + 1) % testimonials.length;
}

let testimonialInterval = setInterval(showTestimonial, 5000);
showTestimonial();

// Adicionar a interação com o carrossel
document.getElementById('nextTestimonial').addEventListener('click', () => {
    clearInterval(testimonialInterval);
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial();
    testimonialInterval = setInterval(showTestimonial, 5000);
});

// Validação de Formulário de Contato com Mensagens de Erro
document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!email.value || !message.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email.value)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    alert("Mensagem enviada com sucesso!");
});

// Menu de Navegação Fixo (Sticky)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('sticky', window.scrollY > 0);
});

// Notificação de Boas-Vindas
if (!localStorage.getItem('visited')) {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = 'Bem-vindo ao nosso site! <button id="closeWelcome">X</button>';
    document.body.appendChild(welcomeMessage);
    document.getElementById('closeWelcome').addEventListener('click', () => {
        welcomeMessage.remove();
    });
    localStorage.setItem('visited', 'true');
}

// Animação de Scroll (Parallax)
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// Pesquisa Interativa
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.searchable').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
});

// Animação de Carregamento
window.addEventListener('load', () => {
    const loader = document.getElementById("loader");
    loader.style.display = 'none'; 
});

// Função original do formulário de Admin
document.getElementById("adminForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").files[0];
    const video = document.getElementById("video").files[0];

    document.getElementById("previewDescricao").innerText = descricao;

    if (foto) {
        const fotoPreview = document.getElementById("previewFoto");
        fotoPreview.src = URL.createObjectURL(foto);
        fotoPreview.style.display = "block";
    } else {
        document.getElementById("previewFoto").style.display = "none";
    }

    if (video) {
        const videoPreview = document.getElementById("previewVideo");
        videoPreview.src = URL.createObjectURL(video);
        videoPreview.style.display = "block";
    } else {
        document.getElementById("previewVideo").style.display = "none";
    }

    alert("Conteúdo salvo com sucesso!");
});
