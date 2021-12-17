import assert from 'assert';
import { ReporterCreateDto } from '../dtos/reporter.dto';
import { ReporterService } from '../services/reporter.service';
import { ReporterMySqlRepository } from '../services/repositories/impl/mysql/reporter.repository';

const reporterService = new ReporterService(
    new ReporterMySqlRepository()
);

describe('Reporter Service', () => {
    describe('All Method', () => {
        //Get All reporters
        it('Should returns a list of reporters', async () => {
            const data = await reporterService.all;            
            assert(data);
        });

        //Get reporter based on id
        it('Should returns a reporter based on the id', async () => {
            const data = await reporterService.findByIdWithoutArticles(1); 
            assert(data);
        });

        //Get reporter based on id with articles
        it('Should returns a reporter articles', async () => {
            const data = await reporterService.findReporterArticlesBasedOnId(1);
            assert(data);
        }); 

        //Create reporter
        /* it('Should stores a reporter on the db', async () => {
            await reporterService.store({
                name: 'Juan Luis',
                password: 'Resumiendo69%',
                email: 'alastorlml@gmail.com',
                user_name: 'Sonic77'
            } as ReporterCreateDto)
        });  */
    });
});