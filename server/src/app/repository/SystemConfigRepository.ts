import SystemConfig = require("../model/SystemConfig");
import ISystemConfig = require("../model/interfaces/ISystemConfig");
import SystemConfigSchema = require("../dataAccess/schemas/SystemConfigSchema");
import RepositoryBase = require("./BaseRepository");

class SystemConfigRepository extends RepositoryBase<ISystemConfig> {
    constructor() {
        super(SystemConfigSchema);
    }
}

Object.seal(SystemConfigRepository);
export = SystemConfigRepository;
