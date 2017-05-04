import ISystemConfig = require("../../model/interfaces/ISystemConfig");

interface ISystemConfigBusiness {
    create: (item: ISystemConfig, callback: (error: any, result: any ) => void) => void;
    update: (_id: string, item: ISystemConfig, callback: (error: any, result: any)=> void) => void ;
    retrieveConfigList: (fieldNames: string[], callback: (error: any, result: ISystemConfig[])=> void)=> void ;
    findByFieldName: (fieldName: string, callback: (error:any, result: ISystemConfig) => void) => void;
    //delete: (_id: string, callback: (error: any, result: any) => void) => void;
}
export = ISystemConfigBusiness;
