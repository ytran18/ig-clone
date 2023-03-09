function Input ({ placeholder, type, onChange, value })
{
    return (
        <div className="w-full h-full border-[1px] border-[rgb(219,219,219)] rounded-[5px] bg-[rgb(250,250,250)]">
            <input 
                className="w-full h-full text-[12px] outline-none bg-transparent p-1 placeholder:text-[12px]"
                placeholder={placeholder} 
                type={type} 
                onChange={onChange} 
                value={value}
            />
        </div>
    )
}

export default Input