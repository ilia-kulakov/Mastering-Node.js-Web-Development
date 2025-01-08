export interface Result {
    id: number;
    name: string;
    age: number;
    years: number;
    nextage: number;
}

export interface Repository {
    saveResults(r: Result): Promise<Number>;
    getAllResults(limit: number): Promise<Result[]>;
    getResultsByName(name: string, limit: number): Promise<Result[]>;
}
