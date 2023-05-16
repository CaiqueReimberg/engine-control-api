import { verify } from "jsonwebtoken";

export function validateToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, 'PUCTCCPOSRANDOMD76B9F4A29A17F1D127C93502BB978918B18C32961982FC9C3DEB62FF6C70DB7', (error, decoded: any) => {
      if (error) return reject(error);

      resolve(decoded);
    })
  });
}
