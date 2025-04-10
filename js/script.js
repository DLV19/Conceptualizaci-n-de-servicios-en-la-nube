
// al hacer click en la imagen redirige a otros html (contabilidad factura electronica y nominas)

const contabilidad = document.getElementById('contabilidad');
contabilidad.addEventListener('click', function () {
    // Redirige al archivo local contabilidad.html
    window.location.href = 'contabilidad.html';
});

const facturaE = document.getElementById('factura-electronica');
facturaE.addEventListener('click', function () {
    // Redirige al archivo local facturaE.html.html
    window.location.href = 'facturaE.html';
});
const nomina = document.getElementById('nomina');
nomina.addEventListener('click', function () {
    window.location.href = 'nominas.html';
});


// particulas

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#faa634"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false
        },
        "size": {
            "value": 6,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#faa634",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        }
    },
    "retina_detect": true
});