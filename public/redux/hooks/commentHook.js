import { useSelector } from "react-redux";
import { replyCommentSelector } from "../selectors"

export const useReplyCommentPakageHook = () =>
{
    return useSelector(replyCommentSelector)
}