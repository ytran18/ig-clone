import Post from "./Post"

function PostArea ()
{
    return (
        <div className="w-full h-full flex flex-col items-center">
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default PostArea