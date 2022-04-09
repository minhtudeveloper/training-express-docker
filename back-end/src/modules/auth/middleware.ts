
import jwt from "@/util/jwt";
import { tokenError } from "@/util/response";
import { Response, Request } from "express";


const useAuth = (req: Request, res: Response, next: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const token: string = req.headers?.authorization?.split("Bearer ")[1] || "";
      const user = await jwt.verifyToken(token);
      if (!user) tokenError(res)
      req.user = user
      next()
    } catch (error) {
      rs(error)
    }
  })

}

const useRoles = (roles: any) => {
  return (req: Request, res: Response, next: any,) => {
    return new Promise(async (rs, rj) => {
      try {
        const token: string = req.headers?.authorization?.split("Bearer ")[1] || "";
        const user = await jwt.verifyToken(token);
        if (roles.includes(user.role)) {
          next()
        } else {
          tokenError(res, 'You are not authorized')
        }
      } catch (error) {
        rs(error)
      }
    })
  };

}


export {
  useAuth,
  useRoles
}
