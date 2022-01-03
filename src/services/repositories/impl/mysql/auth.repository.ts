import { IAuthRepository } from "../../auth.repository";
import { Reporter, ReporterLogIn } from "../../domain/reporter";
import connector from "./../../../../common/persistance/mysql";
import SHA from "sha.js";


export class AuthMySqlRepository implements IAuthRepository {
    public async login(entry: ReporterLogIn): Promise<Reporter | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM reporters WHERE email = ?',
            [entry.email]
        )

        if (rows.length === 0) {
            return null;
        }

        const reporter = rows[0] as Reporter;

        const digestedPassword = SHA("SHA256").update(entry.password).digest('base64');

        if (reporter.password !== digestedPassword) {
            return null;
        }        
        return reporter;
    }

}