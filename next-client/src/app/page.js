import React from "react";
import Head from "next/head";
import SearchBar from "../components/SearchBar/SearchBar";

export default function HomePage() {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.romanizedmm.com/" />
            </Head>
            <SearchBar />
        </>
    );
}
