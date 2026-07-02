export class AuthService {
  async login(email: string) {
    return {
      accessToken: 'dev-token',
      user: { email, roles: ['ADMIN'] },
      expiresIn: 3600
    };
  }
}

