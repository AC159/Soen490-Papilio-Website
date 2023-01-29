import { useEffect, useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import Table, { Employee } from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm from './AddForm';
import DeleteForm from './DeleteForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import { addEmployee, getEmployees } from '../../../api/apiLayer';
import { IEmployeeData } from '../../../interfaces';
import { useAuth } from '../../../hooks/useEmployee';

export declare interface IFormData {
  employeeName: string
  employeeEmail: string
  role: string
};

const initialEmployee = [
  {
    id: 241,
    name: 'John',
    email: 'johnd@gmail.com',
    role: 'Admin',
  },
  {
    id: 242,
    name: 'Jack',
    email: 'jackd@gmail.com',
    role: 'Manager',
  },
];

enum FormState {
  Table,
  Add,
  Delete
}

const tabs: ITab[] = [
  { label: constant.ALL_EMPLOYEES_LABEL },
  { label: constant.ADMIN_LABEL },
  { label: constant.NORMAL_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const EmployeeDashboard = (): JSX.Element => {
  const { employee } = useAuth();
  const { businessId } = useParams();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployee);
  const [formState, setFormState] = useState(FormState.Table);

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData: IEmployeeData = {
      firebaseId: '',
      email: data.employeeEmail,
      name: data.employeeName,
      businessId: (businessId ?? ''),
      role: data.role,
      root: false, // True only while creating the business
    };

    await addEmployee((businessId ?? ''), reqData).then(async () => {
      await sendSignInLinkToEmail(auth, data.employeeEmail, {
        url: 'https://localhost:3000/email-signin',
      }).then(() => {
        setFormState(FormState.Table);
      });
    });
  };

  const onSubmitDelete = (employeeIds: number[]): void => {
    setEmployees(employees.filter(employee => !employeeIds.includes(Number(employee.id))));
  };

  const ActionList = (): JSX.Element => {
    if (employee.role !== 'Admin') { return <></>; }
    return (
      <div className='flex space-x-2'>
        <Button
          text={constant.ADD_EMPLOYEE_BUTTON}
          hasIcon={true}
          icon={IconNames.ADD}
          iconPosition='lhs'
          variant='outline'
          onClick={() => {
            if (formState !== FormState.Add) {
              setFormState(FormState.Add);
            } else {
              setFormState(FormState.Table);
            }
          }}
          size='sm'
        />
        <Button
          text={constant.DELETE_EMPLOYEE_BUTTON}
          hasIcon={true}
          icon={IconNames.DELETE}
          iconPosition='lhs'
          variant='outline'
          onClick={() => {
            if (formState !== FormState.Delete) {
              setFormState(FormState.Delete);
            } else {
              setFormState(FormState.Table);
            }
          }}
          size='sm'
        />
      </div>);
  };

  useEffect(() => {
    void (async function getAllEmployees() {
      await getEmployees(businessId ?? '')
        .then(async (res) => {
          // @ts-expect-error
          const { employees } = res;
          // @ts-expect-error
          const employeeArray = employees.map((employee) => ({
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            role: employee.role,
          }));
          setEmployees(employeeArray);
        })
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId]);

  let currentForm = null;
  if (formState === FormState.Delete) {
    currentForm = <DeleteForm onSubmit={onSubmitDelete} employees={employees} />;
  } else if (formState === FormState.Add) {
    currentForm = <AddForm onSubmit={onSubmit} />;
  } else {
    currentForm = <Table employees={employees} />;
  }

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={(
          <>
            <SearchBar placeholder={constant.SEARCHBAR_PLACEHOLDER} onClick={() => { }} margin="right" />
            <Box />
          </>
        )}
      />
      <ListBanner
        tabs={tabs}
        rhs={<ActionList />}
      />
      <div className='p-3'>
        {currentForm}
      </div>
    </>
  );
};

export default EmployeeDashboard;
