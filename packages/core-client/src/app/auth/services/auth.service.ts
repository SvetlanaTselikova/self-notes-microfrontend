/**
 * Api docs
 * The Api description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { TokenVerificationDto } from '../model/tokenVerificationDto';
import { Users } from '../model/users';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AuthService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param body 
     * @param accessControlAllowCredentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationControllerAuthenticate(body: TokenVerificationDto, accessControlAllowCredentials?: string, observe?: 'body', reportProgress?: boolean): Observable<Users>;
    public authenticationControllerAuthenticate(body: TokenVerificationDto, accessControlAllowCredentials?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Users>>;
    public authenticationControllerAuthenticate(body: TokenVerificationDto, accessControlAllowCredentials?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Users>>;
    public authenticationControllerAuthenticate(body: TokenVerificationDto, accessControlAllowCredentials?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling authenticationControllerAuthenticate.');
        }


        let headers = this.defaultHeaders;
        if (accessControlAllowCredentials !== undefined && accessControlAllowCredentials !== null) {
            headers = headers.set('Access-Control-Allow-Credentials', String(accessControlAllowCredentials));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Users>('post',`${this.basePath}/api/auth/google-authenticate`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param accessControlAllowCredentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationControllerCheckAuth(accessControlAllowCredentials?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public authenticationControllerCheckAuth(accessControlAllowCredentials?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public authenticationControllerCheckAuth(accessControlAllowCredentials?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public authenticationControllerCheckAuth(accessControlAllowCredentials?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;
        if (accessControlAllowCredentials !== undefined && accessControlAllowCredentials !== null) {
            headers = headers.set('Access-Control-Allow-Credentials', String(accessControlAllowCredentials));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/auth/check-auth`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param accessControlAllowCredentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationControllerLogOut(accessControlAllowCredentials?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public authenticationControllerLogOut(accessControlAllowCredentials?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public authenticationControllerLogOut(accessControlAllowCredentials?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public authenticationControllerLogOut(accessControlAllowCredentials?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;
        if (accessControlAllowCredentials !== undefined && accessControlAllowCredentials !== null) {
            headers = headers.set('Access-Control-Allow-Credentials', String(accessControlAllowCredentials));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('post',`${this.basePath}/api/auth/log-out`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param accessControlAllowCredentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationControllerRefresh(accessControlAllowCredentials?: string, observe?: 'body', reportProgress?: boolean): Observable<Users>;
    public authenticationControllerRefresh(accessControlAllowCredentials?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Users>>;
    public authenticationControllerRefresh(accessControlAllowCredentials?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Users>>;
    public authenticationControllerRefresh(accessControlAllowCredentials?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;
        if (accessControlAllowCredentials !== undefined && accessControlAllowCredentials !== null) {
            headers = headers.set('Access-Control-Allow-Credentials', String(accessControlAllowCredentials));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Users>('get',`${this.basePath}/api/auth/refresh`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param accessControlAllowCredentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationControllerWhoAmI(accessControlAllowCredentials?: string, observe?: 'body', reportProgress?: boolean): Observable<Users>;
    public authenticationControllerWhoAmI(accessControlAllowCredentials?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Users>>;
    public authenticationControllerWhoAmI(accessControlAllowCredentials?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Users>>;
    public authenticationControllerWhoAmI(accessControlAllowCredentials?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;
        if (accessControlAllowCredentials !== undefined && accessControlAllowCredentials !== null) {
            headers = headers.set('Access-Control-Allow-Credentials', String(accessControlAllowCredentials));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Users>('get',`${this.basePath}/api/auth/whoami`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
