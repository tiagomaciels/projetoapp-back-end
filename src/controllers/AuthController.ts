import 'dotenv/config';

import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import axios from 'axios';

import { User } from '../entities/User';

export class AuthController {

  protectedRoute(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    if (!token || token.length < 8) {
      return res.sendStatus(401).json({ message: "Não autorizado!" });
    }

    token = token.substring(7);

    jwt.verify(
      token,
      process.env.SERVER_TOKEN!,
      function (err: any, decoded: any) {
        if (err) {
          return res.sendStatus(401).json({ message: "Não autorizado!" });
        }
        req.body.user = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        };
        next();
      }
    );
  }

  async auth(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res
          .status(406)
          .json({ message: "Você deve digitar o e-mail e a senha!" });

      const repo = getRepository(User);
      const user = await repo.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "e-mail ou senha inválido" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(403).json({ message: "e-mail ou senha inválido" });
      }

      const token = process.env.SERVER_TOKEN;
      const expiresIn = process.env.SERVER_TOKEN_EXPIRESIN;

      const access_token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        token as string,
        {
          expiresIn: expiresIn,
        }
      );

      const affirmationApi = await axios.get(process.env.AFFIRMATIONSAPI as string)

      return res.json({
        token_type: "Bearer",
        access_token,
        expires_in: expiresIn,
        user: { id: user.id, name: user.name, email: user.email, affirmation: affirmationApi.data.affirmation }        
      },);
    } catch (err) {
      res.status(400);
    }
  }
}
