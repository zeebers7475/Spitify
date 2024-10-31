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
import { fetchProfile2 } from "./components/ApiCalls";


export default function Home() {

  const [token, setToken] = useState(null);
  const [searchingFor, setSearchingFor] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  console.log(token)

  const changeToken = (newToken) => {
    setToken(newToken)
  }

  const changeSearchingFor = (newSearchingFor) => {
    setSearchingFor(newSearchingFor)
  }

  const changeSearchResults = (newSearchResults) => {
    setSearchResults(newSearchResults)
  }

  useEffect(() => {
    RequestAccessToken(changeToken);
  },[])

  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Spitify</h1>
      <SearchBar changeSearchingFor={changeSearchingFor} searchingFor={searchingFor} changeSearchResults={changeSearchResults} />
      <PrimaryButton handleOnClick={RequestUserAuth} buttonName='Primary Button: Request User Auth' />
      <SecondaryButton handleOnClick={RequestAccessToken} buttonName='Secondary Button: Request Access Token' />
      <GetProfile token={token} />
      <GetSearchResults searchingFor={searchingFor} changeSearchResults={changeSearchResults} searchResults={searchResults}/>
    </div>
  );
}
