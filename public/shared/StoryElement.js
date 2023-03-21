import Image from "next/image"
import IMG01 from "../data-test/assets/img/BangTan-3.jpeg"

function StoryElement ({image})
{
    return (
        <div className="w-[66px] h-[66px] rounded-[50px] border-2 border-pink-500 p-1
        flex justify-center items-center">
            <div className="w-[56px] h-[56px] bg-black rounded-[50px]">
                <Image src={image} alt="img" className="rounded-[50px] w-full h-full"/>
            </div>
        </div>
    )
}

export default StoryElement