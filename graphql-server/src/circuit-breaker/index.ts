import client, { initializeCircuitBreaker } from "../redis/index";
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
    const { state, failure_count, last_failureTime } = await client.hGetAll(
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
        if (data[serviceData]) {
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
      console.log("checking hald-open");
      await microserviceApiCall(userId, data);
      if (data[serviceData]) {
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
      const new_failure_count = Number(failure_count) + 1;
      if (!data[serviceData]) {
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
      }
    }
    console.log(
      service,
      "circuite breaker end -------------------------------"
    );
  } catch (error) {
    console.log("error in circuit breaker pattern ", error.message);
    throw new Error(error.message);
  }
}
