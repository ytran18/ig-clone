
import { CommentPost, LovePost, NotLovePost, NotSavedPost, SavedPost, SharePost } from "../icons/icons"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../../src/firebase"
import { useEffect, useState } from "react"

function ReelVideo({reel}){

    const [user, setUser] = useState()

    useEffect(() => {
        onValue(ref(db, 'users/' + reel?.userId), (snapshot) => {
            setUser(snapshot.val())
        })
    },[reel])

    const getComment = () => {
        let comment = []
        onValue(ref(db,'comments/' + reel.postId), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                comment.push(childSnapshot.val())
            })
        })
        return comment
    }

    return(
        <div className="flex items-center justify-center mb-3">
            <video controls className=" sm:max-w-[500px] sm:max-h-[500px] max-w-[300px] max-h-[300px] rounded-md" src={reel?.media[0]?.url} />
            <div className=" flex flex-col items-center justify-end gap-4 ml-2 h-[300px]">
                <div className=" cursor-pointer">
                    {NotLovePost}
                    <div className=" text-center">{reel?.likes?.length || 0}</div>
                </div>
                <div className=" cursor-pointer">
                    {CommentPost}
                    <div className=" text-center">{getComment().length}</div>
                </div>
                <div className=" cursor-pointer">{SharePost}</div>
                <div className=" cursor-pointer">{NotSavedPost}</div>
                <div className=" cursor-pointer">
                    <img src={user?.avatar} className="h-[30px] w-[30px]" />
                </div>
            </div>
        </div>
    )
}

export default ReelVideo