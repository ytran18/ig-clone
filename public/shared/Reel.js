import { useEffect, useState } from "react"

//component
import Loading from "./Loading"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../../src/firebase"

//image
import Camera  from "../icons/camera.png"
import Image from "next/image"
import ReelsContent from "./ReelsContent"


function Reels({userData, isUser}) {
    const [reels, setReels] = useState([])

    useEffect(() => {
        onValue(ref(db, `/posts/${userData?.userId}/`), (snapshot) => {
            var posts = []
            snapshot.forEach( (childSnapshot) => {
                if(childSnapshot.val()?.isReels){
                    posts.push(childSnapshot.val())
                }
            });
            setReels(posts)
        });
    }, [userData])

    console.log("reels: ", reels)

    return(
        <div>
            { reels?.length == 0 ?
                (
                    isUser(userData?.username)?
                    (
                        <div className="flex flex-col items-center justify-center">
                            <Image className="w-[50px] h-[50px] mb-[20px]" src={Camera} />
                            <div className="text-[32px] font-semibold text-center">You haven't up any reels</div>
                        </div>
                    ) :
                    (
                        <div className="flex flex-col items-center justify-center">
                            <Image className="w-[50px] h-[50px] mb-[20px]" src={Camera} />
                            <div className="text-[32px] font-semibold text-center">User haven't up any reels</div>
                        </div>
                    )
                    // <div className="flex flex-col items-center justify-center">
                    //     <Image className="w-[50px] h-[50px] mb-[20px]" src={Camera} />
                    //     <div className="text-[32px] font-semibold text-center">User haven't up any reels</div>
                    // </div>
                ) :
                (
                    <div className="flex flex-wrap">
                        {
                            reels?.map((reel) => {
                                return(
                                    <div className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 sm:h-[300px] h-[100px] sm:w-[300px] w-[100px] flex items-center justify-center mr-[10px]">
                                        <ReelsContent reel = {reel} />
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

export default Reels