import { usePostPackageHook } from "../redux/hooks"

//img
import DefaultProfile from "../icons/defaultProfile.jpg"
import Image from "next/image"
import { useRef, useState } from "react"

//icon
import { ArrowLeft, ChevronLeft, ChevronRight } from "../icons/icons" 

//firebase
import { storage, db } from "../../src/firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { ref as ref2, set } from "firebase/database"

const uuid = require("uuid")

function PrePost( {handlePrePost} ) {
    const imgs = usePostPackageHook()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hideLike, setHideLike] = useState(false)
    const [blockComment, setBlockComment] = useState(false)
    const captionRef = useRef()
    
    const handleShare = () => {
        const id = uuid.v4()
        imgs.map((img) => {
            const imageRef = ref(storage, `posts/${id}/${img.file.name}`)
            uploadBytes(imageRef, img.file)
        })
        listAll(ref(storage, `posts/${id}`))
            .then( (res) => {
                console.log(id)
                console.log(res)
                var media = []
                res.items.forEach( (itemRef) => {
                    getDownloadURL(ref(storage,itemRef.toString()))
                        .then( (url) => { 
                            console.log(url);
                            media.push(url)
                            set(ref2(db, 'posts/' + id), {
                                    userId: '123',
                                    postId: id,
                                    createAt: new Date().getTime(),
                                    caption:captionRef.current.value,
                                    media:media,
                                    likes: 0,
                                    comment: 0,
                                    tagPeople: 0,
                                    hideLike: hideLike,
                                    blockComment: blockComment
                            })    
                        } )
                } )
            } )
    }

    const handleChevronLeft = () => {
        setCurrentIndex( prev => prev -1 )
    }

    const handleChevronRight = () => {
        setCurrentIndex( prev => prev + 1 )
    }

    return(
        <div className="w-3/5 h-3/4 bg-white rounded-2xl">
            <div className="h-[10%] border-b-[1px] border-b-[rgb(240,240,240)] flex items-center justify-between px-[10px]">
                <div className="cursor-pointer" onClick={handlePrePost}> {ArrowLeft} </div>
                <div className="font-bold"> Create new post </div>
                <div className="text-[rgb(60,163,248)] font-bold cursor-pointer hover:text-black" onClick={handleShare}> Share </div>
            </div>
            <div className="h-[90%] w-full flex">
                <div className="w-[50%] bg-black rounded-bl-2xl">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <img className="w-full max-h-full select-none" src={imgs[currentIndex].url} />
                        <div className={`cursor-pointer absolute left-0 top-[50%] text-white ${currentIndex == 0 ? "hidden" : "block"}`} onClick={handleChevronLeft}> {ChevronLeft} </div>
                        <div className={`cursor-pointer absolute right-0 top-[50%] text-white ${currentIndex == imgs.length - 1 ? "hidden" : "block" }`} onClick={handleChevronRight}> {ChevronRight} </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="h-[10%] flex items-center mb-4 p-4"> 
                        <div className="w-[32px] h-[32px]">
                            <Image className="w-full h-full rounded-full" src={DefaultProfile}/>
                        </div>
                        <div className="mx-[10px]">Hung</div>
                    </div>
                    <div className="h-[50%] w-full p-4">
                        <textarea ref={captionRef}  className="w-full h-full outline-none text-[14px] resize-none" placeholder="Write a caption...">

                        </textarea>
                    </div>
                    <div className="h-[40%] border-t-[1px] p-4">
                        <div className="flex justify-between mb-[10px]">
                            <div>Hide Like</div>
                            <div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value={hideLike} onChange={() => setHideLike(!hideLike)} class="sr-only peer"/>
                                <div class="w-11 h-6 bg-gray-200 outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label> 
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>Block Comment</div>
                            <div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value={blockComment} onChange={() => setBlockComment(!blockComment)} class="sr-only peer"/>
                                <div class="w-11 h-6 bg-gray-200 outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrePost