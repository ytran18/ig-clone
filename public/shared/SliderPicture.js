import { useState } from "react"
import { useDispatch } from "react-redux"
import { postPackage } from "../redux/actions"
import { useRouter } from "next/router"

function SliderPicture( {selectedFile, handleChange} ) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const router = useRouter()

    const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(postPackage(selectedFile))
        router.push("/")
    }
    
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
        setCurrentIndex( prev => {
            if(prev == selectedFile.length - 1){
                return selectedFile.length - 1
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
                    <div>Crop</div>
                    <div 
                        className="text-[#0095f6] cursor-pointer hover:text-black"
                        onClick={handleNext}
                    >
                        Next
                    </div>
                </div>
                <div className="h-[90%] relative">
                    <img
                        className="w-full h-full"
                        src={selectedFile[currentIndex]}
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
                    <label htmlFor="addFile" className=" font-extrabold text-[50px] text-white absolute bottom-0 right-2 cursor-pointer">
                        +
                    </label>
                </div>
                <input
                    type={"file"} id = "addFile" className="hidden"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default SliderPicture