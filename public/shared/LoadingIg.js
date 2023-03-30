import Image from "next/image"
import IG_LOGO from "../icons/icons8-instagram.svg"

function Loading ()
{
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Image src={IG_LOGO} alt="logo" className="w-[128px] h-[128px]"/>
        </div>
    )
}

export default Loading