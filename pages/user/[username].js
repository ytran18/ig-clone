//hook
import Image from "next/image"
import { useEffect, useState, useLayoutEffect } from "react"
import { useUserPackageHook } from "../../public/redux/hooks"
import { useRouter } from "next/router"

//icon/image
import { EditIcon, PostsIcon, SavedIcon, TaggedIcon, MoreDotIcon } from "../../public/icons/icons"

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
import MobileSidebar from "../../public/shared/MobileSidebar"


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
    },[username])

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
    const getFollowing = (userId) => {
        let following = []
        onValue(ref2(db,'users/' + userId + '/following'), (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
                following.push(childSnapshot.val())
            })
        })
        return following
    }

    //get follower
    const getFollower = (userId) => {
        let follower = []
        onValue(ref2(db, 'users/'+ userId + '/follower'), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                follower.push(childSnapshot.val())
            })
        })
        return follower
    }

    //check following
    const isFollowing = (ohter) => {
        const following = getFollowing(userData?.userId)
        for(let i = 0; i < following.length; i++){
            if(following[i] == ohter?.userId){
                return true;
            }
        }
        return false;
    }

    //get number of posts's user
    const numOfPost = () => {
        let total = 0
        for(let i = 0; i <= posts?.length - 1; i++){
            total = total + posts[i]?.media?.length
        }
        return total
    }

    const handleFollow = () => {
        const following = getFollowing(userData.userId)
        const follower = getFollower(otherUser?.userId)
        update(ref2(db, 'users/' + userData.userId),{
            following: [...following, otherUser?.userId]
        })
        update(ref2(db, 'users/' + otherUser?.userId), {
            follower: [...follower, userData.userId]
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
            <div className="w-full sm:flex">
                <div className="fixed"> <Sidebar/> </div>
                <div className = {isEdit ? "block" : "hidden"}>
                    <EditPopUp handleClose = { handleEditPopUp }/>
                </div>
                <div className={unfollow ? "block": "hidden"}>
                    <Unfollow handleUnfollowPopUp = {handleUnfollowPopUp} getFollower = {getFollower} setFollowing = {setFollowing} getFollowing = {getFollowing} userData = {userData} otherUser = {otherUser}/>
                </div>
                <div className={ followingPopUp ? "block" : "hidden" } >
                    <FollowingPopUp handleClose = {handleFollowingPopUp} isFollowing = {isFollowing} getFollowing = {getFollowing} getFollower = {getFollower} userData = {isUser(username) ? userData : otherUser} isUser = {isUser}/>
                </div>
                <div className={ followersPopUp ? "block" : "hidden" }>
                    <FollowersPopUp handleClose = {handleFollowersPopUp} isFollowing = {isFollowing} userData = {isUser(username) ? userData : otherUser} isUser = {isUser} getFollower = {getFollower} getFollowing = {getFollowing} />
                </div>

                <div className="flex flex-col pb-[10px] pt-[40px] sm:ml-[245px] md:max-lg:ml-[70px] w-full">
                    <div className="flex border-b-[1px] sm:mx-[30px] pb-[10px] gap-3 sm:gap-0">
                        <label htmlFor="uploadAvatar" className="w-[30%] sm:w-[290px] sm:h-[150px] sm:px-[20px] flex justify-center cursor-pointer">
                            <img
                                className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] text-center rounded-full"
                                
                                src={ isUser(username) ? avatar : otherUser?.avatar } 
                            />
                        </label>
                        { isUser(username) && <input type="file" id="uploadAvatar" className="hidden" onChange={handleChangeAvartar}/>}
                        
                        <div className="w-[70%]">
                            <div className="sm:flex items-center mb-[30px]">
                                <div className="flex items-center mb-3 sm:mb-0">
                                    <p className="text-[20px] mr-[20px]"> { isUser(username) ? userData.name : otherUser?.name} </p>
                                    {
                                        isUser(username) ? 
                                        ( 
                                            <div 
                                                className="block sm:hidden cursor-pointer"
                                                onClick={handleEditPopUp}
                                            >
                                                {EditIcon}
                                            </div>
                                        ) : 
                                        ( 
                                            <div 
                                                className="block sm:hidden cursor-pointer"
                                                onClick={handleEditPopUp}
                                            >
                                                {MoreDotIcon}
                                            </div>
                                        )
                                    }
                                </div>
                                { isUser(username) ?
                                    (<div className="bg-[#efefef] mr-[10px] items-center justify-center flex rounded-lg sm:rounded py-[7px] sm:px-[16px] font-semibold text-[14px] cursor-pointer">
                                        Edit Profile 
                                    </div>) :
                                    ( following ? 
                                        (
                                            <div onClick={handleUnfollowPopUp} className="bg-[#efefef] items-center justify-center flex mr-[10px] rounded-lg sm:rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                                                Following
                                            </div>
                                        ) :
                                        (
                                            <div onClick={handleFollow} className=" bg-sky-400 mr-[10px] items-center justify-center flex rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                                                Follow
                                            </div>
                                        )
                                    )
                                }
                                {
                                    isUser(username) ? 
                                    ( 
                                        <div 
                                            className="hidden sm:block cursor-pointer"
                                            onClick={handleEditPopUp}
                                        >
                                            {EditIcon}
                                        </div>
                                    ) : 
                                    ( 
                                        <div 
                                            className="hidden sm:block cursor-pointer"
                                            onClick={handleEditPopUp}
                                        >
                                            {MoreDotIcon}
                                        </div>
                                    )
                                }
                            </div>
                            <div className="hidden sm:flex">
                                <p className="mr-[40px]">{posts?.length} posts</p>

                                <p 
                                    className="mr-[40px] cursor-pointer"
                                    onClick={handleFollowersPopUp}
                                >   
                                    {isUser(username) ? getFollower(userData?.userId).length : getFollower(otherUser?.userId).length} followers
                                </p>

                                <p 
                                    className="mr-[40px] cursor-pointer"
                                    onClick={handleFollowingPopUp}
                                >
                                    {isUser(username) ? getFollowing(userData?.userId).length : getFollowing(otherUser?.userId).length} following
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-[5px] flex sm:hidden items-center justify-around">
                        <div className=" text-center">
                            <p className="sm:mr-[40px] font-semibold">{posts?.length}</p>
                            <p className="text-[#7373a0] text-[15px]">posts</p>
                        </div>

                        <div className="text-center">
                            <p className="sm:mr-[40px] cursor-pointer font-semibold" onClick={handleFollowersPopUp}>   
                                {isUser(username) ? getFollower(userData?.userId).length : getFollower(otherUser?.userId).length}
                            </p>
                            <p className="text-[#7373a0] text-[15px]">followers</p>
                        </div>

                        <div className=" text-center">
                            <p className="sm:mr-[40px] cursor-pointer font-semibold" onClick={handleFollowingPopUp}>
                                {isUser(username) ? getFollowing(userData?.userId).length : getFollowing(otherUser?.userId).length}
                            </p>
                            <p className="text-[#7373a0] text-[15px]">following</p>
                        </div>
                    </div>
                    <div className="flex text-[#8e8e8e] justify-center font-semibold sm:border-t-0 border-t-[1px]">
                        <div 
                            className={tab == 1 ? "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px] border-t-[1px] border-black text-black" : "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px]"}
                            onClick = {() => setTab(1)}
                        >
                            <div className="text-[15px]">
                                {PostsIcon}
                            </div>
                            <p className="ml-[5px] text-[13px] ">POSTS</p>
                        </div>

                        {
                            isUser(username) && 
                            (
                                <div 
                                    className={tab == 2 ? "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px] border-t-[1px] border-black text-black" : "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px]"}
                                    onClick={() => setTab(2)}
                                >   
                                    <div className="text-[15px]">
                                        {SavedIcon}
                                    </div>
                                    <p className="ml-[5px] text-[13px] ">SAVED</p>
                                </div>
                            )
                        }

                        <div 
                            className={tab == 3 ? "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px] border-t-[1px] border-black text-black" : "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] sm:mr-[50px]"}
                            onClick={() => setTab(3)}
                        >
                            <div className="text-[15px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                            </div>
                            <p className="ml-[5px] text-[13px] ">REELS</p>
                        </div>

                        <div 
                            className={tab ==4 ? "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px] border-t-[1px] border-black text-black" : "flex items-center justify-center cursor-pointer w-[30%] sm:w-[60px] h-[50px]"}
                            onClick={() => setTab(4)}
                        >
                            <div className="text-[15px]">
                                {TaggedIcon}
                            </div>
                            <p className="ml-[5px] text-[13px] ">TAGGED</p>
                        </div>
                    </div>
                    <div className="sm:mx-[30px] mx-[20px] sm:mt-[30px]">
                        <div className={tab == 1 ?"block" : "hidden"}>
                            { isUser(username) ? <Posts userData = { userData } posts ={ posts } isUser = {isUser} /> : <Posts userData = { otherUser } posts ={ posts } isUser = {isUser} />}
                        </div>
                        <div className={tab == 2 ?"block" : "hidden"}>
                            { <Saved userData = { userData } /> }
                        </div>
                        <div className={tab == 3 ?"block" : "hidden"}>
                            { isUser(username) ? <Reels userData = { userData } posts ={ posts } isUser = { isUser } /> : <Reels userData = { otherUser } posts ={ posts } isUser = {isUser} />}
                        </div>
                        <div className={tab == 4 ?"block" : "hidden"}>
                            <Tagged/>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-2 right-0 left-0 sm:hidden">
                    <MobileSidebar/>
                </div>

            </div>
            )
        }
            
            
        </>
    )
}

export default AccountPage