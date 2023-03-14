import { USER_PACKAGE } from "./constants"

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})