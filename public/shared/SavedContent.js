//hooks
import { useState } from "react"
import {useUserPackageHook} from "../redux/hooks"

//icons/images
import { LoveIcon, CommentIcon, DocumentDuplicate } from "../icons/icons"

//firebase
import {db} from "../../src/firebase"
import {ref, onValue} from "firebase/database"

//component
import PostPopUp from "./PostPopUp"

function SavedContent({saved}) {
    const [postPopUp, setPostPopUp] = useState(false)

    const user = useUserPackageHook()

    const getComment = () => {
        let comment = []
        onValue(ref(db,'comments/' + saved.postId), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                comment.push(childSnapshot.val())
            })
        })
        return comment
    }

    console.log("Comment: ", getComment().length)

    const isLove = () => {
        const likes = saved?.likes
        return (
            likes?.some((like) => {
                if(like === user.userId) {return true}
            })
        )
    }
    
    const love = isLove()

    const handlePostPopUp = () => {
        setPostPopUp(!postPopUp)
    }
    return(
        <div onClick={handlePostPopUp}>
            { saved?.media[0]?.type == "img" ?
                (<img className="sm:max-h-[300px] max-h-[100px] sm:max-w-[300px] max-w-[100px]" src={saved?.media[0]?.url} alt="saved post" />) :
                (<video className="sm:max-h-[300px] max-h-[100px] sm:max-w-[300px] max-w-[100px]" src={saved?.media[0]?.url} alt="saved post" autoPlay muted/>)
            }
            <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                <div className="flex items-center text-white">
                    {CommentIcon} 
                    <div className=" font-bold text-white">{getComment().length}</div>
                </div>
                <div className="flex items-center text-white">
                    {LoveIcon}
                    <div className=" font-bold text-white">{saved.likes == undefined ? "0" : `${saved.likes.length}`}</div>
                </div>
            </div>
            {
                saved?.media.length > 1 && (<div className=" absolute top-2 right-2 text-white">{DocumentDuplicate}</div>)
            }
            <div onClick={(e) => e.stopPropagation()} className={postPopUp ? "fixed z-50 w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl" : "hidden"}>
                <PostPopUp close={handlePostPopUp} postId={saved?.postId} owner={saved?.userId} media={saved?.media} amountOfLove={saved?.likes?.length || 0} caption={saved?.caption} createAt={saved?.createAt} loveStatus={love} />
            </div>
        </div>
    )
}

export default SavedContent