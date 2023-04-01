import Image from "next/image";
import { useEffect, useState } from "react"

function PostAssets ({ media })
{
    const [currImageIndex, setCurrImageIndex] = useState(0)

    const previousImage = () => {
        setCurrImageIndex((currImageIndex + media.length - 1) % media.length);
    };
    
      const nextImage = () => {
        setCurrImageIndex((currImageIndex + 1) % media.length);
    };
    
    return (
        <div className="w-full z-0 relative flex justify-center bg-black">
            {
                media?.[currImageIndex]?.type == "img" ?
                (
                    <img alt="img" className="max-w-full max-h-[585px] bg-cover bg-center" src={media[currImageIndex]?.url}/>
                )
                :
                (
                    <video className="w-[full] max-h-[585px] bg-cover bg-center" loop autoPlay>
                        <source src={media?.[currImageIndex]?.url} />
                    </video>
                )
            }
            <div className="absolute top-[50%] left-0 right-0 px-4 py-2 text-transparent flex justify-between text-white">
                <button onClick={previousImage} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button onClick={nextImage} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default PostAssets