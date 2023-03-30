import StoryElement from "./StoryElement"

import AVT01 from "../data-test/assets/img/Hobi-2.jpeg"
import AVT02 from "../data-test/assets/img/Jin-4.jpeg"
import AVT03 from "../data-test/assets/img/JK-2.jpeg"
import AVT04 from "../data-test/assets/img/Suga_4.jpeg"
import AVT05 from "../data-test/assets/img/NamJoon-2.jpeg"
import AVT06 from "../data-test/assets/img/Jimin.jpeg"
import AVT07 from "../data-test/assets/img/BangTan-3.jpeg"
import AVT08 from "../data-test/assets/img/TaeHyung-2.jpeg"

function Story ()
{
    return (
        <div className="h-[117px] w-full flex items-center lg:px-20 md:px-20 justify-between">
            <StoryElement image={AVT01}/>
            <StoryElement image={AVT02}/>
            <StoryElement image={AVT03}/>
            <StoryElement image={AVT04}/>
            <StoryElement image={AVT05}/>
            <StoryElement image={AVT06}/>
            <StoryElement image={AVT07}/>
            <StoryElement image={AVT08}/>
        </div>
    )
}

export default Story