let productos = [];
let contador = 1;

function seleccionarProducto(nombre, precio) {
    document.getElementById('productoSeleccionado').value = nombre;
    document.getElementById('precioUnitario').value = precio;
}

function anadirProducto() {
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const producto = document.getElementById('productoSeleccionado')?.value || '';
    const precioUnitario = parseFloat(document.getElementById('precioUnitario')?.value || 0);

    if (!producto || isNaN(cantidad) || cantidad <= 0 || isNaN(precioUnitario)) {
        alert('Por favor, seleccione un producto y una cantidad válida.');
        return;
    }

    const precioTotal = cantidad * precioUnitario;
    const nuevoProducto = { id: contador++, nombre: producto, cantidad, precioTotal };

    productos.push(nuevoProducto);
    actualizarTabla();
    calcularTotalGeneral();
    limpiarFormulario();
}

function actualizarTabla() {
    const tbody = document.querySelector('#tablaResultados tbody');
    tbody.innerHTML = '';

    productos.forEach((producto, index) => {
        const fila = `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precioTotal.toFixed(2)}</td>
                <td><button class="action-button" onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarTabla();
    calcularTotalGeneral();
}

function calcularTotalGeneral() {
    const total = productos.reduce((suma, producto) => suma + producto.precioTotal, 0);
    document.getElementById('totalGeneral').textContent = total.toFixed(2);
}

function limpiarFormulario() {
    document.getElementById('cantidad').value = '';
    document.getElementById('productoSeleccionado').value = '';
    document.getElementById('precioUnitario').value = '';
}

// Campos ocultos para almacenar la selección del producto
document.body.insertAdjacentHTML('beforeend', `
    <input type="hidden" id="productoSeleccionado">
    <input type="hidden" id="precioUnitario">
`);