"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import SecondaryButton from "./components/ui/SecondaryButton";
import PrimaryButton from "./components/ui/PrimaryButton";
import RequestAccessToken from "./components/RequestAccessToken";
import RequestUserAuth from "./components/RequestUserAuth"
import GetProfile from "./components/GetProfile";
import SearchBar from "./components/ui/SearchBar";
import GetSearchResults from "./components/GetSearchResults";
import { fetchPlaylists, fetchPlaylistTracks, fetchProfile2, fetchSearchResults } from "./components/ApiCalls";
import GetPlaylists from "./components/GetPlaylists";
import Loading from "./components/ui/Loading";
import LeftColumn from "./layout/LeftColumn";
import RightColumn from "./layout/RightColumn";
import CreatePlaylist from "./components/CreatePlaylist";


export default function Home() {

  const token = localStorage.getItem("access_token");
  const [searchingFor, setSearchingFor] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [allowSearch, setAllowSearch] = useState(false);
  const [playlists, setPlaylists] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const [addingSongs, setAddingSongs] = useState(false);
  const [songsToAdd, setSongsToAdd] = useState([]);
  const [profile, setProfile] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState('')

  const changeToken = (newToken) => {
    setToken(newToken)
  }

  const changeSearchingFor = (newSearchingFor) => {
    setSearchingFor(newSearchingFor)
  }

  const changeSearchResults = (newSearchResults) => {
    setSearchResults(newSearchResults)
  }

  const toggleAllowSearch = (boolean) => {
    setAllowSearch(boolean)
    
  }

  const changeAddingSongs = (boolean) => {
    setAddingSongs(boolean)
  }

  const changeSongsToAdd = (songList) => {
    
    let dupe = songsToAdd.find((eachSong) => eachSong.key === songList.key)
    if(!dupe) {
      setSongsToAdd((prev) => [...prev, songList])
    } else alert("That song was already added")

  }

  const changeProfile = (profile) => {
    setProfile(profile)
  }

  const changePlaylistTitle = (title) => {
    setPlaylistTitle(title)
  }

  useEffect(() => {
    RequestAccessToken(changeToken);
  },[])

  useEffect(() => {
    if(token) {
      fetchPlaylists().then(data => {
        if(data) {
          return setPlaylists(data)
        }
      })
    }
  }, [])

  return (
    <>
      <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Spitify</h1>
        <PrimaryButton handleOnClick={RequestUserAuth} buttonName='Primary Button: Request User Auth' />
        <GetProfile token={token} profile={profile} changeProfile={changeProfile} />
        <SecondaryButton handleOnClick={() => changeAddingSongs(true)} buttonName='Create a Playlist' />
      </div>
      <div className="two-columns">
        <LeftColumn>
          <SearchBar changeSearchingFor={changeSearchingFor} searchingFor={searchingFor} changeSearchResults={changeSearchResults} allowSearch={allowSearch} toggleAllowSearch={toggleAllowSearch}/>
          <GetSearchResults searchingFor={searchingFor} changeSearchResults={changeSearchResults} searchResults={searchResults} allowSearch={allowSearch} toggleAllowSearch={toggleAllowSearch} changeSongsToAdd={changeSongsToAdd} />
        </LeftColumn>
        <RightColumn>
          {playlists !== null && !addingSongs ? <GetPlaylists playlists={playlists} /> : <Loading title="Playlists" />}
          {playlists !== null && addingSongs ? <CreatePlaylist addingSongs={addingSongs} changeAddingSongs={changeAddingSongs} profile={profile} songsToAdd={songsToAdd} playlistTitle={playlistTitle} changePlaylistTitle={changePlaylistTitle}/> : <Loading title="Playlists" />}
        </RightColumn>
      </div>
      <footer>Spitify</footer>
    </>
  );


}