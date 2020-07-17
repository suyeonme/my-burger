import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

class Layout extends Component {
    state = {
        showSidebar: false
    };

    closeSidebarHandler =() => {
        this.setState({showSidebar: false});
    };

    toggleSidebar = () => {
        this.setState((prevState) => {
            return { showSidebar: !prevState.showSidebar };
        });
    };

    render () {
        return (
            <>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    sideToggleClicked={this.toggleSidebar}/>
                <Sidebar 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSidebar}
                    closed={this.closeSidebarHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);