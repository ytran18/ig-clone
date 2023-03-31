import { useRouter } from "next/router"

// redux
import { auth } from "../../src/firebase"
import { useDispatch } from "react-redux"
import { clear } from "../redux/actions"

import { EditIcon, TimeIcon, SavedIconBig, MoonIcon } from "../../public/icons/icons"

function More ()
{
    // router
    const router = useRouter()
    // dispatch
    const dispatch = useDispatch()

    const handleSignOut = () =>
    {
        auth.signOut()
        dispatch(clear())
        router.push("/auth/Login")
    }

    return (
        <div className="w-[238px] h-[264px] shadow-2xl rounded-[10px] bg-white drop-shadow-2xl">
            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer border-b-[1px] border-b-[rgb(234,234,234)] hover:bg-[rgb(250,250,250)]">
                <div className="font-[400]">Settings</div>
                <div className="">{EditIcon}</div>
            </div>

            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer border-b-[1px] border-b-[rgb(234,234,234)] hover:bg-[rgb(250,250,250)]">
                <div className="font-[400]">Your Activity</div>
                <div className="">{TimeIcon}</div>
            </div>

            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer border-b-[1px] border-b-[rgb(234,234,234)] hover:bg-[rgb(250,250,250)]">
                <div className="font-[400]">Save</div>
                <div className="">{SavedIconBig}</div>
            </div>

            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer border-b-[1px] border-b-[rgb(234,234,234)] hover:bg-[rgb(250,250,250)]">
                <div className="font-[400]">Switch appearance</div>
                <div className="">{MoonIcon}</div>
            </div>

            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer border-b-[1px] border-b-[rgb(234,234,234)] hover:bg-[rgb(250,250,250)]">
                <div className="font-[400]">Switch accounts</div>
            </div>

            <div className="w-full h-[44px] flex justify-between px-3 items-center select-none cursor-pointer hover:bg-[rgb(250,250,250)] rounded-br-[10px] rounded-bl-[10px]" onClick={handleSignOut}>
                <div className="font-[400]">Log out</div>
            </div>
        </div>
    )
}

export default More