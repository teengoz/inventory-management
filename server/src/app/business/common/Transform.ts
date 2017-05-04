import { transformFields as tffs } from '../../../config/constants/transform-fields';

class TransformFields{
    private transformFields: any[];

    constructor(name: string = null) {
        if (name) {
            this.transformFields = tffs[name];
        }
    }

    // transform(object: T): T {
    //     console.log(object);
    //     if (object) {
    //         this.transformFields.forEach(function(elm, idx) {
    //             let transformName = Object.keys(elm)[0];
    //             let originalName = elm[transformName];
                
    //             console.log(originalName);
    //             console.log(transformName);

    //             if (object.hasOwnProperty(originalName)) {
    //                 object[transformName] = object[originalName];
    //                 delete object[originalName];
    //             }
    //         });
    //     }
    //     return object;
    // }

    //To Camel Case
    transform(object) {
        let _object:any = {};

        if (object) {
            if (Object.prototype.toString.call(object) === '[object Object]') {
                Object.keys(object).forEach((key, idx) => {
                    let originalName = key;
                    let transformName = tffs.toCamelCase(key);
                    _object[transformName] = object[originalName];
                });
            }
            else if (Object.prototype.toString.call(object) === '[object Array]') {
                _object = [];
                object.forEach((elm, idx) => {
                    let transformName = tffs.toCamelCase(elm);
                    _object.push(transformName);
                });
            }
        }

        return _object;
    }
}

export { TransformFields }
