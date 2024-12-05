import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../roles/role.enum';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (! requiredRoles) {
      return true; 
    }
    const role = context.switchToHttp().getRequest().body.role;    
    const allowedRoles = ['admin', 'user', 'moderator'];
    
    if(!allowedRoles.includes(role)){
      throw new ForbiddenException('Accès refusé : rôle invalide ou non autorisé');

    }
    return requiredRoles.every(role => role.includes(role));
  }
}