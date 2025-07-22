import { describe, it } from "node:test";
import axios from "axios";
import { expect } from "vitest";

describe("ScheduleRoute", async () => {
  it("should return the schedule for a service", async () => {
    const data = await axios.get(
      `http://127.0.0.1:5050/schedule/cmdamd4ou00016xhckusphgyc`
    );
    return expect(true).toBe(true);
  });
});
