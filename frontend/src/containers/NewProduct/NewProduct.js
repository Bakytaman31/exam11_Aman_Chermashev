import React, {Component} from 'react';
import {createProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {getCategories} from "../../store/actions/categoriesActions";

class NewProduct extends Component {
    state = {
        category: '',
        title: '',
        image: '',
        price: '',
        description: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.createProduct(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <>
                <h2>New product</h2>
                <Form onSubmit={this.submitFormHandler}>
                    <span style={{color: "red"}}>{this.props.error}</span>
                    <FormGroup row>
                        <Label sm={2} for="category">Category</Label>
                        <Col sm={10}>
                            <Input
                                type="select"
                                name="category" id="category"
                                value={this.state.category}
                                onChange={this.inputChangeHandler}
                            >
                                <option value="">Please select a category...</option>
                                {this.props.categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.title}</option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="title">Title</Label>
                        <Col sm={10}>
                            <Input
                                required
                                type="text"
                                name="title" id="title"
                                placeholder="Enter title"
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="price">Price</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.inputChangeHandler}
                                placeholder="Enter price"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="description">Description</Label>
                        <Col sm={10}>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                value={this.state.description}
                                onChange={this.inputChangeHandler}
                                placeholder="Enter description"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="image">Image</Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="image" id="image"
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{offset:2, size: 10}}>
                            <Button type="submit" color="primary">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    error: state.products.error
});

const mapDispatchToProps = dispatch => ({
    createProduct: productData => dispatch(createProduct(productData)),
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);