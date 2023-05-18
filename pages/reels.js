import { useState, useEffect } from "react"
import { useRouter } from "next/router"


import Sidebar from "../public/shared/Sidebar"
import MobileSidebar from "../public/shared/MobileSidebar"
import ReelVideo from "../public/shared/ReelVideo"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../src/firebase"

function Reel() {

    const [reels, setReels] = useState([])

    const router = useRouter()

    useEffect( () => {
        if(userData.userId == null) router.push("/auth/Login") 
    })

    useEffect(() => {
        onValue(ref(db, `/posts/`), (snapshot) => {
            var posts = []
            snapshot.forEach( (childSnapshot) => {
                childSnapshot.forEach((childSnapshot1) => {
                    if(childSnapshot1.val()?.isReels){
                        posts.push(childSnapshot1.val())
                    }
                })
            });
            setReels(posts)
        });
    }, [])

    console.log("reels: ", reels)

    return(
        <div className="flex h-screen">
            <div className="hidden sm:block">
                <Sidebar/>
            </div>

            <div className="w-[95%] m-4 flex items-center justify-center">
                <div className="sm:h-full h-[95%] sm:mb-0 mb-9 overflow-y-scroll scrollbar-hide overscroll-y-contain">
                    {
                        reels?.map((reel) => {
                            return(
                                <ReelVideo reel = {reel} />
                            )
                        })
                    }
                    
                </div>
            </div>
            <div className="fixed bottom-2 right-0 left-0 sm:hidden">
                <MobileSidebar/>
            </div>
        </div>
    )
}

export default Reel