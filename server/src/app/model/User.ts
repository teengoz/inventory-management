import IUser = require('./interfaces/IUser');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');


class User {
    private _user: IUser;

    constructor(user: IUser) {
        this._user = user;
    }

    get _id(): string {
        return this._user._id;
    }

    get username(): string {
        return this._user.username;
    }

    get password(): string {
        return this._user.password;
    }

    get hash(): string {
        return this._user.hash;
    }

    get salt(): string {
        return this._user.salt;
    }

    get jobTitle(): string {
        return this._user.jobTitle;
    }

    get fullName(): string {
        return this._user.fullName;
    }

    get email(): string {
        return this._user.email;
    }

    get phone(): string {
        return this._user.phone;
    }

    get address(): string {
        return this._user.address;
    }

    get isActive(): string {
        return this._user.isActive;
    }

    get createdAt(): Date {
        return this._user.createdAt;
    }

    get updatedAt(): Date {
        return this._user.updatedAt;
    }

    set username (newUsername : string) {
        this._user.username = newUsername;
    }
    
    set salt (newSalt : string) {
        this._user.salt = newSalt;
    }
    
    set hash (newHash : string) {
        this._user.hash = newHash;
    }

    setPassword(password: string) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    }

    validPassword(password: string): boolean {
        let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash == hash;
    }

    generateJwt() {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 1);

        return jwt.sign({
                _id: this._id,
                username: this.username,
                exp: parseInt((exp.getTime() / 1000).toString()),
            },
            'SECRET'
        );
    }
}

Object.seal(User);
export = User;