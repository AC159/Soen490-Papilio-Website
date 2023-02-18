import { IActivityData } from '../interfaces';
import { formatDate } from '../utils';

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
  global.fetch = jest.fn(
    async () =>
      await Promise.resolve({
        json: async () => await Promise.resolve({ test: 100 }),
      }),
  ) as jest.Mock;

  beforeEach(() => {
    (
      global.fetch as jest.MockedFunction<typeof global.fetch>
    ).mockResolvedValue(new Response());
  });

  afterEach(() => {
    (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
  });

  describe('login related test', () => {
    it('should send the request to the correct endpoint and format the result', async () => {
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockResolvedValueOnce({
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

      const result = await API.login({
        businessId: BUSINESS_ID,
        firebaseId: FIREBASE_ID,
        name: 'john',
      });

      expect(result).toEqual({
        name: 'John Doe',
        firebaseId: FIREBASE_ID,
        businessId: BUSINESS_ID,
        role: 'Admin',
      });
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/${BUSINESS_ID}/employee/${FIREBASE_ID}`,
        { method: 'GET' },
      );
    });
  });

  describe('register related test', () => {
    it('should do something', async () => {
      await API.register(BUSINESS_ID);
    });
  });

  describe('getProfile related test', () => {
    it('should send the request to the correct endpoint', async () => {
      await API.getProfile(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/get/${BUSINESS_ID}`,
        { method: 'GET' },
      );
    });
  });

  describe('addEmployee related test', () => {
    it('should send the request to the correct endpoint', async () => {
      const formData = {
        firebase_id: FIREBASE_ID,
        email: 'jdoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'Admin',
        root: false,
      };

      await API.addEmployee(BUSINESS_ID, formData);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/addEmployee/${BUSINESS_ID}`,
        {
          method: 'POST',
          body: JSON.stringify({ employee: formData }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        },
      );
    });
  });

  describe('getEmployees related test', () => {
    beforeEach(() => {
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockResolvedValue({
        json: async () => ({
          employees: [
            {
              firstName: 'John',
              lastName: 'Doe',
              firebase_id: FIREBASE_ID,
              businessId: BUSINESS_ID,
              email: 'fake@email.com',
              role: 'Admin',
            },
          ],
        }),
      } as Response);
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.getEmployees('').catch((e) =>
        expect(e).toEqual(new Error('No business Id', { cause: 1 })),
      );
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getEmployees(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/get/${BUSINESS_ID}/employees`,
        {
          method: 'GET',
        },
      );
    });

    it('should throw when an error occur in the fetch', async () => {
      const message = 'Something wrong happened';
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockRejectedValue(new Error(message));

      await API.getEmployees(BUSINESS_ID).catch((e) =>
        expect(e).toEqual(new Error(message, { cause: 0 })),
      );
    });

    it('should return an array of employee', async () => {
      const result = await API.getEmployees(BUSINESS_ID);

      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: FIREBASE_ID,
            name: 'John Doe',
            email: 'fake@email.com',
            role: 'Admin',
          },
        ]),
      );
    });
  });

  describe('addBusiness related test', () => {
    it('should send the request to the correct endpoint', async () => {
      const formData = {
        business: {
          businessId: BUSINESS_ID,
          name: 'whatever',
          email: 'fake@email.com',
          address: '1234 Main Street',
        },
        employee: {
          ...EMPLOYEE_DATA,
          email: 'jdoe@email.com',
          root: true,
        },
      };

      await API.addBusiness(formData);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/business/createBusiness',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        },
      );
    });
  });

  describe('getBusiness related test', () => {
    it('should send the request to the correct endpoint', async () => {
      await API.getBusiness(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/get/${BUSINESS_ID}`,
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('getActivities related test', () => {
    let date: string;
    let otherDate: string;
    beforeEach(() => {
      date = new Date(Date.now()).toISOString();
      otherDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockResolvedValue({
        json: async () => ({
          activities: [
            {
              id: 'activity_id',
              title: 'title',
              startTime: date,
              endTime: otherDate,
              address: '1234 Main St.',
            },
          ],
          count: 0,
          businessId: BUSINESS_ID,
        }),
      } as Response);
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.getActivities('').catch((e) =>
        expect(e).toEqual(new Error('No business Id', { cause: 1 })),
      );
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getActivities(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/get/${BUSINESS_ID}/activities`,
        {
          method: 'GET',
        },
      );
    });

    it('should throw when an error occur in the fetch', async () => {
      const message = 'Something wrong happened';
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockRejectedValueOnce(new Error(message));

      await API.getActivities(BUSINESS_ID).catch((e) =>
        expect(e).toEqual(new Error(message, { cause: 0 })),
      );
    });

    it('returns an array of activities', async () => {
      const result = await API.getActivities(BUSINESS_ID);

      expect(result).toEqual([
        {
          id: 'activity_id',
          title: 'title',
          startTime: expect.any(String),
          endTime: expect.any(String),
          address: '1234 Main St.',
          status: 'inactive',
        },
      ]);
    });

    it('formats date values in each activities', async () => {
      const result = await API.getActivities(BUSINESS_ID);

      expect(result).toEqual([
        expect.objectContaining({
          startTime: formatDate(date),
          endTime: formatDate(otherDate),
        }),
      ]);
    });

    it('displays not defined when there are no values for end time', async () => {
      (
        global.fetch as jest.MockedFunction<typeof global.fetch>
      ).mockResolvedValue({
        json: async () => ({
          activities: [
            {
              id: 'activity_id',
              title: 'title',
              startTime: date,
              endTime: null,
              address: '1234 Main St.',
            },
          ],
          count: 0,
          businessId: BUSINESS_ID,
        }),
      } as Response);

      const result = await API.getActivities(BUSINESS_ID);

      expect(result).toEqual([
        expect.objectContaining({
          endTime: 'Not defined',
        }),
      ]);
    });
  });

  describe('addActivity related test', () => {
    let formData: IActivityData;

    beforeEach(() => {
      formData = {
        activity: {
          title: 'title',
          description: 'description',
          costPerIndividual: 9.99,
          costPerGroup: 89.99,
          groupSize: 10,
          startTime: '1970-01-01T00:00:00.000Z',
          endTime: '2070-01-01T00:00:00.000Z',
          address: '',
        },
      };
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.addActivity('', formData).catch((e) =>
        expect(e).toEqual(new Error('No business Id', { cause: 1 })),
      );
    });

    it('should send the request to the correct endpoint', async () => {
      await API.addActivity(BUSINESS_ID, formData);

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/addActivity/${BUSINESS_ID}`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        },
      );
    });
  });

  describe('deleteEmployee', () => {
    const businessId = 'businessId';

    it('should send the request to the correct endpoint', async () => {
      const employees = ['1234'];
      await API.deleteEmployees(employees, businessId);
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/business/${businessId}/removeEmployee/1234`,
        {
          method: 'DELETE',
        },
      );
    });

    it('calls fetch for each employee to delete', async () => {
      const employees = ['1234', '2345'];
      await API.deleteEmployees(employees, businessId);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
