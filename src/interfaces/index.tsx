export declare interface IEmployeeData {
  firebase_id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  root: boolean;
}

export declare interface IBusinessData {
  business: {
    businessId: string;
    name: string;
    email: string;
    address: string;
  };
  employee: {
    firstName: string;
    lastName: string;
    email: string;
    firebase_id: string;
    role: string;
    root: boolean;
  };
}

export declare interface IActivityData {
  activity: {
    title: string;
    description: string;
    costPerIndividual: number;
    costPerGroup: number;
    groupSize: number;
    startTime: string;
    endTime: string;
    address: string;
  };
}

export declare interface UpdateActivityData {
  update: {
    title: string;
    description: string;
    costPerIndividual: number;
    costPerGroup: number;
    groupSize: number;
    startTime: string;
    endTime: string;
    address: string;
  };
}

export declare interface IActivity {
  id?: number;
  title: string;
  description: string;
  costPerIndividual: number;
  costPerGroup: number;
  groupSize: number;
  address: string;
  image?: null;
  startTime: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
  businessId?: string;
}

export declare interface IActivitiesResponse {
  businessId: string;
  count: number;
  activities: IActivityData[];
}

export interface EmployeeRowProps extends RowProps {
  name: string;
  email: string;
  role: string;
}

export interface ActivityRowProps extends RowProps {
  title: string;
  startTime: string;
  endTime: string;
  address: string;
  status: string;
}

export interface RowProps {
  id: string;
}

export interface Datum {
  primary: string;
  secondary: number;
}

export interface GraphDataProps {
  label: string;
  data: Datum[];
}
