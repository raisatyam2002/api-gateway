import { Counter, Histogram } from "prom-client";
export const graphqlRequestCount = new Counter({
  name: "graphql_request_count",
  help: "Total number of GraphQL requests",
  labelNames: ["method", "route", "status_code"],
});
export const graphqlRequestDurationMicroSecond = new Histogram({
  name: "graphql_request_duration_ms",
  help: "Duration of graphql requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});

export const microServiceOpenState = new Counter({
  name: "micro_service__open_state_counter",
  help: "State of  request in micro-service",
  labelNames: ["service", "status_code", "state"],
});
export const microServiceCloseState = new Counter({
  name: "micro_service_close_state_counter",
  help: "State of  request in micro-service",
  labelNames: ["service", "status_code", "state"],
});
export const microServiceHalfOpenState = new Counter({
  name: "micro_service_half_open_state_counter",
  help: "State of  request in micro-service",
  labelNames: ["service", "status_code", "state"],
});
