import assert from 'assert';
import { ArticlesPaginationParams } from '../dtos/pagination';
import { ArticleService } from '../services/article.service';
import { ArticleMySqlRepository } from '../services/repositories/impl/mysql/article.repository';

const articleService = new ArticleService(
    new ArticleMySqlRepository()
)
describe('Artcle Service', () => {
    describe('All methods', () => {
        //Get articles
        it('Should returns a list of articles', async () => {            
            const data = await articleService.all(new ArticlesPaginationParams(3,1));
            assert(data);
        });
    });
});