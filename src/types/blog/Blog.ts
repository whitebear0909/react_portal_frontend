import { UserModel } from "../user/User";

export interface BlogModel {
    id: number
    user: UserModel
    content: string
    type: string
    title: string
    createdAt?: Date
}