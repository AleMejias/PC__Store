# PC-STORE
Es una tienda fictia de productos para computadoras, la cual nos permite interactuar con los productos, ver sus caractericisticas, simular una compra y obtener una orden de compra ficticia.


Se usaron dependencias externas como:

1. React-bootstrap ( header y formulario de compra )
2. Font-awesome
3. Google fonts
3. Sass
4. **Firebase** como base de datos para los productos y para generar una **orden** de compra

# Componentes

### **ItemListContainer** : Este componente tiene como propósito ser el Home del sitio web, pero tambien de mostrar los productos segun la categoria recibida mediante parametros de la url
---
```javascript
  const { paramCategory } = useParams();
```
---
**Al cargar dicho componente hacemos uso del hook UseEffect para obtener/almacenar los productos provenientes desde firebase**
---
```javascript
  useEffect(() => {

    const getItemsCollection = () =>
    dataBase.collection("items").get().then((querySnapShot) => querySnapShot.docs);

    const getItemsCollectionByCategory = (paramCategory) =>
    dataBase.collection("items").where("category", "==", `${paramCategory}`).get().then((querySnapShot) => querySnapShot.docs);

    const getItemsFromFireBase = async () => {
      setLoadingPage(false);
      const data = []; 
      let responseFromFireBase; 
      (paramCategory === undefined)
        ? (responseFromFireBase = await getItemsCollection())
        : (responseFromFireBase = await getItemsCollectionByCategory(paramCategory));
      
      responseFromFireBase.map((element) =>
        data.push({ id: element.id, ...element.data() })
      );
      setItem(data);
      setLoadingPage(true);
    };
  const deleteOrdersFromFireBase = async() => {
      const itemsToDelete = await dataBase.collection('order').get().then((querySnapShot) => querySnapShot.docs);
       itemsToDelete.map( (element) => (     
        deleteItemFromFireBase(element.id)
      ))
  }
    getItemsFromFireBase();
    deleteOrdersFromFireBase();
  }, [paramCategory]);
```
## Funciones
  * getItemsFromFireBase()
    * Utiliza las funciones **getItemsCollection()** y **getItemsCollectionByCategory()** para almacenar en el array **data** la información traida desde firebase
  * getItemsCollection()
    * Hace una petición a firebase para recuperar toda la colección de **items**
  * getItemsCollectionByCategory()
    * Utiliza el **paramCategory** recibido para implementar una query y poder filtrar solamente los items que coincidan
  * deleteOrdersFromFireBase()
    * Es utilizado para evitar tener multiples ordenes de compra en caso de que el usuario NO visite la ruta **/order** para visualizar su orden de compra

**Una vez cargados los items, estos son pasados al componente "ItemList" que junto al componente "Item" generarán las cards de productos**
___
___
### **ItemDetailContainer** : Este componente tiene como propósito mostrar las caracteristicas y también poder realizar la compra del producto elegido.  Dicho producto es recibido como parametro de la url
---
```javascript
  const {id} = useParams();
```
---
**Al cargar dicho componente hacemos uso del hook UseEffect para obtener/mostrar las caracteristicas del producto proveniente desde firebase**
---
```javascript
  useEffect(() => {
    setloadingPage(false);
    const getItemById = async () => {
      const response = await dataBase.collection('items').get().then((querySnapShot) => querySnapShot.docs)
      response.map((element) => (
        (element.id === id) ? setItem({ id:element.id , ...element.data()}) : ""
      ))
      setloadingPage(true);
    }
    getItemById();
  },[id])
```
# Funciones
* getItemById()
    * Hace una petición a firebase para obtener el array de "items", una vez obtenido, lo recorremos y filtramos el producto que coincida con el id obtenido por parametro para almacenarlo en el state "item"

---
___
### **CartItem** : Este componente tiene como propósito mostrar los productos agregados al carrito, mostrar el total de dinero acumulado de esos productos y poder finalizar la compra. Consume el contexto "CartContext" para obtener dichos productos.
---
```javascript
const { purchases, deleteItemById , clearCart} = useContext( CartContext );
```
---
# Funciones
* cartEmpty()
    * Utilizada para mostrar que el carrito se encuentra vacio SI nuestro state "purchases" no contenga nada
* printItems( items )
    * Utilizada para mostrar los productos agregados al carrito, para ello internamente recorre el state "purchases" para pintar las cards de productos agregados
* totalAmount()
    * Utilizada para calcular y mostrar la sumatoria total de los precios
