import { HttpErrorResponse } from '@angular/common/http';
import { RequestServerResponse } from '../interfaces/RequestServerResponse';
import { throwError, pipe, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Token } from '../interfaces/Token';

export abstract class ApiGeneral {

    constructor(protected http: Http) {
    }

    protected headersREST2(request: string, isSecure: boolean = false): Headers {
        let myHeaders = new Headers();
        if (isSecure) {
            let dataJson = localStorage.getItem("SECURE");
            let secure: Token = JSON.parse(dataJson);
            myHeaders.append('Authorization', secure.token);
        }
        myHeaders.append('Accept', '*');
        if (request == "post" || request == "put") {
            myHeaders.append('Content-Type', 'application/json');
        }
        console.log("HEADERS=>");
        console.log(myHeaders);
        return myHeaders;
    }

    protected headersREST(request: string, isSecure: boolean = false): any {
        let myHeaders = {};
        if (isSecure) {
            let dataJson = localStorage.getItem("SECURE");
            let secure: Token = JSON.parse(dataJson);
            myHeaders["Authorization"] = secure.token;
        }
        //myHeaders["Accept"] = '*'; ; charset=utf-8; boundary=something ;
        if (request == "post" || request == "put") {
            myHeaders["Content-Type"] = 'application/json';
        }
        if (request == "upload") {
            //myHeaders["Content-Type"] = undefined;
            myHeaders["Accept"] = '*/*';
            //myHeaders["enctype"] = "multipart/form-data";
            //myHeaders["Content-Type"] = 'multipart/form-data; boundary=something';
        }
        console.log("HEADERS=>");
        console.log(myHeaders);
        return myHeaders;
    }

    protected handlerError(error: HttpErrorResponse) {
        console.log("SERVER ERROR: " + JSON.stringify(error));
        let sr: RequestServerResponse<any> = null;
        if (error['_body']) {
            sr = JSON.parse(error['_body']);
            sr.status = error.status;
        } else {
            sr = {
                message: error.statusText,
                data: null,
                status: error.status
            };
        }
        console.log(sr);
        return throwError(sr);
    }

    private handlerCallback(request: any, callback: Function, method: string): void {
        console.log("REQUEST METHOD " + method + ": ", request);
        if (callback) {
            try {
                callback(request);
            } catch (e) {
                console.log("ERROR CALLBACK METHOD " + method + ": ", e);
            }
        }
    }

    protected get<R>(endpoint: string, isSecure: boolean = false, fn: Function = null): Observable<R> {
        console.log("URL METHOD GET: ", endpoint);
        let opts: any = {
            headers: this.headersREST('get', isSecure)
        };
        return this.http.get(endpoint, opts).pipe(
            map((response: any) => {
                let request = response.json();
                this.handlerCallback(request, fn, "GET");
                return request;
            }), pipe(catchError(this.handlerError))
        );
    }

    protected delete<R>(endpoint: string, isSecure: boolean = false, fn: Function = null): Observable<R> {
        console.log("URL METHOD DELETE: ", endpoint);
        let opts: any = {
            headers: this.headersREST('delete', isSecure)
        };
        return this.http.delete(endpoint, opts).pipe(
            map((response: any) => {
                let request = response.json();
                this.handlerCallback(request, fn, "DELETE");
                return request;
            }), pipe(catchError(this.handlerError))
        );
    }

    protected post<I, R>(endpoint: string, data: I, isSecure: boolean = false, fn: Function = null): Observable<R> {
        console.log("URL METHOD POST: ", endpoint);
        console.log("DATA METHOD POST: ", JSON.stringify(data));
        let opts: any = {
            headers: this.headersREST('post', isSecure)
        };
        return this.http.post(endpoint, data, opts).pipe(
            map((response: any) => {
                let request = response.json();
                this.handlerCallback(request, fn, "POST");
                return request;
            }), pipe(catchError(this.handlerError))
        );
    }

    protected put<I, R>(endpoint: string, data: I, isSecure: boolean = false, fn: Function = null): Observable<R> {
        console.log("URL METHOD PUT: ", endpoint);
        console.log("DATA METHOD PUT: ", JSON.stringify(data));
        let opts: any = {
            headers: this.headersREST('put', isSecure)
        };
        return this.http.put(endpoint, data, opts).pipe(
            map((response: any) => {
                let request = response.json();
                this.handlerCallback(request, fn, "PUT");
                return request;
            }), pipe(catchError(this.handlerError))
        );
    }

    protected upload<R>(endpoint: string, file: File, isSecure: boolean = false, fn: Function = null): Observable<R> {
        console.log("URL METHOD UPLOAD: ", endpoint);
        console.log("FILE METHOD UPLOAD: ", file);
        let data: FormData = new FormData();
        data.append('file', file);
        let opts: any = {
            headers: this.headersREST('upload', isSecure)
        };
        return this.http.post(endpoint, data, opts).pipe(
            map((response: any) => {
                let request = response.json();
                this.handlerCallback(request, fn, "UPLOAD");
                return request;
            }), pipe(catchError(this.handlerError))
        );
    }
}