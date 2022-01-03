import SHA from "sha.js";
import { Images } from "../../dtos/article.dto";
import { Article } from "../../services/repositories/domain/article";
import { Reporter } from "../../services/repositories/domain/reporter";

const reporters:Reporter[] = [
    {
        reporter_id: 1,
        name: 'Luis Esteban Garza García',
        user_name: 'alastor',
        email: 'alastorlml@gmail.com',
        password: SHA('SHA256').update('Resumiendo9%').digest('base64'),        
    }
]

const articles:Article[] = [
    {
    article_id: 1,
    title: 'Mienten todos los partidos',
    summary: 'Adelanto muy adelantoso',
    content: 'Contenido de prueba',
    reporter_id: 1,
    category_id: 1,
    created_at: new Date()
    },
    {
        article_id: 2,
        title: 'Algo no esta bien',
        summary: 'Adelantado para su época',
        content: 'Contenido de prueba',
        reporter_id: 1,
        category_id: 3,
        created_at: new Date()
        }
]

const images:Images[] = [
    {    
        name: 'Image'
    }
]
export { reporters, articles };