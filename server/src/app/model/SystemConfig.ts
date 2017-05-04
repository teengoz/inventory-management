import ISystemConfig = require('./interfaces/ISystemConfig');

class SystemConfig {
    private _systemconfig: ISystemConfig;

    constructor(systemconfig: ISystemConfig) {
        this._systemconfig = systemconfig;
    }

    get systemConfigId(): string {
        return this._systemconfig.systemConfigId;
    }

    get systemConfigName(): string {
        return this._systemconfig.systemConfigName;
    }

    get systemConfigFieldName(): string {
        return this._systemconfig.systemConfigFieldName;
    }

    get systemConfigDescription(): string {
        return this._systemconfig.systemConfigDescription;
    }

    get systemConfigInputType(): string {
        return this._systemconfig.systemConfigInputType;
    }

    get SystemConfigValue(): string {
        return this._systemconfig.systemConfigValue;
    }

    get systemConfigControlType(): string {
        return this._systemconfig.systemConfigControlType;
    }

    get systemConfigLabelWidth(): number {
        return this._systemconfig.systemConfigLabelWidth;
    }
    get systemConfigInputWidth(): number {
        return this._systemconfig.systemConfigInputWidth;
    }
    get systemConfigRequired(): boolean {
        return this._systemconfig.systemConfigRequired;
    }

    get systemConfigInline(): boolean {
        return this._systemconfig.systemConfigInline;
    }

    get systemConfigOptionValues(): string {
        return this._systemconfig.systemConfigOptionValues;
    }

    get systemConfigOrder(): number {
        return this._systemconfig.systemConfigOrder;
    }

    get isActive(): boolean {
        return this._systemconfig.isActive;
    }

    get createdBy(): string {
        return this._systemconfig.createdBy;
    }

    get updatedBy(): string {
        return this._systemconfig.updatedBy;
    }

    get createdAt(): Date {
        return this._systemconfig.createdAt;
    }

    get updatedAt(): Date {
        return this._systemconfig.updatedAt;
    }


}

Object.seal(SystemConfig);
export = SystemConfig;
