import { useEffect } from "react"
import Post from "./Post"

function PostArea ({ posts })
{
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