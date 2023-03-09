import { auth, db } from '../../src/firebase'
import {signInWithPopup, GoogleAuthProvider, } from "firebase/auth"
import { ref, set } from "firebase/database"

function Login() {
    const provider = new GoogleAuthProvider()
    const handleLogIn = () => {
        signInWithPopup(auth,provider)
            .then( (result) => {
                set( ref(db, 'users/' + result.user.uid ), {
                    avatar: result.user.photoURL,
                    create_at: new Date().getTime(),
                    email: result.user.email,
                    name: result.user.displayName,
                    userId: result.user.uid
                })
            } )
            .catch( (error) => {
                console.log(error.message)
            } )
    }

    return(
        <div className="flex flex-col items-center mt-[30px]">
            <div className="border-[1px] w-[350px] h-[370px] flex flex-col items-center	 ">
                <div className="text-[50px] font-bold h-[30%]">Instagram</div>
                <div className="h-[70%] flex flex-col">
                    <input 
                        className="outline-none	border-[1px] rounded w-[280px] h-[36px] text-[12px] p-[10px]"
                        placeholder="Phone number, user name, or email"
                    />
                    <input 
                        className="outline-none	border-[1px] rounded w-[280px] h-[36px] text-[12px] p-[10px] mt-[10px]"
                        placeholder="Password"
                    />

                    <div className=" bg-[#4db5f9] rounded w-[280px] h-[32px] text-center py-[5px] text-white mt-[10px] font-bold">
                        Log in
                    </div>

                    <div className="w-[280px] flex items-center mt-[10px]">
                        <div className="w-[40%] h-[1px] bg-black"></div>
                        <div className="w-[20%] text-center	text-[12px] font-bold">OR</div>
                        <div className="w-[40%] h-[1px] bg-black"></div>
                    </div>

                    <div 
                        className="text-center text-[#385185] font-semibold cursor-pointer mt-[10px]"
                        onClick={handleLogIn}
                    >
                        Log in with Google
                    </div>

                    <div className="text-center text-[12px] cursor-pointer mt-[10px]">
                        Forgot Password?
                    </div>
                </div>
            </div>

            <div className="w-[350px] h-[45px] border-[1px] mt-[10px] p-[10px] flex items-center justify-center">
                <div className="mr-[5px]"> Don't have an account?</div>
                <div className="text-[#0095f6]">Sign up</div>
            </div>
        </div>
    )
}

export default Login