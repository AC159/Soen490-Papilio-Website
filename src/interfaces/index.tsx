export declare interface IEmployeeData {
  firebaseId: string
  email: string
  name: string
  businessId: string
  role: string
  root: boolean
}

export declare interface IBusinessData {
  business: {
    businessId: string
    name: string
  }
  address: {
    mention: string
    lineOne: string
    lineTwo: string
    state: string
    postalCode: string
    city: string
    country: string
  }
  employee: {
    firstName: string
    lastName: string
    email: string
    firebase_id: string
    role: string
    root: boolean
  }
}
