//firebase 
import { db } from "../../src/firebase"
import { ref, update } from "firebase/database"

function Unfollow({ handleUnfollowPopUp, setFollowing, getFollowing, userData, otherUser }) {
    const handleUnfollow = () => {
        const following = getFollowing()
        const newFollowing = following.filter((follow) => follow !== otherUser?.userId)
        update(ref(db, 'users/' + userData?.userId),{
            following: newFollowing
        })
        handleUnfollowPopUp()
        setFollowing(false)
    }
    
    return(
        <div className="z-50 fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl">
            <div className=" bg-white flex flex-col justify-between h-[100px] p-3 rounded-lg">
                <div className=" font-bold h-[60%]">
                    Are you sure to want unfollow
                </div>
                <div className="flex items-center justify-between">
                    <div onClick={handleUnfollow} className="font-bold text-red-500 cursor-pointer hover:text-red-400">Unfollow</div>
                    <div onClick={handleUnfollowPopUp} className=" cursor-pointer font-bold hover:text-gray-500">Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default Unfollow