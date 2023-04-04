import PostAssets from "./PostAssets"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"

function Post ({ post })
{
    const postObject = Object.values(post)

    return (
        <>
        {
            postObject.map((item, index) =>
            {
                return (
                    <div key={index}>
                        <div className="w-screen md:w-[470px] lg:w-[470px] border-b-[1px] p-1">
                            <PostHeader user={item?.userId} createAt={item?.createAt}/>
                            <PostAssets media={item?.media}/>
                            <PostFooter caption={item?.caption} createAt={item?.createAt} amountOfLove={item?.likes} owner={item?.userId} amountOfComment={item?.comment} postId={item?.postId} media={item?.media} />
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}

export default Post