import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

const veryfyToken = (token: string, secret: string) => {
  try {
    const veryfyToken = jwt.verify(token, secret);

    return {
      success: true,
      data: veryfyToken,
    };
  } catch (error: any) {
    console.log("Token verification failed: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  createToken,
  veryfyToken,
};
