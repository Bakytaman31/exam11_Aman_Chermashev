import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/UI/NavBar/NavBar";
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Registration from "./containers/Registration/Registration";
import NewProduct from "./containers/NewProduct/NewProduct";
import Products from "./containers/Products/Products";
import Product from "./containers/Product/Product";
import {getCategories} from "./store/actions/categoriesActions";
import {connect} from "react-redux";

class App extends Component {
    async componentDidMount() {
        await this.props.getCategories();
    }

    render() {
        return (
            <div className="App">
                <NavBar
                    categories={this.props.categories}
                />
                <Switch>
                    <Route path="/" exact component={Products}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/registration" exact component={Registration}/>
                    <Route path="/newProduct" exact component={NewProduct}/>
                    <Route path="/category/:id" component={Products}/>
                    <Route path="/:id" component={Product}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
