import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import {signToken} from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email)
    if(existingUser) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const token = await signToken({ id: newUser._id })
    return {token, user: newUser}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token, user}
}
