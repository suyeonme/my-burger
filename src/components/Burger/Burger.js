import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let ing = Object.keys(props.ingredients)
        .map(ingKey => {                                                     // Object.keys(): Extract 'key' from object and transform to array.
            return [...Array(props.ingredients[ingKey])].map((_, i) => {    // creating empty arrays of size = quantity of each ingredient. [key,value]
                return <BurgerIngredient key={ingKey + i} type={ingKey} />
            });
        })
        .reduce((prev, cur) => {                                             // Check whether an array of ingredient is ampty.
            return prev.concat(cur);
        }, []);
    
    // In case of ingredient is empty
    if (ing.length === 0) ing = <p>Please start adding ingredients!</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            { ing }
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
