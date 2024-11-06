import PrimaryButton from "./ui/PrimaryButton";

const CreatePlaylist = (props) => {

    return (
        <div>
            <PrimaryButton handleOnClick={() => props.changeAddingSongs(false)} buttonName="Close" />
            <input type="text" name="playlistTitle" id="playlistTitle" />
            <ul>
                {props.songsToAdd}
            </ul>
        </div>
    )
}

export default CreatePlaylist;