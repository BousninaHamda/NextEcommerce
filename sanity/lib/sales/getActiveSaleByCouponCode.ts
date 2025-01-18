import { defineQuery } from 'next-sanity';
import { CouponCode } from './couponCodes';
import { sanityFetch } from '../live';

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const Active_SALE_BY_COUPON_CODE = defineQuery(`
        *[
            _type == 'sale'
            && isActive == true
            && couponCode == $couponCode
        ] | order(validForm desc)[0]
        `);

  try {
    const activeSale = await sanityFetch({
      query: Active_SALE_BY_COUPON_CODE,
      params: {
        couponCode,
      },
    });
    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error('Error fetching active sale by coupon code: ', error);
    return null;
  }
};
