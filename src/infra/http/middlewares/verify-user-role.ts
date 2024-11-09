import { Response, Request } from 'express'
import { ClientRoles } from '../../../domain/clients/enterprise/enums/ClientRoles';
import { JwtTokenGenerator } from '../../jwt/jwt-token-generator';
import { PrismaUsersRepository } from '../../database/repository/prisma-users-repository';

export class VerifyUserRole {
  private authorizedRoles: ClientRoles[] = [];

  public authorize = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) throw new Error("Invalid token");
      const token = await this.verifyToken(accessToken);
      await this.getUserRoleFromProviderAndCheck(token);
    } catch (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }

  public ofRoles = (roles: ClientRoles[]) => {
    this.authorizedRoles = roles;

    return this;
  }

  private getUserRoleFromProviderAndCheck = async (token: string): Promise<void> => {
    const jwtToken = new JwtTokenGenerator();
    const id = jwtToken.decode(token);
    if (!id) throw new Error("Invalid token");
    const usersRepository = new PrismaUsersRepository();
    const user = await usersRepository.findById(id);
    if (!user) throw new Error("Invalid token");
    const userRole = user?.role as ClientRoles;
    if (!userRole || !this.authorizedRoles.includes(userRole)) throw new Error("unauthorized");
  }
  private verifyToken = async (accessToken: string): Promise<string> => {
    const currentToken = accessToken.split(" ");
    const token = currentToken[1];
    return token;
  }
}