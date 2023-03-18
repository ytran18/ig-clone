import PostAssets from "./PostAssets"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"

function Post ()
{
    return (
        <div className="w-[470px] border-b-[1px]">
            <PostHeader />
            <PostAssets />
            <PostFooter />
        </div>
    )
}

export default Post