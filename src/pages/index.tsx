import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import { post } from "../lib/http";
import { addWatcher, guessLocation } from "../lib/geolocation";
import type { Location } from "../lib/geolocation";

const Home: NextPage = () => {
  const [myLocation, setMyLocation] = useState<Location>();

  function handleWatchLocation() {
    addWatcher((location) => {
      setMyLocation(location);
      post("/geo", location).catch(console.error);
    }).catch(console.error);
  }

  function handleGuessLocation() {
    guessLocation((location) => {
      setMyLocation(location);
      post("/geo", location).catch(console.error);
    }, 1000);
  }

  return (
    <>
      <Head>
        <title>T3 Capacitor</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={handleWatchLocation}>watch location</button>
        <button onClick={handleGuessLocation}>guess location</button>
        <pre>{JSON.stringify(myLocation, null, 2)}</pre>
      </main>
    </>
  );
};

export default Home;
