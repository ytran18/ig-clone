import Head from "next/head";
import PostArea from "../public/shared/PostArea";
import Right from "../public/shared/Right";
import Sidebar from "../public/shared/Sidebar";
import Story from "../public/shared/Story";
import Loading from "../public/shared/LoadingIg";

// firebase
import { ref, query, onValue } from "firebase/database"
import { db } from "../src/firebase"
import { useEffect, useState } from "react";

export default function Home() {

    // state
    const [posts, setPosts] = useState([]) // state to store posts get from firebase realtime database

    // query to get post from firebase realtime database
    const getPost = query(ref(db,"posts/"))

    // get all posts from firebase realtime database
    useEffect(() =>
    {
        onValue(getPost, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                let postObject = Object.values(value)
                setPosts(postObject)
            }
        })
    },[])

    return (
        <>
        {
            posts.length !== 0 ?
            (
                <>
                    <Head>
                        <title>Instagram - Clone</title>
                        <meta
                            name="description"
                            content="Generated by create next app"
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                        />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div className="flex justify-between">
                        <div className="">
                            <Sidebar />
                        </div>
                        <div className="w-full h-screen">
                            <div className="w-full h-full flex flex-col overflow-auto scrollbar-hide">
                                <div className="h-[117px]">
                                    <Story />
                                </div>
                                <PostArea posts={posts}/>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                            <Right />
                        </div>
                    </div>
                </>
            )
            :
            (
                <Loading />
            )
        }
        </>
    );
}


