import { useEffect, useMemo, useRef, useState } from "react"

import { useUserPackageHook } from "../redux/hooks"

import Post from "./Post"

function PostArea ({ posts, notFollowing })
{
    // user
    const user = useUserPackageHook()

    const [notFollowingUsers, setNotFollowingUsers] = useState([])
    const [follow, setFollow] = useState([])
    const [notFollow, setNotFollow] = useState([])

    useEffect(() => 
    {
        notFollowing?.map((item, index) =>
        {
            if (!notFollowingUsers.includes(item?.userId))
            {
                setNotFollowingUsers(prev => [...prev, item?.userId])
            }
        })
    },[notFollowing, notFollowingUsers])

    useEffect(() =>
    {
        if (notFollowingUsers.length === 0 || !posts) return;

        const newNotFollow = [];
        const newFollow = [];
        console.log(notFollowingUsers);

        posts.forEach((item) => {
            const postObject = Object.values(item);

            postObject.forEach((data) => {
                if (notFollowingUsers.includes(data?.userId)) {
                    if (!newNotFollow.some((item) => item.postId === data.postId)) {
                        newNotFollow.push(data);
                    }
                    // remove from newFollow if previously added
                    newFollow.forEach((f, index) => {
                        if (f.postId === data.postId) {
                            newFollow.splice(index, 1);
                        }
                    });
                } else {
                    if (!newFollow.some((item) => item.postId === data.postId)) {
                        newFollow.push(data);
                    }
                    // remove from newNotFollow if previously added
                    newNotFollow.forEach((n, index) => {
                        if (n.postId === data.postId) {
                            newNotFollow.splice(index, 1);
                        }
                    });
                }
            });
        });
        setNotFollow(newNotFollow);
        setFollow(newFollow);
    },[notFollowingUsers, posts])

    // display all posts from database
    const renderFollow = useMemo(() =>
    {
        return (
            <div> <Post post={follow}/> </div> 
        )
    },[follow])

    const renderNotFollow = useMemo(() =>
    {
        return (
            <div> <Post post={notFollow}/> </div> 
        )
    },[notFollow])

    return (
        <div className="w-full h-full flex flex-col items-center px-2">
            {renderFollow}
            {renderNotFollow}
        </div>
    )
}

export default PostArea