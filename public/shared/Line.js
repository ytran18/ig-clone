import React from "react";

export default function Line({
  content, // nội dung được hiển thị trên Line
  isLineWhite = false, // nếu line màu trắng thì true
  lineWeight = true, // mặc đinh line dày 2px, nếu false thì dày 1px
  margin = "", // truyền margin theo class tailwindcss
}) {
  return (
    <div
      className={`w-full justify-center items-center flex flex-row
        ${margin}`}
    >
      <div
        className={`flex-grow relative flex justify-center items-center
          ${lineWeight ? "h-[2px]" : "h-[1px]"}  
          ${isLineWhite ? "bg-white" : "bg-[rgb(237,237,237)]"}`}
      ></div>
      <span
        className={`mx-4 relative bottom-[3px] text-[rgb(142,142,142)] text-[14px] bg-clip-text font-semibold flex items-center justify-center
          ${isLineWhite ? "bg-white" : "bg-[rgb(237,237,237)]"} 
          ${content ? "" : "hidden"}`}
      >
        {content}
      </span>
      <div
        className={`flex-grow relative flex justify-center items-center
          ${lineWeight ? "h-[2px]" : "h-[1px]"}  
          ${isLineWhite ? "bg-white" : "bg-[rgb(237,237,237)]"}`}
      ></div>
    </div>
  );
}
