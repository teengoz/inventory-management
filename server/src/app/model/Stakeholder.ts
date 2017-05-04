import IStakeholder = require('./interfaces/IStakeholder');

class Stakeholder {
    private _stakeholder: IStakeholder;

    constructor(stakeholder: IStakeholder) {
        this._stakeholder = stakeholder;
    }

    get stakeholderId(): string {
        return this._stakeholder.stakeholderId;
    }

    get stakeholderType(): any {
        return this._stakeholder.stakeholderType;
    }

    get stakeholderCode(): string {
        return this._stakeholder.stakeholderCode;
    }

    get stakeholderName(): string {
        return this._stakeholder.stakeholderName;
    }

    get stakeholderDescription(): string {
        return this._stakeholder.stakeholderDescription;
    }

    get stakeholderAddress(): string {
        return this._stakeholder.stakeholderAddress;
    }

    get stakeholderPhone1(): string {
        return this._stakeholder.stakeholderPhone1;
    }

    get stakeholderPhone2(): string {
        return this._stakeholder.stakeholderPhone2;
    }

    get stakeholderFax(): string {
        return this._stakeholder.stakeholderFax;
    }

    get stakeholderEmail(): string {
        return this._stakeholder.stakeholderEmail;
    }

    get stakeholderTaxcode(): string {
        return this._stakeholder.stakeholderTaxcode;
    }

    get stakeholderAccountNumber(): string {
        return this._stakeholder.stakeholderAccountNumber;
    }

    get stakeholderBank(): string {
        return this._stakeholder.stakeholderBank;
    }

    get isActive(): boolean {
        return this._stakeholder.isActive;
    }

    get createdBy(): string {
        return this._stakeholder.createdBy;
    }

    get updatedBy(): string {
        return this._stakeholder.updatedBy;
    }

    get createdAt(): Date {
        return this._stakeholder.createdAt;
    }

    get updatedAt(): Date {
        return this._stakeholder.updatedAt;
    }


}

Object.seal(Stakeholder);
export = Stakeholder;
