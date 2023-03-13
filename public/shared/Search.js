import { CloseIconSmall } from "../icons/icons"

function Search ()
{

    const styles = {
        "padding": "10px 0",
        "border-top-right-radius": "10px",
        "box-shadow": "5px 0 6px -5px rgba(0, 0, 0, 0.5)"
    }

    const input = {
        "width": "364px",
        "height": "40px",
        "background": "rgb(239,239,239)",
        "border-radius": "5px"
    }

    const search = {
        "margin": "0 0 20px 0",
        "padding": "0 20px"
    }

    const searchBox = {
        "padding" : "0 5px",
    }

    return (
        <div className="w-full h-full bg-white flex flex-col justify-between border-r-[1px] rounded-br-[10px] border-[rgb(219,219,219)]" style={styles}>
            <div className="border-b-[1px] border-[rgb(219,219,219)] flex flex-col justify-center items-center" style={{padding:"0 0 40px 0"}}>
                <div className="font-[600] flex w-full" style={search}>Search</div>
                <div className="relative" style={input}>
                    <input style={searchBox} className="w-full h-full outline-none bg-transparent placeholder:text-[12px]" placeholder="Search"/>
                    <div className="absolute rounded-[50px] w-[20px] h-[20px] flex justify-center items-center text-white" style={{ right: "5px", top: '50%', transform: 'translateY(-50%)', background:"rgb(199,199,199)" }}>{CloseIconSmall}</div>
                </div>
            </div>
            <div className="">third</div>
        </div>
    )
}

export default Search