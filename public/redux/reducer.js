import { USER_PACKAGE, POST_ASSETS, CLEAR, REPLY_COMMENT } from "./constants"

const userState = {
    user: {},
}

const postState = {
    assets: [],
}

const replyState = {
    reply: []
}

export const userReducer = (state = userState, action) =>
{
    switch (action.type)
    {
        case USER_PACKAGE:{
            return {...state, user: action.payload}
        }
        case CLEAR:{
            return {
                user: {}
            }
        }
        default:
            return state
    }
}

export const postReducer = (state = postState, action) =>
{
    switch (action.type)
    {
        case POST_ASSETS:{
            return {...state, assets: action.payload}
        }
        case CLEAR:{
            return {
                assets: []
            }
        }
        default:
            return state
    }
}

export const replyReducer = (state = replyState, action) =>
{
    switch (action.type)
    {
        case REPLY_COMMENT:{
            return { ...state, reply: action.payload }
        }
        case CLEAR:{
            return {
                reply: []
            }
        }
        default: 
            return state
    }
}