function PostOptions ({ close, unFollow, copyLink })
{
    return (
        <div className="w-[400px] bg-white rounded-[15px]">
            <div className="w-full h-[48px] cursor-pointer text-[rgb(237,73,86)] font-[700] flex justify-center items-center border-b-[1px] border-b-[rgb(219,219,219)]" onClick={() => {unFollow(true)}}>Unfollow</div>
            <div className="w-full h-[48px] cursor-pointer border-b-[1px] border-b-[rgb(219,219,219)] flex justify-center items-center font-[500]" onClick={() => {copyLink(true)}}>Copy link</div>
            <div className="w-full h-[48px] cursor-pointer border-b-[1px] border-b-[rgb(219,219,219)] flex justify-center items-center font-[500]">About this account</div>
            <div className="w-full h-[48px] flex justify-center items-center font-[500] cursor-pointer select-none" onClick={close}>Cancel</div>
        </div>
    )
}

export default PostOptions