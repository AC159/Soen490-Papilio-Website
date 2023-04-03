/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import * as Interfaces from '../interfaces';
import { formatDate } from '../utils';
import { getCollection } from './realm';

export async function login(data: {
  businessId: string;
  firebaseId: string;
  name: string;
}): Promise<any> {
  return await fetch(
    `/api/business/${data.businessId}/employee/${data.firebaseId}`,
    {
      method: 'GET',
    },
  ).then(async (res) => {
    const { employee } = await res.json();
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      name: `${employee.firstName} ${employee.lastName}`,
      firebaseId: employee.firebase_id,
      businessId: employee.businessId,
      role: employee.role,
    };
  });
}
export async function register(data: any): Promise<any> {
  return {
    ...data,
    name: '',
  };
}
export function logout(): void {}
export async function getActivities(
  businessId: string,
): Promise<Interfaces.ActivityRowProps[]> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id', { cause: 1 }));
  }
  return await fetch(`/api/business/get/${businessId}/activities`, {
    method: 'GET',
  })
    .then(async (res) => await res.json())
    .then(({ activities }) =>
      activities.map((activity: any) => ({
        id: activity.id?.toString(),
        title: activity.title,
        startTime: formatDate(activity.startTime),
        endTime:
          activity.endTime !== null
            ? formatDate(activity.endTime)
            : 'Not defined',
        address: activity.address,
        status: 'inactive',
        description: activity.description,
        costPerIndividual: activity.costPerIndividual,
        costPerGroup: activity.costPerGroup,
        groupSize: activity.groupSize,
      })),
    )
    .catch(
      async (error) =>
        await Promise.reject(new Error(error.message, { cause: 0 })),
    );
}
export function getActivity(): void {}
export async function addActivity(
  businessId: string,
  data: Interfaces.IActivityData,
): Promise<Response> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id'));
  }
  return await fetch(`/api/business/addActivity/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export async function updateActivity(
  activityId: string,
  data: Interfaces.UpdateActivityData,
): Promise<Response> {
  console.log('UPDATING ACTIVITY');
  if (activityId === '') {
    return await Promise.reject(new Error('No activity Id'));
  }
  return await fetch(`/api/activity/update/${activityId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteActivities(
  activities: string[],
  businessId: string,
): Promise<void> {
  activities.forEach(async (activity) => {
    await deleteActivity(activity, businessId);
  });
}
export async function deleteActivity(
  activityId: string,
  businessId: string,
): Promise<Response> {
  return await fetch(
    `/api/business/${businessId}/removeActivity/${activityId}`,
    {
      method: 'DELETE',
    },
  );
}
export function updateProfile(): void {}
export async function getProfile(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}`, {
    method: 'GET',
  });
}

export function getEmployee(): void {}

export async function addEmployee(
  businessId: string,
  data: Interfaces.IEmployeeData,
): Promise<Response> {
  return await fetch(`/api/business/addEmployee/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employee: data }),
  });
}

export async function getEmployees(
  businessId: string,
): Promise<Interfaces.EmployeeRowProps[]> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id', { cause: 1 }));
  }
  return await fetch(`/api/business/get/${businessId}/employees`, {
    method: 'GET',
  })
    .then(async (res) => await res.json())
    .then(({ employees }) =>
      employees.map((employee: any) => ({
        id: employee.firebase_id,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        role: employee.role,
      })),
    )
    .catch(
      async (error) =>
        await Promise.reject(new Error(error.message, { cause: 0 })),
    );
}

export function updateEmployeeRole(): void {}
export async function deleteEmployees(
  employees: string[],
  businessId: string,
): Promise<void> {
  employees.forEach(async (employee) => {
    await deleteEmployee(employee, businessId);
  });
}

export async function deleteEmployee(
  employeeId: string,
  businessId: string,
): Promise<Response> {
  return await fetch(
    `/api/business/${businessId}/removeEmployee/${employeeId}`,
    {
      method: 'DELETE',
    },
  );
}
export async function addBusiness(
  data: Interfaces.IBusinessData,
): Promise<Response> {
  return await fetch('/api/business/createBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export async function getBusiness(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}`, {
    method: 'GET',
    mode: 'no-cors',
  });
}

export const formatStatistics = (
  stats: any[],
  field: string = 'activityVisited',
): any[] => {
  return (
    stats
      .map((stat) => ({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        label: `activity ${stat.activityId}`,
        data: formatTimestamp(stat[field].timestamp),
      }))
      // @ts-expect-error
      .sort((a, b) => new Date(a.data[0].primary) - new Date(b.data[0].primary))
  );
};

export const formatTimestamp = (data: any[]): any[] => {
  const info = data.reduce((prev, curr) => {
    let value = 1;
    const date = new Date(curr).toDateString();

    if (date in prev) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      value += prev[date];
    }

    return {
      ...prev,
      [date]: value,
    };
  }, {});

  return (
    Object.entries(info)
      .reduce<any>((prev, [key, value]) => {
        return [
          ...prev,
          {
            primary: key,
            secondary: value,
          },
        ];
      }, [])
      // @ts-expect-error
      .sort((a, b) => new Date(a.primary) - new Date(b.primary))
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getActivitiesStatistics(
  businessId: string,
  activity: string = '',
) {
  const collection = await getCollection(businessId);

  let stats: any[] | undefined = [];
  if (activity.length > 0) {
    stats = await collection?.find({ activityId: activity });
  } else {
    stats = await collection?.find();
  }
  return {
    activityVisited: formatStatistics(stats ?? []),
    activityRegistered: formatStatistics(stats ?? [], 'activityRegistered'),
  };
}
