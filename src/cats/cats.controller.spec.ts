import { CatsService } from "./cats.service"
import { CatsController } from "./cats.controller";
import { Cat } from "./interfaces/cat.interface";
import { Test } from "@nestjs/testing";

describe('CatsController', () => {
    let catsService: CatsService;
    let catsController: CatsController;
    

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatsService]
        }).compile();

        catsService = module.get<CatsService>(CatsService);
        catsController = module.get<CatsController>(CatsController);
    })

    describe('findAll', () => {
        it('should return an array', async () => {
            let cat = new Cat();
            cat.name="lilian";
            cat.age = 30;

            const result:Cat[] = [cat];
            jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
            expect(await catsController.findAll()).toBe("result");
        })
    })
})