import Image from "next/image"
import { useEffect, useMemo, useState, useRef, useCallback } from "react"

import { ChevronLeft, ChevronRight, Dot, MuteAudio, OnAudio } from "../icons/icons"

function PostAssets ({ media })
{
    const length = media?.length - 1
    const [currImageIndex, setCurrImageIndex] = useState(0)
    const videoRef = useRef(null)

    const previousImage = () => { if (currImageIndex !== 0) { setCurrImageIndex(prev => prev - 1);} }
    const nextImage = () => { if (currImageIndex < length) { setCurrImageIndex(prev => prev + 1);} }
    
    useEffect(() =>
    {
        media?.map((item ,index) =>
        {
            if(index == currImageIndex)
            {
                const dot = document.getElementById(index)
                dot.classList.remove("text-[rgb(138,131,111)]")
                dot.classList.add("text-[rgb(255,255,255)]")
            }
            else {
                const disable = document.getElementById(index)
                disable.classList.remove("text-[rgb(255,255,255)]")
                disable.classList.add("text-[rgb(138,131,111)]")
            }
        })
    },[currImageIndex])

    const handleAudio = useCallback(() =>
    {
        const audio = document.getElementById("video")
        audio.muted = !audio.muted
    },[])

    // render UI
    const renderMedia = useMemo(() =>
    {
        return (
            <>
            {
                media?.[currImageIndex]?.type == "img" ?
                ( <Image key={currImageIndex} alt="img" className="max-w-full max-h-[585px] bg-cover bg-center" width={500} height={300} src={media[currImageIndex]?.url}/> )
                :
                (
                    <div className="relative w-full max-h-[585px] flex justify-center" key={currImageIndex}>
                        <video ref={videoRef} id="video" className="w-[full] max-h-[585px] bg-cover bg-center" autoPlay muted>
                            <source src={media?.[currImageIndex]?.url} />
                        </video>
                        <div className="absolute bottom-4 right-4 cursor-pointer" onClick={handleAudio}> {videoRef.current?.muted ? MuteAudio : OnAudio} </div>
                    </div>
                )
            }
            </>
        )
    },[currImageIndex, media, handleAudio])

    const renderNavigate = useMemo(() =>
    {
        return (
            <>
                <div className={`absolute top-[50%] left-0 right-0 px-4 py-2 text-transparent flex text-white ${currImageIndex > 0 ? "justify-between" : "justify-end" }`}>
                    <div onClick={previousImage} className={`text-black items-center justify-center cursor-pointer bg-[rgb(181,181,181)] rounded-full w-[30px] h-[30px] ${currImageIndex === 0 ? "hidden" : "flex"}`}> {ChevronLeft} </div>
                    <div onClick={nextImage} className={`text-black items-center justify-center bg-[rgb(181,181,181)] w-[30px] h-[30px] rounded-full cursor-pointer ${currImageIndex === length ? "hidden" : "flex"}`}> {ChevronRight} </div>
                </div>
            </>
        )
    },[currImageIndex, nextImage, previousImage])

    const renderDot = useMemo(() =>
    {
        return (
            <>
                <div className={`absolute bottom-0 ${length === 0 ? "hidden" : "flex"}`}>
                    {
                        media?.map((item, index) =>
                        {
                            return (
                                <div key={index}>
                                    <div id={index} className="text-[rgb(138,131,111)] -mx-[10px]"> {Dot} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    },[])

    return (
        <div className="w-full z-0 relative flex justify-center bg-black">
            {renderMedia}
            {renderNavigate}
            {renderDot}
        </div>
    )
}

export default PostAssets