import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            city:'',
            postalCode:''
        }
    };

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form action="/">
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email"/>
                    <input type="text" name="city" placeholder="City"/>
                    <input type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
};

export default ContactData;