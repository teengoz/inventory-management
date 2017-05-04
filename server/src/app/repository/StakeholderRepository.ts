import Stakeholder = require("../model/Stakeholder");
import IStakeholder = require("../model/interfaces/IStakeholder");
import StakeholderSchema = require("../dataAccess/schemas/StakeholderSchema");
import RepositoryBase = require("./BaseRepository");

class StakeholderRepository extends RepositoryBase<IStakeholder> {
    constructor() {
        super(StakeholderSchema);
    }
}

Object.seal(StakeholderRepository);
export = StakeholderRepository;
