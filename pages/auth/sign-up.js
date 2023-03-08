import { useState } from "react"

import Line from "../../public/shared/Line"
import Input from "../../public/shared/Input"
import { IgLogo, FacebookIcon } from "../../public/icons/icons"
import Button from "../../public/shared/Button"
import { isEmail, enoughNumCountPass, hasWhiteSpaceAndValidLength, isEmpty } from "../../public/utils/functions"

function SignUp ()
{

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSummit = (email, name, username, password) =>
    {
        if(isEmpty(email) || isEmpty(name) || isEmpty(username) || isEmpty(password))
        {
            console.log("vui long dien het thong tin");
        }
        if(!isEmail(email))
        {
            console.log("invalid email");
            return
        }
        if(password.length < 6)
        {
            console.log("password chua dung");
            return
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="w-4/5 h-3/4 md:w-1/4 md:h-3/4 border-[1px] border-[rgb(219,219,219)] mb-4 flex flex-col items-center justify-center">
                <div className="text-black mb-4">{IgLogo}</div>
                <div className="text-[17px] font-[600] text-[rgb(142,142,142)] text-center mb-4">Sign up to see photos and videos from your friends.</div>
                <div className="w-4/5 h-[34px] mb-4">
                    <Button 
                        hoverColor={"rgb(26,119,242)"}
                        icon={FacebookIcon} 
                        backgroundColor={"rgb(0,149,246)"} 
                        iconColor={"white"} 
                        content={"Login with Facebook"}
                        contentColor={"white"}
                        rounded={"10px"}
                    />
                </div>
                <div className="w-4/5 mb-4"><Line content={"OR"}/></div>
                <div className="w-4/5 mb-4">
                    <div className="mb-2 h-[38px]"> <Input type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Mobile number or email address"/> </div>
                    <div className="mb-2 h-[38px]"> <Input type={"text"} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"/> </div>
                    <div className="mb-2 h-[38px]"> <Input type={"text"} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/> </div>
                    <div className="mb-2 h-[38px]"> <Input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/> </div>
                </div>
                <div className="w-4/5 h-[34px] bg-[rgb(103,181,250)] rounded-[10px]">
                    <Button 
                        contentColor={"white"}
                        content={"Sign up"}
                        onClick={() =>{handleSummit(email, name, userName, password)}}
                    />
                </div>
            </div>
            <div className="w-4/5 h-[70px] md:w-1/4 border-[1px] border-[rgb(219,219,219)] text-[14px] flex justify-center items-center">
                Have an account? <a className="text-[rgb(7,119,195)] cursor-pointer ml-1">Log in</a>
            </div>
        </div>
    )
}

export default SignUp