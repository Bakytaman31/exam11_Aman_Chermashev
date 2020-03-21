import React, {Component} from 'react';
import {deleteProduct, getProduct} from "../../store/actions/productsActions";
import {Button} from 'reactstrap';
import {connect} from "react-redux";
import {apiURL} from "../../constants";

class Product extends Component {
    state = {
        product: {},
        category: {},
        owner: {}
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getProduct(id);
        this.setState({
            product: this.props.product,
            category: this.props.product.category,
            owner: this.props.product.owner
        });
    }

    deleteProductHandler = () => {
      this.props.deleteProduct(this.props.match.params.id);
    };

    render() {
        let deleteButton = '';
        if (this.props.user) {
            if (this.props.user._id === this.state.owner._id) {
                deleteButton = <Button onClick={this.deleteProductHandler}>Delete</Button>
            }
        }
        return (
            <>
                <img src={apiURL + 'uploads/' + this.state.product.image}
                     alt="Product"
                     style={{
                         width: "400px",
                         height: "400px"
                     }}
                />
                <h2>{this.state.product.title}</h2>
                <h3>Category: {this.state.category.title}
                    <br/>
                    Owner: {this.state.owner.username}
                    <br/>
                    Phone Number: {this.state.owner.phoneNumber}
                </h3>
                {deleteButton}
            </>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.product,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    getProduct: id => dispatch(getProduct(id)),
    deleteProduct: id => dispatch(deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);