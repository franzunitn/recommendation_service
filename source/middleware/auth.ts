import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const url_login = `http://localhost:4001/verify`

const hasPermission = async (req: Request, res: Response , next: NextFunction, permission: string) => {
  try { 
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
      
    if (token == undefined) {
      return res.status(403).send({ message: "Auth token must be specified"});
    }

    let result: AxiosResponse = await axios.get(`${url_login}/${permission}?token=${token}`);   
    if (result.data != "OK") {
      return res.status(401).send({ message: "Invalid token"});
    }
    
    return next();
  }catch(e) {
    return res.status(400).send({message: "Invalid auth request"});
  }
} 

const authRecombee = async (req: Request, res: Response , next: NextFunction) => {
  return await hasPermission(req, res , next, 'raccomandations');
}

export default { authRecombee };

