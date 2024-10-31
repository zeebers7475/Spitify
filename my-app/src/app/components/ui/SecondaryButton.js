


const SecondaryButton = (props) => {
    return (
        <button className="secondary-button" onClick={props.handleOnClick}>{props.buttonName}</button>
    )
};

export default SecondaryButton;