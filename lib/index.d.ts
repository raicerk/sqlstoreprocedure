import { ConnectionPool, IProcedureResult } from "mssql"
import { exec } from "child_process";

class SQLSP {
    private connectionPool: ConnectionPool | null;
    private connectionString: string;

    /**
     * Creates a new instance of SQLSP
     * @param UserDB Username for login
     * @param IPServer Server Address
     * @param DBName Database name
     * @param Password User's pssword
     */
    constructor(UserDB: string, IPServer: string, DBName: string, Password: string);

    /** Attempts to connect to the Server based on the given constructor parameters */
    private connect(): Promise<ConnectionPool>;

    /** Executes a named stored procedure */
    exec<T = any>(StoredProcedure: string, Parameters: string): Promise<IProcedureResult<T>>;
}

export = SQLSP;
