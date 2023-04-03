import Post from "./Post"

function PostArea ({ posts })
{
    // display all posts from database
    return (
        <div className="w-full h-full flex flex-col items-center">
            {
                posts.map(( item, index ) =>
                {
                    return (  <div key={index}> <Post post={item}/> </div> )
                })
            }
        </div>
    )
}

export default PostArea