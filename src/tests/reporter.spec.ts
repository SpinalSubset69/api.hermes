import assert from "assert";
import { ReporterCreateDto } from "../dtos/reporter.dto";
import { ReporterService } from "../services/reporter.service";
import { ArticleMockRepository } from "../services/repositories/impl/mock/article.mock";
import { ReporterMockRepository } from "../services/repositories/impl/mock/reporter.mock";

const reporterService = new ReporterService(
  new ReporterMockRepository(),
  new ArticleMockRepository()
);

describe("Reporter Service", () => {
  describe("All Method", () => {
    //Get All reporters
    it("Should returns a list of reporters", async () => {
      const data = await reporterService.all();
      console.log(data);
      assert(data.length != 0);
    });

    it("Should store a new reporter and return it with new reporter_id", async () => {
      const newReporter: ReporterCreateDto = {
        name: "Juan Luis",
        user_name: "sonic",
        email: "sonic@gmail.com",
        password: "Resumiendo69%",
      };
      const storedReporter = await reporterService.store(newReporter);
      console.log(storedReporter);

      assert(storedReporter.reporter_id === 2);
    });

    it('Should store a new reporter and throw an Application Exception Exception with message "Email already in use"', async () => {
      try {
        const newReporter: ReporterCreateDto = {
          name: "Juan Luis",
          user_name: "sonic",
          email: "alastorlml@gmail.com",
          password: "Resumiendo69%",
        };
        const storedReporter = await reporterService.store(newReporter);
      } catch (err: any) {
        assert(err.message, "Email already in use");
      }
    });

    it("Should returns a reporter based on the Id", async () => {
      const reporter = await reporterService.findByIdWithoutArticles(1);
      assert(reporter != null);
    });

    it("Should throw a NotFound exception wiht message 'Reporter Not Found'", async () => {
      try {
        const reporter = await reporterService.findByIdWithoutArticles(100000);
      } catch (err: any) {
        assert(err.message, "Reporter Not Found");
      }
    });
  });
});
