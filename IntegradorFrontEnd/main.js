import { renderCategories } from "./src/services/categories";
import { handleGetProductLocalStorage, setInLocalStorage } from "./src/services/persistence/localStorage";
import { handleSearchProductsByName } from "./src/services/searchBar";
import { handleGetProductsToStore, handleRenderList } from "./src/services/view/store";
import "./style.css";

export let categoriaActiva = null
export const setCategoriaActiva = (categoriaIn)=>{
  categoriaActiva = categoriaIn;
}


export let productoActivo = null
export const setProductoActivo = (productoIn)=>{
  productoActivo = productoIn;
}

handleGetProductsToStore();
renderCategories();

/*===POPUP===*/

const modal = document.getElementById("modal")
const openModal = document.getElementById("openModal")
const closeModal = document.getElementById("closeModal")
const cancelButton = document.getElementById("cancelButton")

export const abrirModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  if(productoActivo){
    const nombre = document.getElementById("nombre")
    const imagen = document.getElementById("img")
    const precio = document.getElementById("precio")
    const categories = document.getElementById("categoria");
    nombre.value =  productoActivo.nombre
    imagen.value = productoActivo.imagen;
    precio.value =  productoActivo.precio
    categories.value = productoActivo.categories;
  }

};

openModal.addEventListener("click", () => {
  abrirModal();
});


export const cerrarModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  setProductoActivo(null);
};

closeModal.addEventListener("click", () => {
  cerrarModal();
});

const resetModal = ()=>{
  const nombre = document.getElementById("nombre")
  const imagen = document.getElementById("img")
  const precio = document.getElementById("precio")
  const categories = document.getElementById("categoria");
  nombre.value=""
  imagen.value=""
  precio.value=0
  categories.value="Seleccione una categoría"
}

const deleteButton = document.getElementById("deleteButton")
deleteButton.addEventListener("click", ()=>{
  handleButtonDelete()
})

const handleButtonDelete =()=>{
  handleDeleteProduct()
}

cancelButton.addEventListener("click", ()=>{
    modal.close()
    resetModal()
})

//GUARDAR O MODIFICAR ELEMENTOS

const acceptButton = document.getElementById("acceptButton")

acceptButton.addEventListener("click", ()=>{
  handleSaveOrModifyElements()
  modal.close()
})

const handleSaveOrModifyElements = ()=>{
  const nombre = document.getElementById("nombre").value
  const imagen = document.getElementById("img").value
  const precio = document.getElementById("precio").value
  const categories = document.getElementById("categoria").value;
  let object = null
  if(productoActivo){
    object = {
      ...productoActivo,
      nombre,
      imagen,
      precio,
      categories
    }
  }else{
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categories
    }
  }
  handleGetProductsToStore()
  setInLocalStorage(object)
}


//====Button Search

const buttonSearch = document.getElementById("buttonSearch");
buttonSearch.addEventListener("click", ()=>{
  handleSearchProductsByName();
})

export const handleDeleteProduct =()=>{
  const products = handleGetProductLocalStorage()
  const result = products.filter((el)=>el.id!==productoActivo.id)
  localStorage.setItem("products", JSON.stringify(result))
  const newProducts = handleGetProductLocalStorage()
  handleRenderList(newProducts)
}