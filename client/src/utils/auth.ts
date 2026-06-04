import { jwtDecode } from "jwt-decode";
export interface MyJwtPayload {
    role: "user" | "admin",
    id: string,
    exp: number
}

export const getUserFromToken = () => {
    if (typeof window === "undefined") return null
    const token = localStorage.getItem("token")
    if(!token) return null
    try{
        return jwtDecode<MyJwtPayload>(token)
    } catch {
        return null
    }
}