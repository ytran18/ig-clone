//hooks
import { useEffect, useState } from "react";

//firebase
import { ref, update, onValue} from "firebase/database"
import { db } from "../../src/firebase"

//icons/images
import { LoveIcon, CommentIcon, DocumentDuplicate } from "../icons/icons"

//component
import PostPopUp from "../shared/PostPopUp"


function Saved({ saved, userData }) {
    const [postPopUp, setPostPopUp] = useState(false)

    const handlePostPopUp = () => {
        setPostPopUp(!postPopUp)
    }

    // const [post, setPost] = useState()

    // useEffect( () => {
    //     for(let i = 0; i <saved?.length; i++){
    //         onValue(ref(db, '/posts/'), (snapshot) => {
    //             var posts = []
    //             snapshot.forEach((childSnapshot) => {
    //                 childSnapshot.forEach((post) => {
    //                     if(post.val().postId == saved[i]){
    //                         posts.push(post.val())
    //                     }
    //                 })
    //             })
    //             setSavedPost(posts)
    //         })
    //     }
    // } ,[])

    // console.log("saved post: ", post)

    const getPost = () => {
        let posts = []
        saved?.forEach( (save) => {
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
                                    <div onClick={handlePostPopUp} className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 h-[300px] w-[300px] flex items-center justify-center mr-[10px]">
                                        { saved?.media[0]?.type == "img" ?
                                            (<img className="max-h-[300px] max-w-[300px]" src={saved?.media[0]?.url} alt="saved post" />) :
                                            (<video className="max-h-[300px] max-w-[300px]" src={saved?.media[0]?.url} alt="saved post" autoPlay muted/>)
                                        }
                                        <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                                            <div className="flex items-center text-white">
                                                {CommentIcon} 
                                                <div className=" font-bold text-white">{saved.comment == undefined ? "0" : `${saved.comment.length}`}</div>
                                            </div>
                                            <div className="flex items-center text-white">
                                                {LoveIcon}
                                                <div className=" font-bold text-white">{saved.likes == undefined ? "0" : `${saved.likes.length}`}</div>
                                            </div>
                                        </div>
                                        {
                                            saved?.media.length > 1 && (<div className=" absolute top-2 right-2 text-white">{DocumentDuplicate}</div>)
                                        }
                                        <div className={postPopUp ? "fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl" : "hidden"}>
                                            <PostPopUp caption={saved.caption} createAt={saved.createAt} amountOfLove={saved.likes} owner={saved.userId} />
                                        </div>
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