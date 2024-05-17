import { registerEnumType } from '@nestjs/graphql';

export enum OrderState {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

registerEnumType(OrderState, {
  name: 'OrderState',
});
