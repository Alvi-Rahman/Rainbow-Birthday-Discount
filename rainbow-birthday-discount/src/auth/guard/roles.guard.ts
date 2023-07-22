import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      // If no role is specified for the endpoint, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user's role matches the required role
    return user && user.role === requiredRole;
  }
}
