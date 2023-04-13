import { USER_PACKAGE, POST_ASSETS, CLEAR, REPLY_COMMENT, CLEAR_REPLY } from "./constants"

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const postPackage = (assets) => ({
    type: POST_ASSETS,
    payload: assets,
})

// remove all state of reducer
export const clear = () => ({
    type: CLEAR
})

export const replyComment = (reply) => ({
    type: REPLY_COMMENT,
    payload: reply,
})

export const clearReply = () => ({
    type: CLEAR_REPLY
})