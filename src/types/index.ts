import express from "express";

export interface ExpressRequestBody<T> extends express.Request {
  body: T;
}

export interface ExpressResponseData<T> extends express.Response {
  data: T;
}
