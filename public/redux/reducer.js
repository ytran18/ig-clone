import { USER_PACKAGE, POST_ASSETS, CLEAR } from "./constants"

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