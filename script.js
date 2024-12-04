// Alternância de Modo Claro/Escuro
const toggleMode = document.getElementById('modeToggle');
const body = document.body;

// Verifica e aplica a preferência de tema salva no localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Alterna entre modo claro e escuro
toggleMode.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Scroll Suave para Navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal - Animações ao Rolagem
const revealElements = document.querySelectorAll('.reveal');
window.addEventListener('scroll', function () {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            element.classList.add('active');
        }
    });
});

// Carrossel de Depoimentos
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = (index === currentIndex) ? 'block' : 'none';
    });
    currentIndex = (currentIndex + 1) % testimonials.length;
}
setInterval(showTestimonial, 5000);
showTestimonial();

// Formulário de Contato com Validação
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if (!email || !message) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação simples de e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    alert("Mensagem enviada com sucesso!");
});

// Menu de Navegação Fixo (Sticky)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Notificação de Boas-Vindas
if (!localStorage.getItem('visited')) {
    alert("Bem-vindo ao nosso site! Esperamos que você tenha uma ótima experiência.");
    localStorage.setItem('visited', 'true');
}

// Animação de Scroll (Parallax)
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', function () {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// Pesquisa Interativa
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('.searchable');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Animação de Carregamento
window.addEventListener('load', function () {
    const loader = document.getElementById("loader");
    loader.style.display = 'none'; // Esconde o carregamento após o site carregar
});

// Função original do formulário
document.getElementById("adminForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtendo valores do formulário
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").files[0];
    const video = document.getElementById("video").files[0];

    // Atualizando o Preview
    document.getElementById("previewDescricao").innerText = descricao;

    // Preview da Foto
    if (foto) {
        const fotoPreview = document.getElementById("previewFoto");
        fotoPreview.src = URL.createObjectURL(foto);
        fotoPreview.style.display = "block";
    } else {
        document.getElementById("previewFoto").style.display = "none";
    }

    // Preview do Vídeo
    if (video) {
        const videoPreview = document.getElementById("previewVideo");
        videoPreview.src = URL.createObjectURL(video);
        videoPreview.style.display = "block";
    } else {
        document.getElementById("previewVideo").style.display = "none";
    }

    alert("Conteúdo salvo com sucesso! (Este é apenas um exemplo, funcionalidade completa exigirá backend)");
});
