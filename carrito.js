// Aquí procedemos a coger el elemento donde vamos a poner la lista de productos, y por cada objeto almacenado
//en local storage, le añadimos una linea con los datos
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
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            `;
            listaCarrito.appendChild(tr);
        });
    }

    //Y la función para poder eliminar los productos del carro
    window.eliminarProducto = function(index) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        alert('Producto eliminado del carrito');
    }
});