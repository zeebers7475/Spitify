"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./components/Button";
import RequestAccessToken from "./components/RequestAccessToken";
import RequestUserAuth from "./components/RequestUserAuth"
import GetProfile from "./components/GetProfile";
import SearchBar from "./components/SearchBar";


export default function Home() {

  const [token, setToken] = useState(null)
  console.log(token)

  const changeToken = (newToken) => {
    setToken(newToken)
  }

  useEffect(() => {
    RequestAccessToken(changeToken);
  },[])

  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Spitify</h1>
      <SearchBar />
      <Button name='Request User Auth' />
      <GetProfile token={token} />
    </div>
  );
}
