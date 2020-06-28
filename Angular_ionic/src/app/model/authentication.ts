/**
 * appraisal API
 * appraisal API documentation
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GrantedAuthority } from './grantedAuthority';


export interface Authentication { 
    authenticated?: boolean;
    authorities?: Array<GrantedAuthority>;
    credentials?: object;
    details?: object;
    name?: string;
    principal?: object;
}

