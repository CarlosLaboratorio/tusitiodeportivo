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

                    // Cambiamos este código por el findIndex y splice para eliminar elemento por indice y que se mantengan otros productos de igual id
                    // cardArticles = cardArticles.filter(
                    //     article => article.id !== id
                    // )

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
        icon: "success"
    });
    }
});
})

// btnComprar.addEventListener("click", () => {

//     // if (cardArticles.length === 0) return

//     Swal.fire({
//         title: "Confirmar compra",
//         text: "¿Desea finalizar la compra?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Sí, quiero comprar",
//         cancelButtonText: "Cancelar"
//     }).then((result) => {

//         if (result.isConfirmed) {

//             // Limpiar array
//             cardArticles = []

//             // Limpiar storage
//             // localStorage.removeItem("cardArticles")
//             localStorage.setItem("cardArticles", JSON.stringify(cardArticles))

//             // Re-renderizar
//             renderizarCarrito(cardArticles)

//             Swal.fire({
//                 title: "¡Gracias por tu compra!",
//                 text: "Tu pedido fue procesado correctamente.",
//                 icon: "success"
//             })
//         }
//     })
// })

btnComprar.addEventListener("click", async () => {

    // if (cardArticles.length === 0) return

    const { value: formValues } = await Swal.fire({
        title: "Finalizar Compra",
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
            <input id="swal-email" type="email" class="swal2-input" placeholder="Email">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {

            const nombre = document.getElementById("swal-nombre").value
            const email = document.getElementById("swal-email").value

            if (!nombre || !email) {
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
            <p>Compra realizada con éxito.</p>
            <p>Total abonado: <strong>$${total}</strong></p>
            <p>Confirmación enviada a: ${formValues.email}</p>
        `,
        icon: "success"
    })
})

renderizarCarrito(cardArticles)