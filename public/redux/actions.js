import { USER_PACKAGE, POST_ASSETS } from "./constants"

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const postPackage = (assets) => ({
    type: POST_ASSETS,
    payload: assets,
})