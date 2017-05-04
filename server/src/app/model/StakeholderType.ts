import IStakeholderType = require('./interfaces/IStakeholderType');

class StakeholderType {
    private _stakeholdertype: IStakeholderType;

    constructor(stakeholdertype: IStakeholderType) {
        this._stakeholdertype = stakeholdertype;
    }

    get stakeholderTypeId(): string {
        return this._stakeholdertype.stakeholderTypeId;
    }

    get stakeholderTypeCode(): string {
        return this._stakeholdertype.stakeholderTypeCode;
    }

    get stakeholderTypeName(): string {
        return this._stakeholdertype.stakeholderTypeName;
    }

    get stakeholderTypeDescription(): string {
        return this._stakeholdertype.stakeholderTypeDescription;
    }

    get createdBy(): string {
        return this._stakeholdertype.createdBy;
    }

    get updatedBy(): string {
        return this._stakeholdertype.updatedBy;
    }

    get createdAt(): Date {
        return this._stakeholdertype.createdAt;
    }

    get updatedAt(): Date {
        return this._stakeholdertype.updatedAt;
    }


}

Object.seal(StakeholderType);
export = StakeholderType;
