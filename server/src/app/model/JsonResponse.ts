class JsonResponse {
    private obj: any = {};

    constructor(_success = null, _data = null, _message = '', _errors = null, _meta = null) {
        this.obj = {};
        if (_success !== null) {
            this.obj.success = _success;
        }

        if (_message != '') {
            this.obj.message = _message;
        }

        if (_data) {
            this.obj.data = _data;
        }

        if (_errors) {
            this.obj.errors = _errors;
        }

        if (_meta) {
            this.obj.meta = _meta;
        }
    }

    success(_success: boolean) {
        if (_success) {
            this.obj.success = _success;
        }
    }

    message(_message: string) {
        if (_message != '') {
            this.obj.message = _message;
        }
    }

    data(_data: any) {
        if (_data) {
            this.obj.data = _data;
        }
    }

    errors(_errors: any) {
        if (_errors) {
            this.obj.errors = _errors;
        }
    }

    meta(_meta: any) {
        if (_meta) {
            this.obj.meta = _meta;
        }
    }

    return() {
        return this.obj;
    }
}

Object.seal(JsonResponse);
export = JsonResponse;
