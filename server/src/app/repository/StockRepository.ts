import Stock = require("../model/Stock");
import IStock = require("../model/interfaces/IStock");
import StockSchema = require("../dataAccess/schemas/StockSchema");
import RepositoryBase = require("./BaseRepository");

class StockRepository extends RepositoryBase<IStock> {
    constructor() {
        super(StockSchema);
    }
}

Object.seal(StockRepository);
export = StockRepository;
