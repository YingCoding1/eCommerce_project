export enum HttpCode {
    E200 = 200,
    E400 = 400,
    E404 = 404
}



export enum ErrStr {
    OK = 'Successfully',

    // DB
    ErrNoObj = 'Can not find the specific record',
    ErrStore = 'Failed to store data',

    // Parameter
    ErrMissingParameter = 'Missing parameter',

    // data errors
    ErrValidate = 'Data errors',

    // error to get data
    ErrGet = 'Failed to get data',

    // error to delete data
    ErrDelete = 'Failed to delete data',

    // invalid id
    ErrInvalidId = 'invalid id',

    // username is taken
    ErrUserExist = 'username is already taken',

    // username does not exist
    ErrUsername = 'username does not exits',

    // incorrect login username or password
    ErrIncorrectLogin = 'incorrect username or password',

    // invalid auth
    ErrAuth = 'invalid auth',

    // no repository
    ErrRepo = 'invalid repository'

}

export class Err {
    data: any;
    code: number;
    msg: string;

    constructor(code = HttpCode.E200, msg: string = ErrStr.OK, data = null) {
        this.data = data
        this.code = code
        this.msg = msg
    }
}