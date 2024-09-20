export default class AuthService {
    authenticate: (username: string, password: string, callback: Function) => Promise<any>;
    comparePassword: (pass: string, passEnc: string, callback: Function) => void;
}
//# sourceMappingURL=AuthService.d.ts.map