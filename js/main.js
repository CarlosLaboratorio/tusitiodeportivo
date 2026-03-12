let productos = []

// Mejora para mantener el carrito actualizado al agregar un nuevo artículo. 

let cardArticle = JSON.parse(localStorage.getItem("cardArticles")) || []

let articleContainer = document.getElementById("article-container")

const URL = "./db/data.json"
function obtenerProductos () {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            productos = data
            renderizarArticulos(productos)
        })
        .catch((err)=>console.log("Hubo un error",err))
        .finally(()=>console.log("Finalizo la peticion"))
}

function renderizarArticulos(articlesArray) {
    articleContainer.innerHTML = ""

    const row = document.createElement("div")
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4"
    articleContainer.appendChild(row)
    articlesArray.forEach(article => {
        const card = document.createElement("div")
        card.className = "col"
        // Al hacer clic en el botón, se obtiene el id del artículo, se encuentra en el array productosDeportivos y se agrega al array cardArticle.
        card.innerHTML = `
            <div class="card h-100 border-dark bg-light text-dark">
                <div class="card-body d-flex flex-column justify-content-between text-center">
                    <h3 class="card-header">${article.nombre}</h3>
                    <div class="text-center"><img src="${article.url}" class="card-img-top w-25 zoom-img" alt="${article.nombre}"></div>
                    <h4 class="card-text">Precio: $${article.precio}</h4>
                    <h4 class="card-text">Categoria: ${article.deporte}</h4>
                    <button class="articleAdd btn btn-primary" id="${article.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `
        row.appendChild(card)
    })
    // Se agregó la función agregarAlCarrito() que se llama después de renderizar los artículos para asignar el evento onclick a cada botón de agregar al carrito.
    agregarAlCarrito()
}

obtenerProductos()

function agregarAlCarrito () {
    const addButtons = document.querySelectorAll(".articleAdd")

    addButtons.forEach(button => {
        button.addEventListener("click", (evento) => {
            const articleId = Number(evento.currentTarget.id)
            const selectedArticle = productos.find(
                article => article.id == articleId
            )

            cardArticle.push(selectedArticle)

            localStorage.setItem(
                "cardArticles",
                JSON.stringify(cardArticle)
            )

            Toastify({
                text: `✔ ${selectedArticle.nombre} agregado al carrito`,
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "#2ecc71"
                }
            }).showToast();
        })
    })
}