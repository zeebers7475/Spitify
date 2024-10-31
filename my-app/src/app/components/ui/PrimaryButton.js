const PrimaryButton = (props) => {
    return (
        <button className="primary-button" onClick={props.handleOnClick}>{props.buttonName}</button>
    )
    
}

export default PrimaryButton;