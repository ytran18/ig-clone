import { useState } from "react"

function SliderPicture( {fileArray} ) {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const handleChevronLeft = () => {
        setCurrentIndex( prev => {
            if(prev == 0){
                return 0
            }
            else{
                return prev - 1
            }
        } )
    }

    const handleChevronRight = () => {
        console.log(fileArray.length)
        setCurrentIndex( prev => {
            if(prev == fileArray.length - 1){
                return fileArray.length - 1
            }
            else{
                return prev + 1
            }
        } )
    }

    return(
        <div>
            <div 
                className="w-[400px] h-[440px] bg-white rounded-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-[10%] flex items-center justify-between border-b-[1px] border-slate-300 font-semibold px-[20px]">
                    <div> icon </div>
                    <div>Create new post</div>
                    <div className="text-[#0095f6] cursor-pointer hover:text-black">Next</div>
                </div>
                <div className="h-[90%] relative">
                    <img
                        className="w-full h-full"
                        src={fileArray[currentIndex].url}
                    />
                    <div 
                        className="absolute left-3 top-[50%] text-white font-extrabold cursor-pointer"
                        onClick={handleChevronLeft}
                    >
                        LEFT
                    </div>

                    <div 
                        className="absolute right-3 top-[50%] text-white font-extrabold cursor-pointer"
                        onClick={handleChevronRight}
                    >
                        RIGHT
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderPicture