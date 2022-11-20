import 'jest';

import * as API from './apiLayer';

const BUSINESS_ID = 'businessId';
const FIREBASE_ID = 'firebaseId';

const EMPLOYEE_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  firebase_id: FIREBASE_ID,
  businessId: BUSINESS_ID,
  role: 'Admin',
};

describe('api test', () => {
  ;
  global.fetch = jest.fn(async () =>
    await Promise.resolve({
      json: async () => await Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  beforeEach(() => {
    (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValue(new Response());
  });

  describe('login related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint and format the result', async () => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        json: async () => ({
          employee: {
            firstName: 'John',
            lastName: 'Doe',
            firebase_id: FIREBASE_ID,
            businessId: BUSINESS_ID,
            role: 'Admin',
          },
        }),
      } as Response);

      const result = await API.login({ businessId: BUSINESS_ID, firebaseId: FIREBASE_ID, name: 'john' });

      expect(result).toEqual({
        name: 'John Doe',
        firebaseId: FIREBASE_ID,
        businessId: BUSINESS_ID,
        role: 'Admin',
      });
      expect(global.fetch).toHaveBeenCalledWith(`/api/business/${BUSINESS_ID}/employee/${FIREBASE_ID}`, { method: 'GET' });
    });
  });

  describe('register related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should do something', async () => {
      await API.register(BUSINESS_ID);
    });
  });

  describe('getProfile related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getProfile(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}`, { method: 'GET' });
    });
  });

  describe('addEmployee related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      const formData = {
        firebaseId: FIREBASE_ID,
        email: 'jdoe@email.com',
        name: 'John Doe',
        businessId: BUSINESS_ID,
        role: 'Admin',
        root: false,
      };

      await API.addEmployee(BUSINESS_ID, formData);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/addEmployee/${BUSINESS_ID}`, {
        method: 'POST',
        body: JSON.stringify({ employee: formData }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      });
    });
  });

  describe('getEmployees related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.getEmployees('')
        .catch(e => expect(e).toEqual(new Error('No business Id', { cause: 1 })));
    });

    it('should send the request to the correct endpoint', async () => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        json: async () => ({
          employees: [{
            firstName: 'John',
            lastName: 'Doe',
            firebase_id: FIREBASE_ID,
            businessId: BUSINESS_ID,
            role: 'Admin',
          }],
        }),
      } as Response);

      const results = await API.getEmployees(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}/employees`, {
        method: 'GET',
      });
      expect(results).toEqual(expect.objectContaining({
        employees: expect.arrayContaining([]),
      }));
    });

    it('should throw when an error occur in the fetch', async () => {
      const message = 'Something wrong happened';
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockRejectedValueOnce(new Error(message));

      await API.getEmployees(BUSINESS_ID)
        .catch(e => expect(e).toEqual(new Error(message, { cause: 0 })));
    });
  });

  describe('addBusiness related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      const formData = {
        business: {
          businessId: BUSINESS_ID,
          name: 'whatever',
        },
        address: {
          mention: 'whatever',
          lineOne: '1234 street',
          lineTwo: 'appt. 1',
          state: 'QC',
          postalCode: 'G8S 3S1',
          city: 'Montreal',
          country: 'Canada',
        },
        employee: {
          ...EMPLOYEE_DATA,
          email: 'jdoe@email.com',
          root: true,
        },
      };

      await API.addBusiness(formData);

      expect(global.fetch).toHaveBeenCalledWith('/api/business/createBusiness', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      });
    });
  });

  describe('getBusiness related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getBusiness(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}`, expect.objectContaining({ method: 'GET' }));
    });
  });
});
