// icons/images
import {MediaIcon} from "../icons/icons"

// hook
import { useState } from "react"
import { useDispatch } from "react-redux"
import { postPackage } from "../redux/actions"

//component
import SliderPicture from "./SliderPicture"
import DiscardPost from "./DiscardPost"

function CreatePost( {handleCreatePost, userData} ) {

    const [selectedFile, setSelectedFile] = useState([])

    const [discardPost, setDiscardPost] = useState(false)

    const [isReels, setIsReels] = useState(false)
    
    const [warning, setWarning] = useState(false)

    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        if(e.target.files.length !== 0){
            if(isReels){
                setWarning(true)
                setTimeout(() => {
                    setWarning(false)
                }, 5000)
                setMsg("You cannot add photo or video because this video is longer then one minute")
            }
            else{
                if(e.target.files[0].type.includes('video')){
                    if(e.target.files[0].size >= 14594091){
                        if(selectedFile.length === 0){
                            const url = URL.createObjectURL(e.target.files[0])
                            const file = e.target.files[0]
                            setSelectedFile( prev => [...prev,{url: url, file: file}])
                            setIsReels(true)
                        }
                        else{
                            setWarning(true)
                            setTimeout(() => {
                                setWarning(false)
                            }, 5000)
                            setMsg("This video is too long. Please choose video less one minutes")
                        }
                    }
                    else{
                        const url = URL.createObjectURL(e.target.files[0])
                        const file = e.target.files[0]
                        setSelectedFile( prev => [...prev,{url: url, file: file}])
                    }
                }
                else{
                    const url = URL.createObjectURL(e.target.files[0])
                    const file = e.target.files[0]
                    setSelectedFile( prev => [...prev,{url: url, file: file}])
                }
            }
        } 
    }

    const handleDiscardPost = () => {
        setDiscardPost(!discardPost)
        setIsReels(false)
    }

    const handleSelectedFile = () => {
        setSelectedFile([])
    }

    return(
        <div 
            className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl"
            
        >
            <div className={discardPost ? "block" : "hidden"}>
                <DiscardPost 
                    handleDiscardPost = {handleDiscardPost}
                    handleSelectedFile = {handleSelectedFile}
                />
            </div>

            <div 
                className="absolute right-[10px] top-[10px] text-white text-[20px] font-semibold cursor-pointer"
                onClick={selectedFile.length == 0 ? handleCreatePost : handleDiscardPost}
            >
                X
            </div>

            {
                selectedFile.length == 0 ?
                (
                    <div 
                        className="w-[400px] h-[440px] bg-white rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="h-[10%] flex items-center justify-center border-b-[1px] border-slate-300 font-semibold">
                            Create new post
                        </div>
                        <div className="h-[90%] flex flex-col items-center justify-center">
                            <div className="mb-[20px]">
                                {MediaIcon} 
                            </div>

                            <div className="mb-[10px] text-[22px]">Drag photos and videos here</div>

                            <input 
                                type="file" id="uploadBtn" className="hidden"
                                onChange={handleChange}
                            />

                            <label htmlFor="uploadBtn" className="w-[200px] cursor-pointer text-center py-[5px] bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg">
                                Select from computer
                            </label>
                        </div>
                    </div>
                ): 
                (
                    <SliderPicture
                        isReels = {isReels}
                        warning = {warning}
                        msg = {msg} 
                        userData = { userData }
                        selectedFile = {selectedFile}
                        handleChange = {handleChange}
                        handleDiscardPost = {handleDiscardPost}
                        handleCreatePost = {handleCreatePost}
                        handleSelectedFile = {handleSelectedFile}
                    />
                )
            }

        </div>
    )
}

export default CreatePost