"use client"

import RequestUserAuth from "./RequestUserAuth";


const Button = (props) => {
    return (
        <button onClick={() => RequestUserAuth()}>{props.name}</button>
    )
};

export default Button;