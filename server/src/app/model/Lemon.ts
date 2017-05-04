import ILemon = require('./interfaces/ILemon');

class Lemon {

    private _lemon: ILemon;

    constructor(lemon: ILemon) {
        this._lemon = lemon;
    }
    get name (): string {
        return this._lemon.name;
    }

    get level (): number {
        return this._lemon.level;
    }

    get source (): string {
        return this._lemon.source;
    }

    get color (): string {
        return this._lemon.color;
    }
    
}

Object.seal(Lemon);
export = Lemon;