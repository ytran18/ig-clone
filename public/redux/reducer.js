import { USER_PACKAGE, POST_ASSETS } from "./constants"

const userState = {
    user: {},
}

const postState = {
    assets: [],
}

export const userReducer = (state = userState, action) =>
{
    switch (action.type)
    {
        case USER_PACKAGE:{
            return {...state, user: action.payload}
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
        default:
            return state
    }
}