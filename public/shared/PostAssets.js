import { useEffect, useState } from "react"

function PostAssets ({ media })
{
    const assets = [
        {
            type: "img",
            url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/images%2F333212026_697900072033982_5877700820763256804_n.jpg?alt=media&token=e352b5bc-2f64-4b4e-90b2-2ef61901027c"
        },
        {
            type: "img",
            url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/images%2F336020176_879558733275891_2257798552567669651_n.jpg?alt=media&token=10009fcf-cef8-4302-a873-c3f6f7d85274"
        },
        {
            type: "video",
            url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/videos%2Fpexels-vlada-karpovich-8045821.mp4?alt=media&token=5b91590a-291b-4bdc-95c3-aacca7d0238c"
        }
    ]

    useEffect(() =>
    {
        console.log(media);
    },[])

    const [currImageIndex, setCurrImageIndex] = useState(0)

    const previousImage = () => {
        setCurrImageIndex((currImageIndex + assets.length - 1) % assets.length);
      };
    
      const nextImage = () => {
        setCurrImageIndex((currImageIndex + 1) % assets.length);
      };

    return (
        <div className="w-full z-0 relative flex justify-center bg-black">
            {
                assets[currImageIndex].type == "img" ?
                (
                    <img alt="img" className="w-full max-h-[585px]" src={assets[currImageIndex].url}/>
                )
                :
                (
                    <video className="w-[full] max-h-[585px]" loop autoPlay>
                        <source src={assets[currImageIndex].url}/>
                    </video>
                )
            }
            <div className="absolute top-[50%] left-0 right-0 px-4 py-2 text-transparent flex justify-between">
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