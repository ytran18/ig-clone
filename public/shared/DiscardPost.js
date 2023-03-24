
function DiscardPost( {handleDiscardPost, handleSelectedFile} ) {
    return(
        <div 
            className="z-50 fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-[450px] h-[200px] bg-white rounded-2xl">
                <div className="h-[50%] border-b-[1px] border-slate-400 flex flex-col items-center justify-center">
                    <div className="text-[20px] mb-2">
                        Discard Post?
                    </div>
                    <div className="text-[15px]">
                        If you leave, your edits won't be saved.    
                    </div>
                </div>
                <div 
                    className="h-[25%] cursor-pointer border-b-[1px] border-slate-400 flex flex-col items-center justify-center text-red-500 font-bold"
                    onClick={() => {
                        handleSelectedFile()
                        handleDiscardPost()
                    }}
                >
                    Discard
                </div>
                <div 
                    className="h-[25%] cursor-pointer flex flex-col items-center justify-center"
                    onClick={handleDiscardPost}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default DiscardPost