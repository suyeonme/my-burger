import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your city'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: { required: true, minLength: 5, maxLength: 5 },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validation: {},
                    value: 'cheapest',
                    valid: true
                }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = e => {
        e.preventDefault();

        // Render spinner
        this.setState({loading: true});

        // Create a pair of key and value of order form
        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;      // {name: 'Suyeon', city: 'Seoul' ...}
        };

        // Set order property 
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        // Post order to the server
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    };

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.requred) {
            isValid = value.trim() !== '' && isValid; // True or false 
        };

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (e, identifier) => {
        // Update order form on changing input immutably
        const updatedOrderForm = { ...this.state.orderForm };           // Clone 
        const updatedFormElement = { ...updatedOrderForm[identifier] }  // name, city... 
        updatedFormElement.value = e.target.value;

        // Check validation of an input 
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);  // True or false 
        updatedFormElement.touched = true;

        updatedOrderForm[identifier] = updatedFormElement;

        // Check overall form validation to disable button
        let formIsValid = true;
        for (let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }

        // Update state
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });                
    };

    render () {

        // Convert an object to an array (User's information)
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };

        let form = (
            <form action="/" onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        // Render spinner when loading
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