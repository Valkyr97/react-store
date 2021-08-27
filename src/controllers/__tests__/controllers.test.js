import * as controllers from "../controllers";
import axios from "axios";

jest.mock("axios");

describe("controllers tests", () => {
  it("should get alist of elements", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "test-product",
          cost: 20,
          category: "testing-category",
          department: "Testing",
        },
        {
          id: 2,
          name: "other-testing-product",
          cost: 22,
          category: "testing-category",
          department: "Testing",
        },
      ],
    });
    const data = await controllers.getAll("products");
    expect(data.length).toBe(2);
  });
});
