import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            city:'',
            postalCode:''
        },
        loading: false
    };

    orderHandler = e => {
        e.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Suyeon Kang',
                adress: {
                    city: 'Seoul',
                    zipcode: '58116',
                    country: 'South Korea'
                },
                email: 'suyeon.dev@gmail.com',
                deliveryMethod: 'fastest'
            }
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    };

    render () {
        let form = (
            <form action="/">
                <input type="text" name="name" placeholder="Your Name"/>
                <input type="email" name="email" placeholder="Your Email"/>
                <input type="text" name="city" placeholder="City"/>
                <input type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        };
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;