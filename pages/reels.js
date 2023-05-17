//component
import Sidebar from "../public/shared/Sidebar"
import VideoReel from "../public/shared/VideoReel"

import { useState, useEffect } from "react"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../src/firebase"

function Reels() {

    const [reels, setReels] = useState([])

    useEffect(() => {
        onValue(ref(db, `posts/`), (snapshot) => {
            var posts = []
            snapshot.forEach( (childSnapshot) => {
                childSnapshot.forEach((snapShot) => {
                    if(snapShot.val()?.isReels){
                        posts.push(snapShot.val())
                    }
                })
            });
            setReels(posts)
        });
    }, [])

    console.log(reels)

    return(
        <div className=" w-screen h-screen flex">
            <div>
                <Sidebar/>
            </div>
            <div className="w-full flex items-center justify-center">
                {/* {
                    reels?.map((reel) => {
                        return <VideoReel reel = {reel} />
                    })
                } */}
                <div className=" w-[400px] h-[400px] flex items-center justify-center flex-col gap-3 bg-black overflow-y-scroll	">
                    <div className="w-[20px] h-[500px] bg-white"></div>
                    <div className="w-[20px] h-[500px] bg-white"></div>
                    <div className="w-[20px] h-[500px] bg-white"></div>
                    <div className="w-[20px] h-[500px] bg-white"></div>
                </div>
            </div>
        </div>
    )
}

export default Reels