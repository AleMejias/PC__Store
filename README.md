PC-STORE: Es una tienda ficticia de productos para pc, por ahora se tienen 3 productos pero se incorporaran mas y el resto de categorias!


Se usaron dependencias externas como:

1)React-bootstrap
2)Font-awesome
3)Sass

Los productos provienen de un archivo.json ubicado en la carpeta "data" que se encuentra dentro de "public".
Dichos productos son leidos por medio de una petición Fetch que es usada tanto en el componente ItemListContainer así como
también en el componente ItemDetailContainer. Con la diferencia que en el componente "ItemListContainer" utilizamos el hook useEffect para consumir esos datos por medio de la funcion getItemList y en el "ItemDetailContainer" utilizamos la misma mecanica pero hacemos uso de la funcion getItemById el cual trabaja con un "id" que es recibo como parametro por las url, esta acción permitirá mostrar en pantalla segun: 1) la categoria 2) El id del producto. Dicho id es usado para navegar al componente "ItemDetail" el cual nos mostrara la informacion de dicho producto.

Con las siguientes clases pienso poder centralizar el estado para consumirlo en toda mi aplicacion mediante useContext y evaluar si existe otro metodo para consumir datos (me refiero a firebase), mejorar un poco los estilos e ir puliendo el codigo para su mayor legibilidad.

El componente "HOME" se encuentra vacio por los momentos ya que pienso construirlo cuando tenga un estado centralizado ya que mi proposito será mostrar algunos productos en "promo" o destacados para que al clickear puedan ser mostrados por el componente "ItemDetail".
