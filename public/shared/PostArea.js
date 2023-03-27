// firebase
import { ref, query, onValue } from "firebase/database"
import { useEffect, useState } from "react"
import { db } from "../../src/firebase"

import Post from "./Post"

function PostArea ()
{

    // state
    const [posts, setPosts] = useState([]) // state to store posts get from firebase realtime database

    // query to get post from firebase realtime database
    const getPost = query(ref(db,"posts/test"))

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
        <div className="w-full h-full flex flex-col items-center">
            {
                posts.map(( item, index ) =>
                {
                    return (
                        <div key={index}> <Post post={item}/> </div>
                    )
                })
            }
        </div>
    )
}

export default PostArea