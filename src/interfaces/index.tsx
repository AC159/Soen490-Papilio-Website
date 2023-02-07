export declare interface IEmployeeData {
  firebaseId: string;
  email: string;
  firstName: string;
  lastName: string;
  businessId: string;
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
  activity: IActivity;
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
  activities: IActivity[];
}
