//hook
import Image from "next/image"
import { useEffect, useState, useLayoutEffect } from "react"
import { useUserPackageHook } from "../../public/redux/hooks"
import { useRouter } from "next/router"

//icon/image
import { EditIcon, PostsIcon, SavedIcon, TaggedIcon } from "../../public/icons/icons"

//firebase
import { ref as ref2, update, onValue, set} from "firebase/database"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import { storage,db } from "../../src/firebase"

//component
import EditPopUp from "../../public/shared/EditPopUp"
import Sidebar from "../../public/shared/Sidebar"
import Posts from "../../public/shared/Posts"
import Saved from "../../public/shared/Saved"
import Tagged from "../../public/shared/Tagged"
import FollowingPopUp from "../../public/shared/FollowingPopUp"
import FollowersPopUp from "../../public/shared/FollowersPopUp"
import Loading from "../../public/shared/Loading"
import Reels from "../../public/shared/Reel"
import Unfollow from "../../public/shared/Unfollow"


function AccountPage() {
    const [isEdit, setIsEdit] = useState(false)
    const [followingPopUp, setFollowingPopUp] = useState(false)
    const [followersPopUp, setFollowersPopUp] = useState(false)
    const [tab, setTab] = useState(1)
    const [posts, setPosts] = useState()
    const [otherUser, setOtherUser] = useState()
    const router = useRouter()
    const {username} = router.query
    const userData = useUserPackageHook()
    const [avatar, setAvartar] = useState(userData.avatar)
    const [following, setFollowing] = useState(false)
    const [unfollow, setUnfollow] =  useState(false)

    useEffect( () => {
        if(userData.userId == null) router.push("/auth/Login") 
    })

    useEffect( () => {
        if(!isUser(username)){
            const user = getUser()
            for(let i = 0; i <= user.length - 1; i++){
                if(user[i].username == username){
                    onValue(ref2(db, `/posts/${ user[i].userId}/`), (snapshot) => {
                        var posts1 = []
                        snapshot.forEach( (childSnapshot) => {
                            posts1.push(childSnapshot.val())
                        });
                        setPosts(posts1)
                    });
                    setOtherUser(user[i])
                    break
                }
            }
        }
        else{
            onValue(ref2(db, `/posts/${userData.userId}/`), (snapshot) => {
                var posts1 = []
                snapshot.forEach( (childSnapshot) => {
                    posts1.push(childSnapshot.val())
                });
                setPosts(posts1)
            });
        }
    },[])

    useEffect( () => {
        onValue(ref2(db,'users/' + userData.userId + '/avatar'), (snapshot) => {
            setAvartar(snapshot.val())
        })
    },[])

    useEffect(() => {
        if(isFollowing(otherUser)){
            setFollowing(true)
        }
    })

    //check if it is user or other user
    const isUser = (username) => {
        var isUser = true
        if(userData.username !== username){
            isUser = false
        }

        return isUser
    }

    //get user for checking
    const getUser = () => {
        let data1 = []
        onValue(ref2(db, '/users'), (snapshot) => {
            snapshot.forEach( (childSnapshot) =>{
                data1.push(childSnapshot.val())
            } )
        } )
        return data1
    }

    //get following 
    const getFollowing = () => {
        let following = []
        onValue(ref2(db,'users/' + userData?.userId + '/following'), (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
                following.push(childSnapshot.val())
            })
        })
        return following
    }

    //check following
    const isFollowing = (ohter) => {
        const following = getFollowing()
        for(let i = 0; i < following.length; i++){
            if(following[i] == ohter?.userId){
                return true;
            }
        }
        return false;
    }

    console.log(getFollowing());

    //get number of posts's user
    const numOfPost = () => {
        let total = 0
        for(let i = 0; i <= posts?.length - 1; i++){
            total = total + posts[i]?.media?.length
        }
        return total
    }
    console.log(numOfPost())

    console.log("User: ",getUser());

    const handleFollow = () => {
        const following = getFollowing()
        update(ref2(db, 'users/' + userData.userId),{
            following: [...following, otherUser?.userId]
        })
        setFollowing(true)
    }

    const handleUnfollowPopUp = () => {
        setUnfollow(!unfollow)
    }
     
    const handleEditPopUp = () => {
        setIsEdit(!isEdit)
    }

    const handleFollowingPopUp = () => {
        setFollowingPopUp(!followingPopUp)
    } 

    const handleFollowersPopUp = () => {
        setFollowersPopUp(!followersPopUp)
    }

    const handleChangeAvartar = (e) => {
        const file = e.target.files[0]
        const imageRef = ref(storage, `images/${file.name}`)
        uploadBytes(imageRef, file)
            .then( (snapshot) => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        update(ref2(db, "users/" + userData.userId), {
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
        <>
        {userData == undefined ?
            (<div className="flex items-center justify-center h-screen w-screen"> <Loading/> </div>) :
            (
            <div className="flex">
                <div className="fixed"> <Sidebar/> </div>
                <div className = {isEdit ? "block" : "hidden"}>
                    <EditPopUp handleClose = { handleEditPopUp }/>
                </div>
                <div className={unfollow ? "block": "hidden"}>
                    <Unfollow handleUnfollowPopUp = {handleUnfollowPopUp} setFollowing = {setFollowing} getFollowing = {getFollowing} userData = {userData} otherUser = {otherUser}/>
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
                                
                                src={ isUser(username) ? avatar : otherUser?.avatar } 
                            />
                        </label>
                        { isUser(username) && <input type="file" id="uploadAvatar" className="hidden" onChange={handleChangeAvartar}/>}
                        
                        <div>
                            <div className="flex items-center mb-[30px]">
                                <p className="text-[20px] mr-[20px]"> { isUser(username) ? userData.name : otherUser?.name} </p>
                                { isUser(username) ?
                                    (<div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                                        Edit Profile 
                                    </div>) :
                                    ( following ? 
                                        (
                                            <div onClick={handleUnfollowPopUp} className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                                                Following
                                            </div>
                                        ) :
                                        (
                                        <div onClick={handleFollow} className=" bg-sky-400 mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                                            Follow
                                        </div>
                                        )
                                    )
                                }
                                <div 
                                    className="cursor-pointer"
                                    onClick={handleEditPopUp}
                                >
                                    {EditIcon}
                                </div>
                            </div>
                            <div className="flex">
                                <p className="mr-[40px]">{numOfPost()} posts</p>

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
                            { isUser(username) ?
                                (
                                  <>
                                    <div className="text-[15px]">
                                        {SavedIcon}
                                    </div>
                                    <p className="ml-[5px] text-[13px] ">SAVED</p>
                                  </>
                                ) :
                                (
                                    <>
                                        <div className="text-[15px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                            </svg>
                                        </div>
                                        <p className="ml-[5px] text-[13px] ">REELS</p>
                                    </>
                                ) 
                            }
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
                            { isUser(username) ? <Posts userData = { userData } posts ={ posts } isUser = {isUser} /> : <Posts userData = { otherUser } posts ={ posts } isUser = {isUser} />}
                        </div>
                        <div className={tab == 2 ?"block" : "hidden"}>
                            { isUser(username) ? <Saved saved = { userData?.saved } userData = { userData } /> : <Reels saved = { otherUser?.saved } userData = { otherUser }/> }
                        </div>
                        <div className={tab == 3 ?"block" : "hidden"}>
                            <Tagged/>
                        </div>
                    </div>
                </div>

            </div>
            )
        }
            
            
        </>
    )
}

export default AccountPage