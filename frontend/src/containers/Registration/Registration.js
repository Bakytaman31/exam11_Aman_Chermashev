import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";

class Registration extends Component {
    state = {
        username: '',
        password: '',
        phoneNumber: '',
        name: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <h2>Register new user</h2>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder="Enter username"
                        autoComplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />
                    <FormElement
                        propertyName="phoneNumber"
                        title="Phone Number"
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('phoneNumber')}
                        placeholder="Enter phone number"
                        autoComplete="new-phoneNumber"
                    />
                    <FormElement
                        propertyName="name"
                        title="Name"
                        type="text"
                        value={this.state.name}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('name')}
                        placeholder="Enter name"
                        autoComplete="new-name"
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);