class UtilityService {
    static generateUrlQuery(args: any) {
        let query = '';
        args.forEach((elm, index) => {
            query += (query) ? `&${elm.key}=${elm.value}` : `${elm.key}=${elm.value}`;
        });
        return query;
    }
}

export { UtilityService }