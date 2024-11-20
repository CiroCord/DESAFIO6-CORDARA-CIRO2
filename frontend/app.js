
const API_URL = `https://desafio6-cordara-ciro.onrender.com/api/productoscord`;

async function fetchProductos() {
    try {
        console.log("Llamando a:", API_URL); // Añade este log para verificar la URL
        const response = await fetch(API_URL);
        console.log('Response status:', response.status); // Muestra el código de estado de la respuesta
        if (!response.ok) throw new Error("Error al obtener productos");
        const productos = await response.json();
        console.log("Productos recibidos:", productos); // Confirma que llegan datos
        renderProductos(productos);
    } catch (error) {
        console.error("Error en fetchProductos:", error);
    }
}
function renderProductos(productos) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onclick="verProducto('${producto._id}')">Ver más</button>
        `;
        container.appendChild(div);
    });
}

fetchProductos();

async function verProducto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const producto = await response.json();
        alert(`Detalles: \nNombre: ${producto.nombre}\nDescripción: ${producto.descripcion}\nPrecio: ${producto.precio}`);
    } catch (error) {
        console.error(error);
    }
}

async function modificarProducto(id) {
    const nuevoPrecio = prompt("Ingresa el nuevo precio:");
    if (!nuevoPrecio) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ precio: nuevoPrecio })
        });
        if (!response.ok) throw new Error("Error al modificar el producto");
        alert("Producto modificado correctamente");
        fetchProductos();
    } catch (error) {
        console.error(error);
    }
}

async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Error al eliminar el producto");
        alert("Producto eliminado correctamente");
        fetchProductos();
    } catch (error) {
        console.error(error);
    }
}