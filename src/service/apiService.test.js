import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import { Experiences } from "./apiService";
import axios from "axios";

vi.mock("axios");

describe("Experiences service (unit)", () => {
  let service;

  beforeEach(() => {
    service = new Experiences();
    localStorage.setItem("user", JSON.stringify({ id: "123" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("updateExperiences calls axios.put with correct params and returns data", async () => {
    const id = "1";
    const updatedData = { title: "Updated" };
    const mockResponse = { data: { success: true } };
    axios.put.mockResolvedValueOnce(mockResponse);

    const result = await service.updateExperiences(id, updatedData);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:8080/api/experiences/1",
      updatedData,
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-User-ID": "123",
        }),
      })
    );
    expect(result).toEqual({ success: true });
  });


});