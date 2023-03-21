import PostAssets from "./PostAssets"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"

function Post ()
{
    return (
        <div className="w-screen md:w-[470px] lg:w-[470px] border-b-[1px] p-1">
            <PostHeader />
            <PostAssets />
            <PostFooter />
        </div>
    )
}

export default Post