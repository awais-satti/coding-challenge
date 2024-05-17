import { Test, TestingModule } from '@nestjs/testing';
import { LineItemsResolver } from './line_items.resolver';
import { LineItemsService } from './line_items.service';

describe('LineItemsResolver', () => {
  let resolver: LineItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineItemsResolver, LineItemsService],
    }).compile();

    resolver = module.get<LineItemsResolver>(LineItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
