import Lemon = require("./../model/Lemon");
import ILemon = require("./../model/interfaces/ILemon");
import LemonSchema = require("./../dataAccess/schemas/LemonSchema");
import RepositoryBase = require("./BaseRepository");

class LemonRepository  extends RepositoryBase<ILemon> {
    constructor () {
        super(LemonSchema);
    }
}

Object.seal(LemonRepository);
export = LemonRepository;