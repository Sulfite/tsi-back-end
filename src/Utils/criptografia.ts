import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const ALGORITHM="ripemd160WithRSA";
const SECRET_TOKEN_AUTENTICACAO="teste123456789";

interface AuthRequest extends Request {
  idUsuario: string | number;
}

interface TokenPayload extends JwtPayload {
  idUsuario: string | number;
}

const hash = (senha: string | number) => {
	if (typeof(senha) === "number") {
		senha = senha.toString();
	}

	senha = senha.split("").reverse().join();
	senha = crypto.createHash(ALGORITHM).update(senha).digest('hex');
	let salt = senha.substring(senha.length-10,senha.length);
	senha = crypto.createHash(ALGORITHM).update(salt + senha).digest('hex');
	return senha;
};

const gerarToken = (idUsuario: number) => {
	const token = jwt.sign({
		idUsuario: idUsuario
	}, SECRET_TOKEN_AUTENTICACAO);
	return token;
};

const validaToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string | undefined;
  if (!token) {
    return res.status(401).json({ 
		autenticado: false,
		message: 'Não autenticado.'
	});
  }

  try {
    const decoded = jwt.verify(
		token, 
		SECRET_TOKEN_AUTENTICACAO
	) as TokenPayload;
    // req.idUsuario = decoded.idUsuario;
    next();
  } catch (erro) {
    return res.status(500).json({ 
		autenticacao: false, 
		message: 'Falha na autenticação do token.'
	});
  }
};

const pegaInfoToken = (token: string): { idUsuario: string | number } | null => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN_AUTENTICACAO) as TokenPayload;
    return { idUsuario: decoded.idUsuario };
  } catch {
    return null;
  }
};

export {
	hash,
	gerarToken,
	AuthRequest,
	validaToken
}
