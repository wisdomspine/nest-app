import { INestApplication } from "@nestjs/common"
import { CatsService } from "../src/cats/cats.service";
import { Test } from "@nestjs/testing";
import { CatsModule } from "../src/cats/cats.module";
import * as request from 'supertest';

describe("Cats", () => {
    let app: INestApplication;
    let catsService = {findAll: () => ['test']};


    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [CatsModule]
        }).overrideProvider(CatsService).useValue(catsService).compile()

        app = module.createNestApplication();
        await app.init();
    })

    it('/GET cats', () => {
        return request(app.getHttpServer()).get('/cats').expect(200).expect({
            data: catsService.findAll()
        })
    })

    afterAll( async () => {
        await app.close();
    })
})