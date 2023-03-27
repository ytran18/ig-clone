import { useState } from "react"
import { useDispatch } from "react-redux"
import { postPackage } from "../redux/actions"

//component
import PrePost from "./PrePost"

//icon
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "../icons/icons" 

function SliderPicture( {selectedFile, handleChange, handleDiscardPost, handleCreatePost} ) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [prePost, setPrePost] = useState(false)

    const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(postPackage(selectedFile))
        setPrePost(!prePost)
    }

    const handlePrePost = () => {
        setPrePost(!prePost)
    }
    
    const handleChevronLeft = () => {
        setCurrentIndex(prev => prev - 1)
    }

    const handleChevronRight = () => {
        setCurrentIndex( prev => prev + 1)
    }

    return(
        <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className={prePost ? " w-full h-full flex items-center justify-center" : "hidden"}>
                <PrePost 
                    handlePrePost = {handlePrePost} 
                    handleCreatePost = {handleCreatePost}
                />
            </div>
            <div 
                className={`w-[400px] h-[440px] bg-white rounded-xl  ${prePost ? "hidden" : "block"}`}
                
            >
                <div className={"h-full w-full"}>
                    <div className={"h-[10%] flex items-center justify-between border-b-[1px] border-slate-300 font-semibold px-[20px]"}>
                        <div className="text-black cursor-pointer" onClick={handleDiscardPost}> 
                            {ArrowLeft} 
                        </div>
                        <div>Crop</div>
                        <div 
                            className="text-[#0095f6] cursor-pointer hover:text-black"
                            onClick={handleNext}
                        >
                            Next
                        </div>
                    </div>
                    <div className="h-[90%] relative flex items-center justify-center bg-black">
                        {
                            selectedFile[currentIndex].file.type.includes('image') ? 
                            (
                                <img
                                    className=" w-full max-h-full select-none"
                                    src={selectedFile[currentIndex].url}
                                />
                            ):
                            (
                                <video 
                                    className=" w-full max-h-full select-none"
                                    src={selectedFile[currentIndex].url}
                                    autoPlay
                                />
                            )
                        }
                        <div 
                            className={`absolute left-3 top-[50%] text-white font-extrabold cursor-pointer ${currentIndex == 0 ? "hidden" : "block"}`}
                            onClick={handleChevronLeft}
                        >
                        {ChevronLeft}
                        </div>

                        <div 
                            className={`absolute right-3 top-[50%] text-white font-extrabold cursor-pointer ${currentIndex == selectedFile.length -1 ? "hidden" : "block"}`}
                            onClick={handleChevronRight}
                        >
                            {ChevronRight}
                        </div>
                        <label htmlFor="addFile" className=" font-extrabold text-[50px] text-white absolute bottom-2 right-2 cursor-pointer">
                            {Plus}
                        </label>
                    </div>
                    <input
                        type={"file"} id = "addFile" className="hidden"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default SliderPicture