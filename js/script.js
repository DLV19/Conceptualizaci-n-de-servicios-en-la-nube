// =========================================================
// Script compartido por todas las páginas.
// Cada bloque revisa si su elemento existe antes de usarlo,
// así el mismo archivo funciona en index y en las páginas de producto.
// =========================================================

// --- 1. Menú móvil ---
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const abierto = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!abierto));
        nav.classList.toggle('is-open', !abierto);
    });

    // Cierra el menú al elegir una opción
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });
}

// --- 2. Año actual en el footer ---
document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
});

// --- 3. Partículas del hero (solo en index) ---
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (document.getElementById('particles-js') && window.particlesJS && !reduceMotion) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 45, density: { enable: true, value_area: 900 } },
            color: { value: '#faa634' },
            shape: { type: 'circle' },
            opacity: { value: 0.45, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#faa634', opacity: 0.25, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false } },
            modes: { grab: { distance: 160, line_linked: { opacity: 0.5 } } }
        },
        retina_detect: true
    });
}

// --- 4. Formulario de contacto ---
const form = document.getElementById('contact-form');

if (form) {
    // Si llegamos desde una página de producto (index.html?producto=nominas#contacto)
    // preseleccionamos ese producto en el formulario.
    const productoURL = new URLSearchParams(window.location.search).get('producto');
    const selectProducto = form.querySelector('#producto');
    if (productoURL && selectProducto.querySelector(`option[value="${productoURL}"]`)) {
        selectProducto.value = productoURL;
    }

    const mensajes = {
        nombre: 'Escribe tu nombre.',
        telefono: 'Escribe un teléfono de 10 dígitos.',
        email: 'Escribe un correo válido, por ejemplo nombre@empresa.com.'
    };

    function validarCampo(input) {
        const error = document.getElementById(`${input.id}-error`);
        const valido = input.checkValidity();
        input.setAttribute('aria-invalid', String(!valido));
        if (error) error.textContent = valido ? '' : mensajes[input.id] || 'Revisa este campo.';
        return valido;
    }

    form.querySelectorAll('input[required]').forEach((input) => {
        input.addEventListener('blur', () => validarCampo(input));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const requeridos = [...form.querySelectorAll('input[required]')];
        const todosValidos = requeridos.map(validarCampo).every(Boolean);
        if (!todosValidos) {
            requeridos.find((i) => !i.checkValidity()).focus();
            return;
        }

        // No hay backend: armamos un correo con los datos y lo abrimos
        // en la app de correo de la persona.
        const datos = new FormData(form);
        const cuerpo = [
            `Nombre: ${datos.get('nombre')}`,
            `Teléfono: ${datos.get('telefono')}`,
            `Correo: ${datos.get('email')}`,
            `Empresa: ${datos.get('empresa') || '-'}`,
            `Ciudad: ${datos.get('ciudad') || '-'}`,
            `Producto de interés: ${selectProducto.selectedOptions[0].text}`,
            '',
            datos.get('mensaje') || ''
        ].join('\n');

        const asunto = `Solicitud de información: ${selectProducto.selectedOptions[0].text}`;
        window.location.href =
            `mailto:angelica@ssi.mx?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

        const status = document.getElementById('form-status');
        status.hidden = false;
        status.textContent = 'Abrimos tu app de correo con tus datos. Solo presiona enviar para mandarnos la solicitud.';
    });
}
