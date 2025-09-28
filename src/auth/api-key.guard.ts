import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKey = process.env['LEAF_API_KEY'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.query.apiKey;

    if (!apiKey) {
      throw new UnauthorizedException(
        'API key is required. Add ?apiKey=your_key to the URL',
      );
    }

    if (apiKey !== this.validApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
