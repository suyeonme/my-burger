import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidation } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onAuthSetRedirectPath();
        };
    };

    inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: e.target.value,
                valid: checkValidation(e.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup};
        });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        // Render form when not loading
        let form = formElementArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ));

        // Render spinner when loading 
        if (this.props.loading) form = <Spinner />

        // Display error message (message is FIREBASE property)
        let errorMessate = null;
        if (this.props.error) {
            errorMessate = (
                <p>{this.props.error.message}</p>
            );
        };

        // Redirect to home when user is authenticated
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        };

        return (
            <div className={classes.Auth}>
                { authRedirect }
                { errorMessate }
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger">SWITH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onAuthSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);