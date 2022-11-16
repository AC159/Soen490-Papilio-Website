import * as Interfaces from '../interfaces';

export async function login(data: any): Promise<any> {}
export async function register(data: any): Promise<any> {}
export function logout(): void {}
export function getActivites(): void {}
export function getActivity(): void {}
export function addActivity(): void {}
export function updateActivity(): void {}
export function updateProfile(): void {}
export async function getProfile(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}`, {
    method: 'GET',
  });
}

export function getEmployee(): void {}

export async function addEmployee(
  businessId: string,
  data: Interfaces.IEmployeeData
): Promise<Response> {
  return await fetch(`/api/business/addEmployee/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function getEmployees(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}/employees`, {
    method: 'GET',
  });
}

export function updateEmployeeRole(): void {}
export async function addBusiness(data: Interfaces.IBusinessData): Promise<Response> {
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
