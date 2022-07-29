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
  GET: (userId) => BASE_URL + PARTIAL_URL.USER + `${userId}`,
  GET_LAST_REPORT: (userId) =>
    BASE_URL + PARTIAL_URL.USER + `report/${userId}/last`,
  GET_REPORT: (userId) => BASE_URL + PARTIAL_URL.USER + `report/${userId}`,
  PUT: BASE_URL + PARTIAL_URL.USER + "put",
  DELETE: (userId) => BASE_URL + PARTIAL_URL.USER + `delete/${userId}`,
};

export const PROJECT_URL = {
  GET: (projectId) => BASE_URL + PARTIAL_URL.PROJECT + `${projectId}`,
  GET_USER: (userId) => BASE_URL + PARTIAL_URL.PROJECT + `user/${userId}`,
  GET_DEPARTMENTS: (departmentId) =>
    BASE_URL + PARTIAL_URL.PROJECT + `${departmentId}/departments`,
  PUT: BASE_URL + PARTIAL_URL.PROJECT + "put",
  POST: BASE_URL + PARTIAL_URL.PROJECT + "post",
};

export const EVENT_URL = {
  GET_BY_TYPE_EVENT_ID: (type, taskId) =>
    BASE_URL + PARTIAL_URL.EVENT + `${type}/${taskId}`,
  GET_BY_DEPARTMENT_ID_PROJECT_ID_TYPE: (departmentId, projectId, type) =>
    BASE_URL +
    PARTIAL_URL.EVENT +
    `department/${projectId}/project/${departmentId}/${type}`,
  PUT: BASE_URL + PARTIAL_URL.EVENT + "put",
  PUT_LABEL: BASE_URL + PARTIAL_URL.EVENT + "put/label",
  POST_AND_ALLOCATE: BASE_URL + PARTIAL_URL.EVENT + "post-and-allocate",
  DELETE: (eventId) => BASE_URL + PARTIAL_URL.EVENT + `delete/${eventId}`,
};

export const DEPARTMENT_URL = {
  GET: (departmentId) => BASE_URL + PARTIAL_URL.DEPARTMENT + `${departmentId}`,
  GET_STATS: BASE_URL + PARTIAL_URL.DEPARTMENT + "stats",
  GET_BY_ID: (departmentId) =>
    BASE_URL + PARTIAL_URL.DEPARTMENT + `stats/${departmentId}`,
  PUT: BASE_URL + PARTIAL_URL.DEPARTMENT + "put",
  POST: BASE_URL + PARTIAL_URL.DEPARTMENT + "create",
  DELETE: (departmentId) =>
    BASE_URL + PARTIAL_URL.DEPARTMENT + `delete/${departmentId}`,
};

export const PROJECT_ALLOCATION_URL = {
  GET_BY_PROJECT_ID_DEPARTMENT_ID: (projectId, departmentId) =>
    BASE_URL +
    PARTIAL_URL.PROJECT_ALLOCATION +
    `${projectId}/department/${departmentId}`,
  GET_BY_USER: (userId) =>
    BASE_URL + PARTIAL_URL.PROJECT_ALLOCATION + `user/${userId}`,
  POST: BASE_URL + PARTIAL_URL.PROJECT_ALLOCATION + "post/username",
};

export const EVENT_ALLOCATION_URL = {
  GET: (eventId) => BASE_URL + PARTIAL_URL.EVENT_ALLOCATION + `get/${eventId}`,
  GET_BY_INTERVAL: (userId, startingDate, endingDate) =>
    BASE_URL +
    PARTIAL_URL.EVENT_ALLOCATION +
    `${userId}/${startingDate} 00:00:00/${endingDate} 23:59:59`,
  GET_FREE_DAY: BASE_URL + PARTIAL_URL.EVENT_ALLOCATION + "freeDay",
  POST: BASE_URL + PARTIAL_URL.EVENT_ALLOCATION + "post-username",

  DELETE: (eventId, userId) =>
    BASE_URL + PARTIAL_URL.EVENT_ALLOCATION + `delete/${eventId}/${userId}`,
};

export const CREATE_USER_URL = BASE_URL + "users/create";
