import assert from "assert";
import { TestService } from "../services/test.service";

const testService = new TestService();
describe('Test Service', () => {
    describe('Test Method', () => {
        it('Should return "Service working"', ()=> {
            assert.equal(testService.all(), 'Service working');
        });
    });
});