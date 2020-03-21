import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';
import {apiURL} from "../../../constants";

const ProductCard = props => {
    const style = {
        margin: "3% auto",
        border: "2px solid #ccc",
        width: "40%"
    };
    const imgStyles = {
        width: '100px',
        height: '100px',
        marginRight: '10px'
    };
    return (
        <div style={style}>
            <img src={apiURL + 'uploads/' + props.image} style={imgStyles} alt="Product"/>
            <h3>{props.title}</h3>
            <h4>{props.price}</h4>
            <Link to={`/${props.id}`}>
                <Button color="primary">Read more</Button>
            </Link>
        </div>
    );
};

export default ProductCard;