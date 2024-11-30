import client, { initializeCircuitBreaker } from "../redis/index";
import {
  microServiceOpenState,
  microServiceCloseState,
  microServiceHalfOpenState,
} from "../promethues_functions/index";
export async function circuitBreaker(
  service,
  microserviceApiCall,
  userId,
  data,
  serviceData
) {
  try {
    const ifCircuitBreakerExist = await client.exists(service);
    if (!ifCircuitBreakerExist) {
      console.log(
        "setting ",
        service,
        " circuit- breaker on redis ",
        ifCircuitBreakerExist
      );
      await initializeCircuitBreaker(service);
    }
    var { state, failure_count, last_failureTime } = await client.hGetAll(
      service
    );
    console.log(
      service,
      " circuite breaker start -------------------------------"
    );
    console.log("state before ");
    console.log("state ", state);
    const currTime = Date.now();
    console.log("curr time ", currTime);
    const timeDiff = currTime - Number(last_failureTime);
    if (state == "open") {
      console.log("checking open");
      if (timeDiff > 60000) {
        await microserviceApiCall(userId, data);
        if (data[serviceData] != null && data[serviceData].length >= 0) {
          console.log("cheking flow 1");
          await client.hSet(service, {
            state: "half-open",
            failure_count: "0",
            last_failureTime: last_failureTime,
          });
        } else {
          console.log("cheking flow 2");
          const new_failure_count = Number(failure_count) + 1;
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        }
      }
    } else if (state == "half-open") {
      console.log("checking half-open");
      await microserviceApiCall(userId, data);
      if (data[serviceData] != null && data[serviceData].length >= 0) {
        await client.hSet(service, {
          state: "close",
          failure_count: "0",
          last_failureTime: last_failureTime,
        });
      } else {
        const new_failure_count = Number(failure_count) + 1;
        if (new_failure_count > 3) {
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        } else {
          await client.hSet(service, {
            state: "half-open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        }
      }
    } else if (state == "close") {
      console.log("checking close");
      await microserviceApiCall(userId, data);
      console.log("data ", data[serviceData]);
      if (data[serviceData].length === 0) {
        console.log("debug 1");
        const new_failure_count = Number(failure_count) + 1;
        if (new_failure_count > 3) {
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        } else {
          await client.hSet(service, {
            state: "close",
            failure_count: new_failure_count,
            last_failureTime: last_failureTime,
          });
        }
      } else {
        console.log("debug 2");
        await client.hSet(service, {
          state: "close",
          failure_count: 0,
          last_failureTime: last_failureTime,
        });
      }
    }
    var { state, failure_count, last_failureTime } = await client.hGetAll(
      service
    );
    if (state == "open") {
      microServiceOpenState.inc({
        service: service,
        status_code: "500",
        state: state,
      });
    } else if (state == "close") {
      microServiceCloseState.inc({
        service: service,
        status_code: "200",
      });
    } else if (state == "half-open") {
      microServiceHalfOpenState.inc({
        service: service,
        status_code: "200",
      });
    }
    console.log("state ", state);
    console.log("failure count ", failure_count);
    console.log(
      service,
      "circuite breaker end -------------------------------"
    );
    console.log(
      service,
      "circuite breaker end -------------------------------"
    );
  } catch (error) {
    console.log("error in circuit breaker pattern ", error.message);
    throw new Error(error.message);
  }
}
export async function userCircuitBreaker(
  service,
  microserviceApiCall,
  userId,
  data,
  serviceData
) {
  try {
    const ifCircuitBreakerExist = await client.exists(service);
    if (!ifCircuitBreakerExist) {
      console.log(
        "setting ",
        service,
        " circuit- breaker on redis ",
        ifCircuitBreakerExist
      );
      await initializeCircuitBreaker(service);
    }
    var { state, failure_count, last_failureTime } = await client.hGetAll(
      service
    );
    console.log(
      service,
      " circuite breaker start -------------------------------"
    );
    console.log("state before ");
    console.log("state ", state);
    const currTime = Date.now();
    console.log("curr time ", currTime);
    const timeDiff = currTime - Number(last_failureTime);
    if (state == "open") {
      console.log("checking open");
      if (timeDiff > 60000) {
        await microserviceApiCall(userId, data);
        if (data[serviceData] != null) {
          console.log("cheking flow 1");
          await client.hSet(service, {
            state: "half-open",
            failure_count: "0",
            last_failureTime: last_failureTime,
          });
        } else {
          console.log("cheking flow 2");
          const new_failure_count = Number(failure_count) + 1;
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        }
      }
    } else if (state == "half-open") {
      console.log("checking half-open");
      await microserviceApiCall(userId, data);
      if (data[serviceData] != null) {
        await client.hSet(service, {
          state: "close",
          failure_count: "0",
          last_failureTime: last_failureTime,
        });
      } else {
        const new_failure_count = Number(failure_count) + 1;
        if (new_failure_count > 3) {
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        } else {
          await client.hSet(service, {
            state: "half-open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        }
      }
    } else if (state == "close") {
      console.log("checking close");
      await microserviceApiCall(userId, data);
      console.log("data ", data[serviceData]);
      if (data[serviceData] == null) {
        console.log("debug 1");
        const new_failure_count = Number(failure_count) + 1;
        if (new_failure_count > 3) {
          await client.hSet(service, {
            state: "open",
            failure_count: new_failure_count,
            last_failureTime: Date.now(),
          });
        } else {
          await client.hSet(service, {
            state: "close",
            failure_count: new_failure_count,
            last_failureTime: last_failureTime,
          });
        }
      } else {
        console.log("debug 2");
        await client.hSet(service, {
          state: "close",
          failure_count: 0,
          last_failureTime: last_failureTime,
        });
      }
    }
    var { state, failure_count, last_failureTime } = await client.hGetAll(
      service
    );
    if (state == "open") {
      microServiceOpenState.inc({
        service: service,
        status_code: "500",
        state: state,
      });
    } else if (state == "close") {
      microServiceCloseState.inc({
        service: service,
        status_code: "200",
      });
    } else if (state == "half-open") {
      microServiceHalfOpenState.inc({
        service: service,
        status_code: "200",
      });
    }
    console.log("state ", state);
    console.log("failure count ", failure_count);
    console.log(
      service,
      "circuite breaker end -------------------------------"
    );
    console.log(
      service,
      "circuite breaker end -------------------------------"
    );
  } catch (error) {
    console.log("error in circuit breaker pattern ", error.message);
    throw new Error(error.message);
  }
}
