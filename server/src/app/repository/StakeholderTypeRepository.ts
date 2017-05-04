import StakeholderType = require("../model/StakeholderType");
import IStakeholderType = require("../model/interfaces/IStakeholderType");
import StakeholderTypeSchema = require("../dataAccess/schemas/StakeholderTypeSchema");
import RepositoryBase = require("./BaseRepository");

class StakeholderTypeRepository extends RepositoryBase<IStakeholderType> {
    constructor() {
        super(StakeholderTypeSchema);
    }
}

Object.seal(StakeholderTypeRepository);
export = StakeholderTypeRepository;
