import React from 'react';
import classes from './Order.module.css';

const order = props => {

    // Convert an object to an array
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    };

    // Get ingredients
    const ingOutput = ingredients.map(ing => {
        return <span 
            style={{
                textTransform: 'capitalize', 
                display: 'inline-block', 
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ing.name}>{ing.name} ({ing.amount})</span>;
    });


    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
        </div>  
    );
};

export default order;