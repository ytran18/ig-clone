//hook
import Image from "next/image"
import { useEffect, useState, useLayoutEffect } from "react"
import { useUserPackageHook } from "../../public/redux/hooks"
import { useRouter } from "next/router"

//icon/image
import { EditIcon, PostsIcon, SavedIcon, TaggedIcon } from "../../public/icons/icons"

//firebase
import { ref as ref2, update, onValue} from "firebase/database"
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

    useEffect( () => {
        if(userData.userId == null) router.push("/auth/Login") 
    })

    useEffect( () => {
        if(!isUser(username)){
            const user = getUser()
            for(let i = 0; i <= user.length - 1; i++){
                if(user[i].username == username){
                    setOtherUser(user[i])
                    onValue(ref2(db, `/posts/${ user[i].userId}/`), (snapshot) => {
                        var posts1 = []
                        snapshot.forEach( (childSnapshot) => {
                            posts1.push(childSnapshot.val())
                        });
                        setPosts(posts1)
                    });
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
                                    (<div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px]">
                                        Edit Profile 
                                    </div>) :
                                    (<div className=" bg-sky-400 mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px]">
                                        Follow
                                    </div>)
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
                            { isUser(username) ? <Posts userData = { userData } posts ={ posts }/> : <Posts userData = { otherUser } posts ={ posts }/>}
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
            
            
        </>
    )
}

export default AccountPage