let cardArticles = JSON.parse(localStorage.getItem("cardArticles")) || []
const cardCarrito = document.getElementById("card-carrito")
const totalCarrito = document.getElementById("totalCarrito")

// //mejorar para mantener el carrito actualizado al quitar un artículo.

function renderizarCarrito(cardItems) {
    cardCarrito.innerHTML = ""

    if (cardItems.length === 0) {
        cardCarrito.innerHTML = "<p class='text-center'>El carrito está vacío</p>"
        totalCarrito.innerHTML = "<p class='text-center'>Total: $0</p>"
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
                    <div class="text-center"><img src=".${article.url}" class="card-img-top w-25" alt="${article.nombre}"></div>
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

            cardArticles = cardArticles.filter(
                article => article.id !== id
            )

            localStorage.setItem(
                "cardArticles",
                JSON.stringify(cardArticles)
            )

            renderizarCarrito(cardArticles)
        })
    })
}

const btnVaciar = document.getElementById("vaciarCarrito")

btnVaciar.addEventListener("click", () => {
    cardArticles = []
    localStorage.removeItem("cardArticles")
    renderizarCarrito(cardArticles)
})

renderizarCarrito(cardArticles)