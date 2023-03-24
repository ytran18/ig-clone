import {MediaIcon} from "../icons/icons"
import { storage,db } from "../../src/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { set, ref as ref2} from "firebase/database"
import { useState } from "react"
import SliderPicture from "./SliderPicture"
import DiscardPost from "./DiscardPost"

function CreatePost( {handleCreatePost} ) {
    // const picture = [
    //     {url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/posts%2Ftest%2FBangTan.jpeg?alt=media&token=d6767d89-04c1-4a8a-8371-d377358c3f81"},
    //     {url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/posts%2Ftest%2FWIN_20210922_11_03_50_Pro.jpg?alt=media&token=4462ab1a-8b54-434f-9107-0d3edd948887"},
    //     {url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/posts%2Ftest%2Fscreenshot_1632283977%20(2).png?alt=media&token=81fc4ce1-1031-41a6-bf90-a2c1bd260acc"},
    //     {url: "https://firebasestorage.googleapis.com/v0/b/ig-clone-6d3e1.appspot.com/o/posts%2Ftest%2Fscreenshot_1632283977.png?alt=media&token=297fa23d-e2f2-4861-98c2-9b685020dbfe"}
    // ]
    // const [imageArray, setImageArray] = useState(picture)

    const [selectedFile, setSelectedFile] = useState([])

    const [discardPost, setDiscardPost] = useState(false)

    const handleChange = (e) => {
        const file = URL.createObjectURL(e.target.files[0])
        setSelectedFile( prev => [...prev,file] )
    }

    const handleDiscardPost = () => {
        setDiscardPost(!discardPost)
    }

    const handleSelectedFile = () => {
        setSelectedFile([])
    }
    
    // const handleChange = (e) => {
    //     const file = e.target.files[0]
    //     const imageRef = ref(storage, `posts/test/${file.name}`)
    //     uploadBytes(imageRef, file)
    //         .then( (snapshot) => {
    //             getDownloadURL(imageRef)
    //                 .then((url) => {
    //                     set(ref2(db, "posts/" + "test"), {
    //                         postId: 123,
    //                         owner: 123,
    //                         create_at: new Date().getTime(),
    //                         assets: url,
    //                         likes: 0,
    //                         comment: 0,
    //                         status: 'test',
    //                     })
    //                 })
    //                 .catch( (error) => {
    //                     console.log(error.message)
    //                 })
    //             console.log('Uploaded a blob or file!');
    //             handleCreatePost()
    //         })
    //         .catch( (error) => {
    //             console.log(error.message)
    //         })
    // }

    return(
        <div 
            className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(35,35,35,0.16)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl"
            onClick={selectedFile.length == 0 ? handleCreatePost : handleDiscardPost}
        >
            <div className={discardPost ? "block" : "hidden"}>
                <DiscardPost 
                    handleDiscardPost = {handleDiscardPost}
                    handleSelectedFile = {handleSelectedFile}
                />
            </div>

            <div className="absolute right-[10px] top-[10px] text-white text-[20px] font-semibold cursor-pointer">
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
                        selectedFile = {selectedFile}
                        handleChange = {handleChange}
                    />
                )
            }

        </div>
    )
}

export default CreatePost