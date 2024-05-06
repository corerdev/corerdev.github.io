//Añadimos un listener al documento para que al pulsar tanto el botón control como el botón H
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.code === 'KeyH') {
        event.preventDefault();
        window.scrollTo({
            //Nos lleve a la posición 0 de la pagina, de forma suave y sedosa
            top: 0,
            behavior: 'smooth'
        });
    }
});

//Aquí simplemente ponemos una función que, al ser llamada, comprueba el display de otro elemento y lo cambia según la situación

function menuShow() {
  let element = document.getElementById('menu');
  
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
};

//Esta función simplemente comprueba si hemos bajado, y si lo hacemos, pone el botón para volver arriba visible o invisible

window.onscroll = function() {
    let backToTopButton = document.getElementById('hellYeahLetsGoTop');
    
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

//La función que hace que el botón de subir nos suba hacia arriba

function letsGoTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

//Pequeña función para hacer que nuestro carrousel vaya pasando las imágenes

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    const x = -currentSlide * 100;
    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.style.transform = `translateX(${x}%)`;
}

// Parte del carrito. Esta función nos permite que al cargar la página, cada botón se ponga con la función correspondiente. Al
//hacer click, se cogen los atributos custom del padre y se almacenan en variables que luego se guardan como un item
//en localstorage, o aumentan la cantidad de ese objeto si ya estaba. 

document.addEventListener('DOMContentLoaded', function() {
    const botonesAñadir = document.querySelectorAll('.añadirCesta');

    botonesAñadir.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const producto = this.parentNode;
            const id = producto.getAttribute('data-id');
            const nombre = producto.getAttribute('data-nombre');
            const precio = producto.getAttribute('data-precio');

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let productoEncontrado = carrito.find(p => p.id === id);

            if (productoEncontrado) {
                productoEncontrado.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto añadido al carrito');
        });
    });
});

//He copiado el codigo que usaba en el carrito.js para hacer el menu que aparece en el carrito.

document.addEventListener('DOMContentLoaded', function() {
    const listaCarrito = document.getElementById('lista-carrito');
    mostrarCarrito();

    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        listaCarrito.innerHTML = ''; // Limpiamos la lista antes de mostrarla

        carrito.forEach((producto, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio * producto.cantidad}</td>
            `;
            listaCarrito.appendChild(tr);
        });
    }});