/* eslint multiline-ternary: ["error", "always-multiline"] */
import { useEffect, useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import Table, { Employee, employeeTableHeader } from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import DeleteForm from './DeleteForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import {
  addEmployee,
  deleteEmployees,
  getEmployees,
} from '../../../api/apiLayer';
import { IEmployeeData } from '../../../interfaces';
import { useAuth } from '../../../hooks/useEmployee';

enum Section {
  Table,
  Add,
  Delete,
}

const tabs: ITab[] = [
  { label: constant.ALL_EMPLOYEES_LABEL },
  { label: constant.ADMIN_LABEL },
  { label: constant.NORMAL_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className="border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white">
    <span className="material-symbols-outlined">expand_more</span>
    <span className="flex-1">User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const EmployeeDashboard = (): JSX.Element => {
  const { employee } = useAuth();
  const { businessId } = useParams();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentSection, setCurrentSection] = useState(Section.Table);

  const handleEmployeeCreation = async (data: IFormData): Promise<void> => {
    const reqData: IEmployeeData = {
      firebaseId: '',
      email: data.employeeEmail,
      firstName: data.employeeFirstName,
      lastName: data.employeeLastName,
      businessId: businessId ?? '',
      role: data.role,
      root: false, // True only while creating the business
    };

    await addEmployee(businessId ?? '', reqData).then(async () => {
      await sendSignInLinkToEmail(auth, data.employeeEmail, {
        url: 'https://localhost:3000/email-signin',
      }).then(() => {
        setCurrentSection(Section.Table);
      });
    });
  };

  const handleEmployeeDeletion = async (
    employeeIds: string[],
  ): Promise<void> => {
    await deleteEmployees(employeeIds, employee.businessId).then(async () => {
      setEmployees(
        employees.filter((employee) => !employeeIds.includes(employee.id)),
      );
    });
  };

  const ActionList = (): JSX.Element => {
    switch (currentSection) {
      case Section.Add:
      case Section.Delete:
        return (
          <Button
            text="Close"
            icon={IconNames.CLOSE}
            iconPosition="lhs"
            variant="outline"
            onClick={() => setCurrentSection(Section.Table)}
            size="sm"
            hasIcon
          />
        );
      default:
        return (
          <div className="flex space-x-2">
            <Button
              text={constant.ADD_EMPLOYEE_BUTTON}
              icon={IconNames.ADD}
              iconPosition="lhs"
              variant="outline"
              onClick={() => setCurrentSection(Section.Add)}
              size="sm"
              hasIcon
            />
            <Button
              text={constant.DELETE_EMPLOYEE_BUTTON}
              icon={IconNames.DELETE}
              iconPosition="lhs"
              variant="outline"
              onClick={() => setCurrentSection(Section.Delete)}
              size="sm"
              hasIcon
            />
          </div>
        );
    }
  };

  useEffect(() => {
    void (async function () {
      await getEmployees(businessId ?? '')
        .then(async (res) => {
          // @ts-expect-error
          const { employees } = res;
          // @ts-expect-error
          const employeeArray = employees.map((employee) => ({
            id: employee.firebase_id,
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
  if (currentSection === Section.Delete) {
    currentForm = (
      <DeleteForm onSubmit={handleEmployeeDeletion} employees={employees} />
    );
  } else if (currentSection === Section.Add) {
    currentForm = <AddForm onSubmit={handleEmployeeCreation} />;
  } else {
    currentForm = (
      <Table rowsData={employees} headerContent={employeeTableHeader} />
    );
  }

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={
          <>
            <SearchBar
              placeholder={constant.SEARCHBAR_PLACEHOLDER}
              onClick={() => {}}
              margin="right"
            />
            <Box />
          </>
        }
      />
      <ListBanner
        tabs={tabs}
        rhs={employee.role === 'Admin' && <ActionList />}
      />
      <div className="p-3">{currentForm}</div>
    </>
  );
};

export default EmployeeDashboard;
