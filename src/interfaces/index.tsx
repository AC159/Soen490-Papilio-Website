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
  activity: {
    title: string;
    description: string;
    costPerIndividual: number;
    costPerGroup: number;
    groupSize: number;
    startTime: string;
    endTime: string;
    address: string;
  }
}

export declare interface IActivitiesResponse {
  businessId: string;
  count: number;
  activities: IActivityData[];
}