---
___
### **CartWidget** : Este componente tiene como propósito mostrar LA CANTIDAD DE productos agregados al carrito y servir como enlace a la ruta /cart para visualizar el carrito. Consume el contexto "CartContext" para obtener dichos productos y preguntará por el "purchases.length".
---
```javascript
  const { purchases } = useContext( CartContext );
```
---
___
### **PurchaseDetail** : Este componente tiene como propósito mostrar la orden de compra una vez generada
---
**Al cargar dicho componente hacemos uso del hook UseEffect para obtener/mostrar la orden de compra proveniente desde firebase. Una vez obtenida se guardara en el state "detailPurchase"**
---
```javascript
    useEffect(() => {
        const getItems = async () => {
            const items = await dataBase.collection('order').get().then(( querySnapShot ) => querySnapShot.docs);
            items.map((element) => setDetailPurchase({id:element.id , ...element.data()}))
        }
        getItems();
        setLoadingPage(true);
    },[])
```
---
# Funciones
* printDetailPurchase( item )
    * Utilizada para mostrar los datos del cliente ,el/los productos y un enlace para volver al Home. Recibe como parametro el state "detailPurchase" donde se almacenan la orden de compra
* deleteItemFromFireBase( id )
    * Utilizada para eliminar la orden de compra generada en firebase mediante el "id" que se recibe por parametro
---
___
### **ClientForm** : Este componente tiene como propósito ser el último paso en el proceso de compra, el mismo muestra un formulario para tomar los datos del comprador y generar una orden de compra para posteriormente cargarla en firebase. Utiliza el contexto "CartContext" para obtener esa compra.
---
```javascript
    const { purchases, clearCart} = useContext( CartContext );
```
---
# Funciones
* handleInputChange( eventoChange )
    * Utilizada para:
        * 1) Guardar en el state "isValid" valores true/false para definir si los inputs fueron validados correctamente
        * 2) Guardar y asignar en el state "clientData" en su correspondiente campo los valores introducidos por el usuario en los inputs
* handleSubmit( eventoSubmit )
    * Utilizada para enviar la orden de compra a firebase y posteriormente limpiar el carrito
* sendPurchaseToFireBase()
    * Utilizada para enviar la orden de compra a firebase. Dicha función crea una plantilla con los datos almacenados en el state "clientData" y los productos almacenados en el state "purchases" para posteriormente crear una "collection" en firebase denominada "order"
* getDate()
    * Utilizada para obtener la fecha y hora exacta de la compra para ser enviada como dato adicional
* validatedInputForm( value , inputType )
    * Se utiliza para validar los campos del formulario mediante expresiones regulares, devuelve true en caso de cumplir y false en el caso contrario.Recibe como parametro:
        * 1) Valor introducido en el input
        * 2) "name" o "sobre que" input se esta trabajando

**Mientras se introducen datos en los formularios, se utiliza el state "purchasedCompleted" para manipular el atributo disabled del input submit y lograr que SOLO se pueda registrar los datos del formulario si pasan la validación**
---
___
### **Footer** : Este componente tiene como propósito ser el pie de página del sitio web, permite navegar a las distintas categorias de productos enviando por parametro al "ItemListContainer" dicha categoria
---
___
### **Header** : Este componente tiene como propósito ser el encabezado del sitio web, permite navegar a las distintas categorias de productos enviando por parametro al "ItemListContainer" dicha categoria y mostrar el logo de la tienda.
---
___
### **ItemCount** : Este componente tiene como propósito implentarse como auxiliar en el componente "ItemDetail" para que el usuario elija según el stock disponible la cantidad que se desea agregar al carrito de dicho producto.
---
# Funciones
* addQuantify() 
    * Aumenta la cantidad del producto que se quiere agregar al carrito, dicha suma se ejecutará mientras no sea mayor al stock
* subtractQuantify()
    * Disminuye la cantidad del producto que se quiere agregar al carrito, dicha restará se ejecutará mientras NO sea menor a 1
---
___
### **Loading** : Este componente tiene como propósito mostrar un spinner de carga mientras se navega o se ejecutan funciones entre componentes.
---
___
# Contexto
### **CartContext** : Este componente tiene como propósito ser el que gestiona los elementos que se agregan/eliminan/modifican en el carrito de compra creando un contexto para ser consumido por otros componentes.
---
```javascript
    const CartContext = createContext();
```
---
# Funciones
* addItemToCart( item , quantify ) 
    * Se encarga de agregar elementos al state "purchases", teniendo en cuenta:
        * 1) Si el producto ya existe, permite sumar la cantidad existente sin pasarse del stock disponible, si se pasa, la cantidad se reinicia a 1.
          2) Si el producto existe, lo agrega al carrito junto con la cantidad asignada.
          3) Si la cantidad que se quiere asignar es mayor a la cantidad disponible, automáticamente se le dará el mismo valor de la cantidad disponible
* deleteItemById( id )
    * Se encarga de eliminar un producto del carrito de compra teniendo en cuenta el "id" que se reciba por parametro.
* clearCart()
    * Se encarga de eliminar TODOS los productos agregados al carrito de compras

**El state "itemsAddedToCart" es un array que se usa como axuliar para agregar los "id" de los productos existentes en el carro y finalmente se implementa al momento de agregar productos al carro para "validar" si el "id" ya se encuentra dentro del carrito**
