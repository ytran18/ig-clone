import { useState, useEffect } from "react"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../../src/firebase"

function VideoReel({reel}) {

    
    return(
        <div>
            <video className="max-h-[550px] max-w-[550px] bg-black"/>
        </div>
    )
}

export default VideoReel