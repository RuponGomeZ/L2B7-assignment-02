import type { IIssue } from "../../types";
type Query = {
    sort?: string;
    type?: string;
    status?: string;
};
export declare const issueService: {
    postIssueIntoDB: (payload: {
        title: string;
        description: string;
        type: string;
        id: number;
    }) => Promise<import("pg").QueryResult<any>>;
    getAllIssuesFromDB: (query: Query) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: any;
        created_at: any;
        updated_at: any;
    }[]>;
    getSingleIssueFromDB: (id: string) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: any;
        created_at: any;
        updated_at: any;
    } | null>;
    deleteIssueFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateIssueInDB: (payload: IIssue, id: string, loginUser: {
        role: string;
        userId: string;
    }) => Promise<import("pg").QueryResult<any>>;
};
export {};
//# sourceMappingURL=issue.service.d.ts.map