import { ERRORS_CODE } from './errorCode';
import { SYSTEM_MESSAGES } from './message';
import { environment } from './../../environments/environment';

export const APP_CONFIG: any = {
    TOKEN: 'token',
    USER: 'user',
    COUNTRYCODE: 'MY',
    CURRENT_BRANCH: 'currentBranch',
    BASE_API_LINK: {
      // Login
      LOGIN: environment.API_URL_DATA + '/api/Authentication/login',
      //User
      USER_GETALL: environment.API_URL_DATA + '/api/User/GetUsers',
      USER_ADD: environment.API_URL_DATA + '/api/User/CreateUser',
      USER_REGISTER: environment.API_URL_DATA + '/api/User/register',
      USER_CHANGE_PASSWORD: environment.API_URL_DATA + '/api/User/ChangePassword',
      USER_UPDATE: environment.API_URL_DATA + '/api/User/UpdateDetails',
      USER_DETAIL: environment.API_URL_DATA + '/api/User/GetUserDetail/',
      USER_DELETE: environment.API_URL_DATA + '/api/User',
      //token
      TOKEN_GETTOKEN_USER: environment.API_URL_DATA + '/api/Token/GetTokenUser',
      TOKEN_GETTOKEN_ALL: environment.API_URL_DATA + '/api/Token/GetTokens',
      //role
      TOKEN_GETTOKEN_ROLE: environment.API_URL_DATA + '/api/Role/ListRoles',
      TOKEN_GETTOKEN_ROLE_CREATE: environment.API_URL_DATA + '/api/Role/Add',
      TOKEN_GETTOKEN_ROLE_UPDATE: environment.API_URL_DATA + '/api/Role/UpdateRole',
      TOKEN_GETTOKEN_ROLE_DETAIL: environment.API_URL_DATA + '/api/Role/GetRoleDetail/',
      TOKEN_GETTOKEN_ROLE_DELETE: environment.API_URL_DATA + '/api/Role/Delete/',
     
    },

    DATETIME_FORMAT: {
      MALAYSIA: {
        DATE_PLACEHOLDER: 'DD/MM/YYYY',
        DATETIME_PLACEHOLDER: 'DD/MM/YYYY hh:mm',
        DATE: 'dd/MM/yyyy',
        DATETIME: 'dd/MM/yyyy hh:mm'
      }
    },
    SYSTEM_MESSAGES,
    REGEX: {
      // CODE: '^[a-zA-Z0-9]{1}[a-zA-Z0-9-_.]{1,19}$',
      CODE: '^[a-zA-Z0-9]+$',
      DESCRIPTION: '.*[^ ].*',
      NAME: '[a-zA-Z][a-zA-Z\\s]*',
      POSITIVE_INTEGER: '^[0-9]+$',
      PASS_REGEX: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{6,}$",
      // PASS_REGEX: '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/',
      MALAYSIA_DATE:
        '(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)dd',
      DATE_REGEX: '/^([1-9]|([012][0-9])|(3[01]))/([0]{0,1}[1-9]|1[012])/dddd/g',
      PHONE: '[0-9]*',
      EMAIL:
        '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})',
      EMAIL_REGEX:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    },
    RESPONSE: {
      SUCCESS: 200,
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
      PRECONDITION_FAILED: 412
    },
    ERRORS_CODE,
    RECORD_PER_PAGE: 15,
    MIN_DATEPICKER: { year: 1940, month: 1, day: 1 },
    DAY_OF_WEEK: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thusday',
      'Friday',
      'Saturday'
    ]
  };
  
  export class AppSettings {
    static PAGE = 1;
    static PER_PAGE = 15;
  }
  