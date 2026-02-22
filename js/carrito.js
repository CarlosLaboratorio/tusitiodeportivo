let cardArticles = JSON.parse(localStorage.getItem("cardArticles")) || []
const cardCarrito = document.getElementById("card-carrito")
const totalCarrito = document.getElementById("totalCarrito")

// mejorar para mantener el carrito actualizado al quitar un artículo.

function renderizarCarrito(cardItems) {
    cardCarrito.innerHTML = ""

    if (cardItems.length === 0) {
        cardCarrito.innerHTML = "<p class='text-center'>El carrito está vacío</p>"
        totalCarrito.innerHTML = "<p class='text-center'>Total: $0</p>"
        btnVaciar.disabled = true
        btnComprar.disabled = true
        return
    }

    const row = document.createElement("div")
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4"
    cardCarrito.appendChild(row)

    cardItems.forEach(article => {
        const card = document.createElement("div")
        card.className = "col"

        card.innerHTML = `
            <div class="card h-100 border-dark bg-light text-dark">
                <div class="card-body d-flex flex-column justify-content-between text-center">
                    <h3 class="card-header">${article.nombre}</h3>
                    <div class="text-center"><img src=".${article.url}" class="card-img-top w-25 zoom-img" alt="${article.nombre}"></div>
                    <h4 class="card-text">Precio: $${article.precio}</h4>
                    <h4 class="card-text">Categoria: ${article.deporte}</h4>
                    <button class="articleRemove btn btn-secondary" data-id="${article.id}">
                        Quitar del Carrito
                    </button>
                </div>
            </div>
        `
        row.appendChild(card)
    })

    actualizarTotal(cardItems)
    agregarEventosEliminar()
}

function actualizarTotal(items) {
    const total = items.reduce((sum, item) => sum + item.precio, 0)
    totalCarrito.textContent = `Total: $${total}`
}

function agregarEventosEliminar() {
    const removeButtons = document.querySelectorAll(".articleRemove")

    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.dataset.id)
            Swal.fire({
                    title: "Eliminar producto",
                    text: `Esta acción borra ${cardArticles.find(article => article.id === id)?.nombre || "el producto" } de tu carrito`,
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    showCancelButton: true,
                    confirmButtonText: "Sí, borrar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                if (result.isConfirmed) {
                    
                    const nombreProductoEliminado = cardArticles.find(article => article.id === id)?.nombre || "el producto"

                    const index = cardArticles.findIndex(article => article.id === id)

                    if (index !== -1) {
                        cardArticles.splice(index, 1)
                    }


                    localStorage.setItem(
                        "cardArticles",
                        JSON.stringify(cardArticles)
                    )

                    renderizarCarrito(cardArticles)

                    Swal.fire({
                    title: "Producto borrado!",
                    text: `Se borro ${nombreProductoEliminado} de tu carrito`,
                    showConfirmButton: false,
                    timer: 2500,
                    icon: "success"
                    })
                }
                })
            })
    })
}

const btnVaciar = document.getElementById("vaciarCarrito")
const btnComprar = document.getElementById("comprarBtn")

btnVaciar.addEventListener("click", () => {
    Swal.fire({
            title: "Vaciar Carrito",
            text: "Esta acción borra todos sus articulos elegidos",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
    if (result.isConfirmed) {
        cardArticles = []
        localStorage.removeItem("cardArticles")
        renderizarCarrito(cardArticles)
        Swal.fire({
        title: "Carrito Vacio!",
        text: "Articulos borrados de tu carrito",
        showConfirmButton: false,
        timer: 2500,
        icon: "success"
    });
    }
});
})

btnComprar.addEventListener("click", async () => {

    // if (cardArticles.length === 0) return

    const { value: formValues } = await Swal.fire({
        title: "Finalizar Compra",
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
            <input id="swal-apellido" class="swal2-input" placeholder="Apellido">
            <input id="swal-email" type="email" class="swal2-input" placeholder="Email">
            <input id="swal-domicilio" class="swal2-input" placeholder="Domicilio">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {

            const nombre = document.getElementById("swal-nombre").value
            const apellido = document.getElementById("swal-apellido").value
            const email = document.getElementById("swal-email").value
            const domicilio = document.getElementById("swal-domicilio").value

            if (!nombre || !apellido || !email || !domicilio) {
                Swal.showValidationMessage("Debe completar todos los campos")
                return
            }

            return { nombre, email }
        }
    })

    if (!formValues) return

    // Calcular total
    const total = cardArticles.reduce((acc, item) => acc + item.precio, 0)

    // Limpiar carrito
    cardArticles = []
    localStorage.setItem("cardArticles", JSON.stringify(cardArticles))

    renderizarCarrito(cardArticles)

    await Swal.fire({
        title: `¡Gracias ${formValues.nombre}! 🎉`,
        html: `
            <p>Operación realizada con éxito.</p>
            <p>Total a abonar: <strong>$${total}</strong></p>
            <p>DATOS PARA TRANSFERENCIA</p>
            <p>Alias: <strong>carlos.anibal.37</strong></p>
            <p>Enlace de Confirmación y datos enviada a: ${formValues.email}</p>
        `,
        icon: "success"
    })
})

renderizarCarrito(cardArticles)