import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {connect, useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../../store/actions/usersActions";

const NavBar = props => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Market</NavbarBrand>
            {props.categories.map(category => (
                <NavItem key={category._id}>
                    <NavLink tag={RouterNavLink} to={`/category/${category._id}`} exact>{category.title}</NavLink>
                </NavItem>
            ))}

             {/*<NavItem>*/}
             {/*    <NavLink tag={RouterNavLink} to="/category/Bikes" exact>Bikes</NavLink>*/}
             {/*</NavItem>*/}
             {/*<NavItem>*/}
             {/*    <NavLink tag={RouterNavLink} to="/category/Phones" exact>Phones</NavLink>*/}
             {/*</NavItem>*/}

            <Nav className="ml-auto" navbar>
                {user ? (
                    <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
                ) : (
                    <AnonymousMenu/>
                )}
            </Nav>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    category: state.categories.categories
});

export default connect(mapStateToProps)(NavBar);