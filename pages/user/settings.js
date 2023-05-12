import { useState } from "react"

import Sidebar from "../../public/shared/Sidebar"
import SettingsSidebarItems from "../../public/shared/SettingsSidebarItems"
import EditProfile from "../../public/shared/EditProfile"
import ChangePassword from "../../public/shared/ChangePassword"
import TabCommingSoon from "../../public/shared/TabCommingSoon"

function Settings ()
{

    const [select, setSelect] = useState(1)
    const [activetab, setActiveTab] = useState(1)

    const tabData = [
        { text: "Edit Profile", UI: <EditProfile /> },
        { text: "Change password", UI: <ChangePassword /> },
        { text: "Apps and websites", UI: <TabCommingSoon /> },
        { text: "Email notifications", UI: <TabCommingSoon /> },
        { text: "Push notifications", UI: <TabCommingSoon /> },
        { text: "Manage contacts", UI: <TabCommingSoon /> },
        { text: "Privacy and security", UI: <TabCommingSoon /> },
        { text: "Ads", UI: <TabCommingSoon /> },
        { text: "Supervision", UI: <TabCommingSoon /> },
        { text: "Login activity", UI: <TabCommingSoon /> },
        { text: "Emails from Instagram", UI: <TabCommingSoon /> },
        { text: "Help", UI: <TabCommingSoon /> },
    ]
    
    return (
        <div className="flex justify-between w-screen h-screen">
            <div className=""> <Sidebar /> </div>
            <div className="w-full h-full px-2 lg:px-10 lg:py-10 overflow-auto scrollbar-hide">
                <div className="border-[1px] border-[rgb(219,219,219)] flex w-full h-full">
                    <div className="w-[20%] h-full border-r-[1px] text-[13px] border-l-[rgb(219,219,219)] flex flex-col">
                        {
                            tabData.map((item, index) =>
                            {
                                return (
                                    <div key={index}>
                                        <SettingsSidebarItems select={select} onClick={() => {setSelect(index+1); setActiveTab(index+1)}} index={index+1} text={item.text}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-full h-full">
                        {
                            tabData.map((item, index) =>
                            {
                                return (
                                    <div key={index} className={`w-full h-full ${index === activetab-1 ? "flex" : "hidden"}`}>
                                        {item.UI}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings