import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { updateObject, checkValidation } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import classes from './ContactData.module.css';

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
        formIsValid: false
    };

    orderHandler = e => {
        e.preventDefault();

        // Create a pair of key and value of order form
        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;      // {name: 'Suyeon', city: 'Seoul' ...}
        };

        // Set order property 
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            localId: this.props.localId
        };

        // Post data to server
        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangedHandler = (e, identifier) => {
        // Update order form on changing input immutably
        const updatedFormElement = updateObject(this.state.orderForm[identifier], {
            value: e.target.value,
            valid:  checkValidation(e.target.value, this.state.orderForm[identifier].validation), 
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedFormElement
        });    

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
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        localId: state.auth.localId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch (actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));