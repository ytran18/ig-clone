import { SuccessIcon, FailIcon } from "../icons/icons"

function PopUp ({ statement, isSuccess })
{
    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl">
            <div className={`relative select-none w-[300px] h-[120px] bg-[rgb(255,255,255)] rounded-[25px] flex justify-center items-center border-[2px] ${isSuccess ? "border-[rgb(6,176,80)]" : "border-[rgb(255,0,0)]"}`}>
                {
                    isSuccess ? 
                    (
                        <div className="flex flex-col items-center">
                            <div className="text-[rgb(6,176,80)]">{SuccessIcon}</div>
                            <div className="text-[rgb(6,176,80)] font-[700] text-[20px]">{statement}</div>
                        </div>
                    )
                    : 
                    (
                        <div className="flex flex-col items-center">
                            <div className="text-[rgb(255,0,0)]">{FailIcon}</div>
                            <div className="text-[rgb(255,0,0)] font-[700] text-[20px]">{statement}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PopUp