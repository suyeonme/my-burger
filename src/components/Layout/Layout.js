import React, { Component } from 'react';
import classes from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';

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
                <Toolbar sideToggleClicked={this.toggleSidebar}/>
                <Sidebar 
                    open={this.state.showSidebar}
                    closed={this.closeSidebarHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
};

export default Layout;