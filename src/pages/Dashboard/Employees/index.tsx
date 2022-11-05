import { useEffect, useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
// import axios from 'axios';

import { auth } from '../../../firebase';
import Table, { IBodyContent } from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import { useParams } from 'react-router-dom';
import { employeeHeader } from '../../../features/Table/headers';

const tabs: ITab[] = [
  { label: constant.ALL_EMPLOYEES_LABEL },
  { label: constant.ADMIN_LABEL },
  { label: constant.NORMAL_LABEL },
];

declare interface IEmployee {
  firebase_id: string
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  root: boolean
  business_id: string
}

declare interface IBody {
  'businessId': string
  'count': number
  'employees': IEmployee[]
}

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const EmployeeDashboard = (): JSX.Element => {
  const { businessId } = useParams();
  const [employees, setEmployees] = useState<IBodyContent[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData = {
      firebaseId: '',
      email: data.employeeEmail,
      firstName: data.employeeName.split(' ')[0],
      lastName: data.employeeName.split(' ')[1],
      businessId,
      role: data.role,
      root: false, // True only while creating the business
    };

    await fetch(`/api/business/addEmployee/${businessId ?? ''}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    }).then(async () => {
      await sendSignInLinkToEmail(auth, data.employeeEmail, {
        url: 'https://localhost:3000/email-signin',
      }).then(() => {
        setIsOpen(false);
      });
    });
  };

  useEffect(() => {
    void (async function getEmployees () {
      await fetch(`/api/business/get/${businessId ?? ''}/employees`, {
        method: 'GET',
      }).then((res: Response) => {
        const body = res.body as unknown as IBody;
        const employeesRes = body.employees.map(({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          firebase_id,
          firstName,
          lastName,
          email,
          role,
        }): IBodyContent => ({
          id: firebase_id,
          content: [
            { value: `${firstName} ${lastName}` },
            { value: email },
            { value: role, center: true },
          ],
        }));

        setEmployees(employeesRes);
      });
    })();
  }, []);

  console.log(employees);
  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={(
          <>
            <SearchBar placeholder={constant.SEARCHBAR_PLACEHOLDER} onClick={() => {}} margin="right"/>
            <Box />
          </>
        )}
      />
      <ListBanner
        tabs={tabs}
        rhs={
          <Button
            text={constant.ADD_EMPLOYEE_BUTTON}
            hasIcon={true}
            icon={IconNames.ADD}
            iconPosition='lhs'
            variant='outline'
            onClick={() => { setIsOpen(!isOpen); }}
            size='sm'
          />
        }
      />
      <div className='p-3'>
        {isOpen ? (<AddForm onSubmit={onSubmit} />) : (<Table headContent={employeeHeader} bodyContent={employees}/>)}
      </div>
    </>
  );
};

export default EmployeeDashboard;
