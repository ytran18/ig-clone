//firebase
import { auth, db } from '../../src/firebase'
import {signInWithPopup, GoogleAuthProvider, } from "firebase/auth"
import {onValue, ref, set } from "firebase/database"

//tag
import Image from 'next/image'
import Link from 'next/link'

//hook
import {useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { userPackage } from '../../public/redux/actions'

//img
import GoogleIcon from '../../public/icons/7123025_logo_google_g_icon.svg'
import { IgLogo } from "../../public/icons/icons"
import Instagram from "../../public/icons/instagram.jpg"

//component
import PopUp from '../../public/shared/PopUp'

const uuid = require("uuid")

function Login() {
    const [userDatas , setUserDatas] = useState([])
    const [isSuccess, setIsSuccess] = useState(false)
    const [isPopUp, setIsPopUp] = useState(false)
    const [statement, setStatement] = useState('Vui lòng kiểm tra lại email, password')
    const router = useRouter()
    const provider = new GoogleAuthProvider()
    const dispatch = useDispatch()
    const emailRef = useRef()
    const passRef = useRef()

    useEffect( () => {
        onValue(ref(db, '/users'), (snapshot) => {
            var data1 = []
            snapshot.forEach( (childSnapshot) =>{
                data1.push(childSnapshot.val())
            } )
            setUserDatas(data1)
        } )
    }, [])

    const isUser = (email) => {
        let isUer = false
        for(let i = 0; i < userDatas.length; i++){
            if(userDatas[i].email == email){
                isUer = true
                dispatch(userPackage(userDatas[i]))
                break;
            }
        }
        return isUer
    }

    const handlePopUp = () => {
        setIsPopUp(!isPopUp)
    }

    const handleLogIn = () => {
        userDatas.forEach( (userData) => {
            if(userData.email == emailRef.current.value && userData.password == passRef.current.value){
                setIsSuccess(true)
                setStatement('Đăng nhập thành công')
                dispatch(userPackage(userData))
                router.push(`/`)
            }
        } )
        setIsPopUp(!isPopUp)
        console.log(isSuccess)
        console.log(isPopUp)
    } 

    const handleLogInGoogle = () => {
        signInWithPopup(auth,provider)
            .then( (result) => {
                const endIndex = result.user.email.indexOf('@')
                if(isUser(result.user.email)){
                    router.push(`/`)
                }
                else{
                    const id = uuid.v4()
                    const userData = {
                        avatar: result.user.photoURL,
                        create_at: new Date().getTime(),
                        email: result.user.email,
                        name: result.user.displayName,
                        userId: id,
                        username: result.user.email.slice(0,endIndex)
                    }
                    dispatch(userPackage(userData))
                    set(ref(db, 'users/' + id ), {
                        ...userData
                    })
                    router.push(`/`)
                }
            } ).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            })
    }

    return(
        <div className=' w-screen h-screen'>
            <div className={userDatas.length == 0 ? "hidden" : "flex flex-col items-center"}>
                <div className={ isPopUp ? "block" : "hidden"} > 
                    <PopUp 
                        closePopUp={handlePopUp}
                        statement={statement}
                        isSuccess = {isSuccess}
                    /> 
                </div>
                <div className="sm:border-[1px] sm:w-[350px] h-[370px] flex flex-col items-center w-screen mt-[30px]">
                    <div className="text-[50px] font-bold h-[30%]">Instagram</div>
                    <div className="h-[70%] flex flex-col">
                        <input 
                            ref={emailRef}
                            className="outline-none	border-[1px] rounded w-[280px] h-[36px] text-[12px] p-[10px]"
                            placeholder="Phone number, user name, or email"
                        />
                        <input 
                            ref={passRef}
                            type = "password"
                            className="outline-none	border-[1px] rounded w-[280px] h-[36px] text-[12px] p-[10px] mt-[10px]"
                            placeholder="Password"
                        />

                        <div 
                            className="cursor-default bg-[#4db5f9] rounded w-[280px] h-[32px] text-center py-[5px] text-white mt-[10px] font-bold"
                            onClick={handleLogIn}
                        >
                            Log in
                        </div>

                        <div className="w-[280px] flex items-center mt-[10px]">
                            <div className="w-[40%] h-[1px] bg-black"></div>
                            <div className="w-[20%] text-center	text-[12px] font-bold">OR</div>
                            <div className="w-[40%] h-[1px] bg-black"></div>
                        </div>

                        <div 
                            className="text-center text-[#385185] font-semibold cursor-pointer mt-[10px] flex items-center justify-center"
                            onClick={handleLogInGoogle}
                        >
                            <Image className='w-[20px] h-[20px] mr-[5px]' src = {GoogleIcon} />
                            Log in with Google
                        </div>

                        <div className="text-center text-[12px] cursor-pointer mt-[10px]">
                            Forgot Password?
                        </div>
                    </div>
                </div>

                <div className="sm:w-[350px] sm:h-[45px] h-[45px] sm:border-[1px] mt-[10px] p-[10px] flex items-center justify-center w-screen">
                    <div className="mr-[10px] sm:mr-[5px] text-[20px] font-semibold">{`Don't have an account?`}</div>
                    <Link className="text-[#0095f6] text-[20px]" href="/auth/sign-up"> Sign up </Link>
                </div>
            </div>
        </div>
    )
}

export default Login