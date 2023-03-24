import Image from "next/image"
import { useEffect, useState } from "react"
import DefaultProfile from "../../public/icons/defaultProfile.jpg"
import { storage,db } from "../../src/firebase"
import { EditIcon, PostsIcon, SavedIcon, TaggedIcon } from "../../public/icons/icons"
import { set, ref as ref2, update, onValue} from "firebase/database"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import EditPopUp from "../../public/shared/EditPopUp"
import Sidebar from "../../public/shared/Sidebar"
import Posts from "../../public/shared/Posts"
import Saved from "../../public/shared/Saved"
import Tagged from "../../public/shared/Tagged"
import FollowingPopUp from "../../public/shared/FollowingPopUp"
import FollowersPopUp from "../../public/shared/FollowersPopUp"

function AccountPage() {
    const [isEdit, setIsEdit] = useState(false)
    const [followingPopUp, setFollowingPopUp] = useState(false)
    const [followersPopUp, setFollowersPopUp] = useState(false)
    const [avatar, setAvatar] = useState()
    const [tab, setTab] = useState(1)

    useEffect( () => {
        const avatarRef = ref2(db, 'users/' + "08343a66-0609-455b-b0bb-f2b1739ef480" + '/avatar')
        onValue(avatarRef, (snapshot) => {
            setAvatar(snapshot.val())
        })
    }, [])

    const handleEditPopUp = () => {
        setIsEdit(!isEdit)
    }

    const handleFollowingPopUp = () => {
        setFollowingPopUp(!followingPopUp)
    } 

    const handleFollowersPopUp = () => {
        setFollowersPopUp(!followersPopUp)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        const imageRef = ref(storage, `images/${file.name}`)
        uploadBytes(imageRef, file)
            .then( (snapshot) => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        update(ref2(db, "users/" + "08343a66-0609-455b-b0bb-f2b1739ef480"), {
                            avatar: url
                        })
                    })
                    .catch( (error) => {
                        console.log(error.message)
                    })
                console.log('Uploaded a blob or file!');
            })
            .catch( (error) => {
                console.log(error.message)
            })
    }

    return(
        <div className={(isEdit || followingPopUp || followersPopUp) ? "fixed flex" : "flex"}>
            <div className="fixed"> <Sidebar/> </div>
            <div className = {isEdit ? "block" : "hidden"}>
                <EditPopUp handleClose = { handleEditPopUp }/>
            </div>
            <div className={ followingPopUp ? "block" : "hidden" } >
                <FollowingPopUp handleClose = {handleFollowingPopUp}/>
            </div>
            <div className={ followersPopUp ? "block" : "hidden" }>
                <FollowersPopUp handleClose = {handleFollowersPopUp}/>
            </div>

            <div className="flex flex-col pb-[10px] pt-[40px] ml-[245px] w-full">
                <div className="flex border-b-[1px] mx-[30px] pb-[10px]">
                    <label htmlFor="uploadAvatar" className=" w-[290px] h-[150px] px-[20px] flex justify-center cursor-pointer">
                        <img
                            className="w-[150px] h-[150px] text-center rounded-full"
                            src={avatar} 
                        />
                    </label>
                    <input 
                        type="file" id="uploadAvatar" className="hidden"
                        onChange={handleChange}
                    />

                    <div>
                        <div className="flex items-center mb-[30px]">
                            <p className="text-[20px] mr-[20px]">nphggg11</p>
                            <div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px]">
                                Edit Profile 
                            </div>
                            <div 
                                className="cursor-pointer"
                                onClick={handleEditPopUp}
                            >
                                {EditIcon}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="mr-[40px]">0 posts</p>

                            <p 
                                className="mr-[40px] cursor-pointer"
                                onClick={handleFollowersPopUp}
                            >   
                                0 followers
                            </p>

                            <p 
                                className="mr-[40px] cursor-pointer"
                                onClick={handleFollowingPopUp}
                            >
                                168 following
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-[#8e8e8e] font-semibold">
                    <div 
                        className={tab == 1 ? "flex items-center cursor-pointer w-[60px] h-[50px] mr-[50px] border-t-[1px] border-black text-black" : "flex items-center cursor-pointer w-[60px] h-[50px] mr-[50px]"}
                        onClick = {() => setTab(1)}
                    >
                        <div className="text-[15px]">
                            {PostsIcon}
                        </div>
                        <p className="ml-[5px] text-[13px] ">POSTS</p>
                    </div>

                    <div 
                        className={tab == 2 ? "flex items-center cursor-pointer w-[60px] h-[50px] mr-[50px] border-t-[1px] border-black text-black" : "flex items-center cursor-pointer w-[60px] h-[50px] mr-[50px]"}
                        onClick={() => setTab(2)}
                    >
                        <div className="text-[15px]">
                            {SavedIcon}
                        </div>
                        <p className="ml-[5px] text-[13px] ">SAVED</p>
                    </div>

                    <div 
                        className={tab ==3 ? "flex items-center cursor-pointer w-[70px] h-[50px] border-t-[1px] border-black text-black" : "flex items-center cursor-pointer w-[70px] h-[50px]"}
                        onClick={() => setTab(3)}
                    >
                        <div className="text-[15px]">
                            {TaggedIcon}
                        </div>
                        <p className="ml-[5px] text-[13px] ">TAGGED</p>
                    </div>
                </div>
                <div className="mx-[30px] mt-[30px]">
                    <div className={tab == 1 ?"block" : "hidden"}>
                        <Posts/>
                    </div>
                    <div className={tab == 2 ?"block" : "hidden"}>
                        <Saved/>
                    </div>
                    <div className={tab == 3 ?"block" : "hidden"}>
                        <Tagged/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountPage