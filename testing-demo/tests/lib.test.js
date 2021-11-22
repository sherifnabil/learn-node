const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absloute', () => {
  it('should return positive number if the input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return positive number if the input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if the input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return a greeting message', () => {
    const result = lib.greet('Sherif');
    expect(result).toMatch(/sherif/i);
    expect(result).toContain('Sherif');
  });
});

describe('getCurrencies', () => {
  it('it should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toContain('USD');
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});

describe('getProduct', () => {
  it('it should return the product with the given id', () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({id: 1, price: 10}); // if the result object has more properties then the test will fail

    expect(result).toMatchObject({id: 1, price: 10});

    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  const args = [null, false, 0, undefined, NaN, ''];

  args.forEach(a => {
    it('should throw an exception if the username is falsy', () => {
      expect(() => lib.registerUser(a)).toThrow();
    });
  })

  it('should return user object if valid username is passed', () => {
    const result = lib.registerUser('sherif');

    expect(result).toMatchObject({ username: 'sherif' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = (customerId) => {
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 };
    }

    const order = { customerId: 1, totalPrice:10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    // NOTE if no change occured to the implementation of the used methods those are
    // in your test main function it would take them from the real implementation of this method
    //  if the below methods are not reimplemented or overwritten the real implementation would be the default

    // db.getCustomerSync = (customerId) =>  {
    //   return { email: 'a' };
    // }
    // let mailSent = false;

    // mail.send = function (email, message) {
    //   mailSent = true;
    // }

    // using jest mocks

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    // console.log(mail.send.mock);
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  });
});