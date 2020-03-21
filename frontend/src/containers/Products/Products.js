import React, {Component} from 'react';
import {connect} from "react-redux";
import {getProducts, getProductsByCategory} from "../../store/actions/productsActions";
import {getCategories} from "../../store/actions/categoriesActions";
import ProductCard from "../../components/Cards/ProductCard/ProductCard";

class Products extends Component {
    state = {
      products: []
    };

    async componentDidMount() {
        this.props.getCategories();
       await this.props.getProducts();
        this.setState({products: this.props.products});
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id) {
            const category = this.props.match.params.id;
            if (prevProps.match.params.id !== category) {
                await this.props.getProductsByCategory(category);
                this.setState({products: this.props.products});
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.products.map(product => (
                    <ProductCard
                        key={product._id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        id={product._id}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    getProductsByCategory: category => dispatch(getProductsByCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);