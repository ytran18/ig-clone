import { useState } from "react"

import { CloseIcon } from "../icons/icons"

function GenderPopUp ({ close, genderValue })
{

    const [gender, setGender] = useState("") 

    return (
        <div className="bg-white relative w-2/3 h-2/6 md:w-2/5 md:h-2/6 rounded-[15px]">
            <div className="w-full h-[15%] border-b-[1px] border-b-[rgb(219,219,219)] flex justify-center items-center font-semibold">
                Gender
            </div>
            <div className="w-full h-[60%]">
                <form className="flex flex-col w-full h-full font-semibold text-[15px] justify-center px-4">
                    <div>
                        <input type="radio" id="male" onChange={() => setGender("Male")} name="gender" value={"Male"}/>
                        <label htmlFor="male" className="mx-2">Male</label>
                    </div>
                    <div>
                        <input type="radio" id="female" onChange={() => setGender("Female")} name="gender" value={"Female"}/>
                        <label htmlFor="female" className="mx-2">Female</label>
                    </div>
                    <div>
                        <input type="radio" id="not" onChange={() => setGender("Prefer not to say")} name="gender" value={"Prefer not to say"}/>
                        <label htmlFor="not" className="mx-2">Prefer not to say</label>
                    </div>
                </form>
            </div>
            <div className="w-full h-[25%] px-4 pb-4">
                <input type="button" onClick={() => {genderValue(gender); close}} value={"Done"} className="w-full h-full text-white font-semibold cursor-pointer bg-[rgb(0,149,246)] hover:bg-[rgb(26,119,242)] rounded-[10px]"/>
            </div>
            <div className="absolute top-2 right-2">
                <div className="cursor-pointer" onClick={close}>{CloseIcon}</div>
            </div>
        </div>
    )
}

export default GenderPopUp