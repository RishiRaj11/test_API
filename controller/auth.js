import bcriptjs from "bcryptjs"
export const hashPassword=async(password)=>{
    const hash=await bcriptjs.hash(password,8)
      return hash;
}

export const isMatch=async(password,hashpassword)=>{
    const match=await bcriptjs.compare(password,hashpassword)
    return match;
}