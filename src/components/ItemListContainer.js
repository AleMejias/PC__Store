import React from 'react';

import ItemCount from './ItemCount';


const ItemListContainer = () => {

    return (
        <section className ="container">
            <ItemCount stock={5} initialValue = {1} />
        </section>
    );
}
export default ItemListContainer; 