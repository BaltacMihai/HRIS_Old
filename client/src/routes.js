/*
This document helps me to generate URL faster and easy to modify

The URL have the following form:
 
 BASE_URL + PARTIAL_URL.specificItem + "customAction"

 ex. http://localhost:3031/api/users/put  have:
 
 BASE_URL - http://localhost:3031/api/
 PARTIAL_URL - users/
 customAction - put
*/

const BASE_URL = "http://localhost:3031/api/";

const PARTIAL_URL = {
  USER: "users/",
  PROJECT: "projects/",
  EVENT: "events/",
  DEPARTMENT: "departments/",
  PROJECT_ALLOCATION: "project-allocation/",
  EVENT_ALLOCATION: "events-allocation/",
};

export const USER_URL = {
  PUT: BASE_URL + PARTIAL_URL.USER + "put",
};

export const PROJECT_URL = {
  PUT: BASE_URL + PARTIAL_URL.PROJECT + "put",
  POST: BASE_URL + PARTIAL_URL.PROJECT + "post",
};
export const EVENT_URL = {
  PUT: BASE_URL + PARTIAL_URL.EVENT + "put",
  PUT_LABEL: BASE_URL + PARTIAL_URL.EVENT + "put/label",
  POST_AND_ALLOCATE: BASE_URL + PARTIAL_URL.EVENT + "post-and-allocate",
};

export const DEPARTMENT_URL = {
  PUT: BASE_URL + PARTIAL_URL.DEPARTMENT + "put",
  POST: BASE_URL + PARTIAL_URL.DEPARTMENT + "create",
};

export const PROJECT_ALLOCATION_URL = {
  POST: BASE_URL + PARTIAL_URL.PROJECT_ALLOCATION + "post/username",
};

export const EVENT_ALLOCATION_URL = {
  POST: BASE_URL + PARTIAL_URL.EVENT_ALLOCATION + "post-username",
};

export const CREATE_USER_URL = BASE_URL + "users/create";
