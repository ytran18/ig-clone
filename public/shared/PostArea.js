import { useEffect, useMemo, useState } from "react"

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
        notFollowingUsers.length > 0 ? 
        (
            posts?.map((item, index) =>
            {
                const postObject = Object.values(item)
                postObject?.map((data, index2) =>
                {
                    if (notFollowingUsers.includes(data?.userId))
                    {
                        if (!notFollow.includes(data))
                        {
                            setNotFollow(prev => [...prev, data])
                        }
                    }
                    else {
                        if (!follow.includes(data))
                        {
                            setFollow(prev => [...prev, data])
                        }
                    }
                })
            })
        )
        :
        (null)
    },[notFollowingUsers, posts, follow, notFollow])

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

    useEffect(() =>
    {
        console.log(notFollowingUsers);
    },[notFollowingUsers])

    return (
        <div className="w-full h-full flex flex-col items-center px-2">
            {renderFollow}
            {renderNotFollow}
        </div>
    )
}

export default PostArea