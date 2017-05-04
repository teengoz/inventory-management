import User = require("./../model/User");
import IUser = require("./../model/interfaces/IUser");
import UserSchema = require("../dataAccess/schemas/UserSchema");
import RepositoryBase = require("./BaseRepository");

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(UserSchema);
    }
}

Object.seal(UserRepository);
export = UserRepository;
