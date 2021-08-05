import React,{ useState,useEffect } from 'react';

// Components
import ItemList from './ItemList';
/* import ItemCount from './ItemCount'; */

const ItemListContainer = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
      fetch("./data/data.json")
        .then((response) => response.json())
        .then((data) =>
          setTimeout(() => {
            setItem(data);
          }, 2000)
        );
    }, []);

    return (
        <ItemList item = {item}/>
    );
}
export default ItemListContainer; 