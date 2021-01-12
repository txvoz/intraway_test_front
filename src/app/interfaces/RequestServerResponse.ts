export interface RequestServerResponse<T>{
    timestamp?:number;
    code?:string;
    description?:string;
    data?:T;
    status?:number;
    error?:string;
    exception?:string;
    message?:string;
    path?:string;
}