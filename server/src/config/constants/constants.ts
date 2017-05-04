class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://localhost:27017/imdb";
    static PER_PAGE: number = 10;
}
Object.seal(Constants);
export = Constants;
