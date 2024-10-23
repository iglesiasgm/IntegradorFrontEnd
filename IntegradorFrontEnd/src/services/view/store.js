import { abrirModal, setProductoActivo } from "../../../main"
import { handleGetProductLocalStorage } from "../persistence/localStorage"

export const handleGetProductsToStore = ()=>{
    const products = handleGetProductLocalStorage()
    handleRenderList(products)
}

export const handleRenderList = (productosIn)=>{
    const burgers = productosIn.filter((el)=>el.categories==="Hamburguesas")
    const papas = productosIn.filter((el)=>el.categories==="Papas")
    const gaseosas = productosIn.filter((el)=>el.categories==="Gaseosas")

    const renderProductGroup = (productos, title)=>{
        console.log(productos.length)
        if(productos.length>0){
            const productosHTML = productos.map((producto, index)=>{
                return `<div class="containerTargetItem" id="product-${producto.categories}-${index}"> 
                                    <img src=${producto.imagen}/>   
                                    <h2>${producto.nombre}</h2>
                                    <p><b class="textoTarjeta">Precio:</b> $${producto.precio}</p>
                                    <p><b class="textoTarjeta">Categoria:</b> ${producto.categories}</p>
                        </div>`
            })

            return `
            <section class="sectionStore">
            <h3>${title}</h3>
            <div class="containerProductStore">
            ${productosHTML.join("")}
            </div>
            </section>
            `

        }else{
            console.log("else")
            return ""
        }

    }

    const appContainer = document.getElementById("storeContainer")
    appContainer.innerHTML = `
    
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `
    const addEvents = (productosIn)=>{
        productosIn.forEach((element, index) => {
            const productContainer = document.getElementById(`product-${element.categories}-${index}`)
                productContainer.addEventListener("click", ()=>{
                    console.log("productoActivo", element)
                    setProductoActivo(element);
                    abrirModal();
                })
        });
    }
    addEvents(burgers)
    addEvents(papas)
    addEvents(gaseosas)
}