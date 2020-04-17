import { CommonStep, CheckoutActionStep } from '../serializer/types';

export type CheckoutStep = CommonStep & CheckoutActionStep;
export const checkoutStep: CheckoutStep = {
  uses: 'actions/checkout@v1',
  name: 'checkout',
  id: 'checkout',
  with: {
    lfs: true,
  }
};
