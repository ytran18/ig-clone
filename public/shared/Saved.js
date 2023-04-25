//hooks
import { useEffect, useState } from "react";

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../../src/firebase"

//icons/images
import { LoveIcon, CommentIcon, DocumentDuplicate } from "../icons/icons"

//component
import PostPopUp from "../shared/PostPopUp"
import SavedContent from "./SavedContent";


function Saved({ userData }) {
    const [save, setSave] = useState()

    useEffect(() => {
        onValue(ref(db, 'users/' + userData?.userId + '/saved'), (snapshot) => {
            var save1 = []
            snapshot.forEach((childSnapshot) => {
                save1.push(childSnapshot.val())
            })
            setSave(save1)
        })
    }, [])

    const getPost = () => {
        let posts = []
        save?.forEach( (save) => {
            onValue(ref(db, '/posts/'), (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    childSnapshot.forEach((post) => {
                        if(post.val().postId == save){
                            posts.push(post.val())  
                        } 
                    })
                })
            })
        })
        return posts
    }

    const savedPost = getPost()

    console.log("saved posts: ", savedPost[0]?.media[0]?.type);

    savedPost.map((saved) => {
        console.log(saved.caption);
    })


    return(
        <div>
            { savedPost.length == 0 ? 
                (
                    <div className="flex justify-between w-full">
                        <div className="text-[14px] font-semibold text-[#8e8e8e]">Only you can see what you've saved</div>
                        <div className="text-[#2997f6] font-bold text-[14px] cursor-pointer hover:text-slate-400">
                            + New collection
                        </div>
                    </div>
                ):
                (
                    <div className="flex flex-wrap">
                        {
                            savedPost.map((saved) => {
                                return(
                                    <div className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 sm:h-[300px] h-[100px] sm:w-[300px] w-[100px] flex items-center justify-center mr-[10px]">
                                        <SavedContent saved = {saved} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Saved