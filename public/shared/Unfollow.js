import Image from "next/image"

import { db } from "../../src/firebase"
import { get, set, query, ref } from "firebase/database"

import { useUserPackageHook } from "../redux/hooks"

function Unfollow ({ AVT, username, close, followState, id })
{
    // user
    const user = useUserPackageHook()
    // query
    const getFollow = query(ref(db, `users/${user?.userId}`))


    const hanldeUnFollow = () =>
    {
        get(getFollow).then((snapshot) =>
        {
            const newArr = snapshot.val()?.following?.filter((data) => data !== id)
            const followPath = query(ref(db, `users/${user?.userId}/following`))
            set(followPath, newArr)
        })
        followState(0)
    }

    return (
        <div className="w-[260px] md:w-[400px] h-[293px] bg-white rounded-[10px]">
            <div className="h-[197px] w-full border-b-[1px] border-b-[rgb(219,219,219)] flex flex-col justify-center items-center">
                <Image alt="avt" src={AVT} className="w-[90px] h-[90px] rounded-full" width={90} height={90}/>
                <div className="text-[14px] py-4">{`Unfollow @${username}?`}</div>
            </div>
            <div className="h-[48px] w-full border-b-[1px] border-b-[rgb(219,219,219)] text-[rgb(237,73,86)] font-[600] flex items-center justify-center cursor-pointer select-none text-[14px]" onClick={hanldeUnFollow} >Unfollow</div>
            <div className="h-[48px] w-full flex text-[14px] items-center justify-center cursor-pointer select-none" onClick={close}>Cancel</div>
        </div>
    )
}

export default Unfollow