interface Read<T> {
    retrieve: (callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void;
    find: (callback?: (error: any, result: T[]) => void, cond?: any, page?: number, limit?: number) => void;
}

export = Read;