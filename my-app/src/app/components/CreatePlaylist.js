import PrimaryButton from "./ui/PrimaryButton";
import { fetchCreatePlaylist } from "./ApiCalls";
import SecondaryButton from "./ui/SecondaryButton";

const CreatePlaylist = (props) => {

    const profile = props.profile;

    const handleOnChange = (e) => {
        props.changePlaylistTitle(e.target.value)
    }

    return (
        <div className="flex-column">
            <PrimaryButton handleOnClick={() => props.changeAddingSongs(false)} buttonName="Close" />
            <input type="text" name="playlistTitle" id="playlistTitle" value={props.playlistTitle} onChange={handleOnChange}/>
            <ul>
                {props.songsToAdd}
            </ul>
            <SecondaryButton handleOnClick={() => fetchCreatePlaylist(profile, props.playlistTitle, props.songsToAdd)} buttonName='Submit New Playlist' />
        </div>
    )
}

export default CreatePlaylist;