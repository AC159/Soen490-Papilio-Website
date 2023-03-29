/* eslint multiline-ternary: ["error", "always-multiline"] */
import { useEffect, useState } from 'react';
import { sendSignInLinkToEmail, sendPasswordResetEmail } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import Table, { employeeTableHeader } from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import DeleteForm from './DeleteForm';
import EditForm from './EditForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import {
  addEmployee,
  deleteEmployees,
  getEmployees,
  editEmployee,
} from '../../../api/apiLayer';
import { IEmployeeData, EmployeeRowProps } from '../../../interfaces';
import { useAuth } from '../../../hooks/useEmployee';
import { RowAction } from '../../../features/Table/Row';

enum Section {
  Table,
  Add,
  Delete,
  Edit,

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

const suspendUserAccess = async (employeeId: string): Promise<void> => {
  const setCustomClaims = httpsCallable(getFunctions(), 'setCustomClaims');
  try {
    await setCustomClaims({ employeeId, suspended: true });
    console.log(`User access suspended for user with UID ${employeeId}`);
    // display success message to user
  } catch (error) {
    console.error(`Error suspending access for user with UID ${employeeId}:`, error);
    // display error message to user
  }
};

const activateUserAccess = async (employeeId: string): Promise<void> => {
  const setCustomClaims = httpsCallable(getFunctions(), 'setCustomClaims');
  try {
    await setCustomClaims({ employeeId, activated: true });
    console.log(`User access suspended for user with UID ${employeeId}`);
    // display success message to user
  } catch (error) {
    console.error(`Error suspending access for user with UID ${employeeId}:`, error);
    // display error message to user
  }
};
const EmployeeDashboard = (): JSX.Element => {
  const { employee } = useAuth();
  const { businessId } = useParams();
  const [employees, setEmployees] = useState<EmployeeRowProps[]>([]);
  const [currentSection, setCurrentSection] = useState(Section.Table);

  const handleEmployeeCreation = async (data: IFormData): Promise<void> => {
    const reqData: IEmployeeData = {
      firebase_id: '',
      email: data.employeeEmail,
      firstName: data.employeeFirstName,
      lastName: data.employeeLastName,
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

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRowProps | null>(null);

  const handleEmployeeEditing = async (data: IFormData): Promise<void> => {
    const reqData: IEmployeeData = {
      firebase_id: selectedEmployee?.id ?? '', // Assuming you want to update the selected employee
      email: data.employeeEmail,
      firstName: data.employeeFirstName,
      lastName: data.employeeLastName,
      role: data.role,
      root: false, // True only while creating the business
    };

    await editEmployee(businessId ?? '', selectedEmployee?.id ?? '', reqData).then(async () => {
      setCurrentSection(Section.Table);
    });
  };

  const handleEmployeeDeletion = async (
    employeeIds: string[],
  ): Promise<void> => {
    await deleteEmployees(employeeIds, employee.businessId).then(async () => {
      setEmployees(
        employees.filter((employee) => !employeeIds.includes(employee.id)),
      );
      setCurrentSection(Section.Table);
    });
  };

  const ActionList = (): JSX.Element => {
    console.log(currentSection);
    switch (currentSection) {
      case Section.Add:
      case Section.Delete:
      case Section.Edit:
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
        .then(setEmployees)
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId]);

  const rowActions: RowAction[] = [
    {
      label: 'Delete Employee',
      onClick: (employeeId: string): void => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert('User is not logged in');
          return;
        }
        const loggedInUserId = currentUser.uid;

        if (employeeId === loggedInUserId) {
          alert('You cannot delete yourself!');
          return;
        }

        handleEmployeeDeletion([employeeId])
          .then(() => alert('Employee successfully deleted!'))
          .catch((e: Error) => alert('Error while deleting employee: ' + e.message));
      },
    },

    {
      label: 'Reset Password',
      onClick: (employeeEmail: string): void => {
        sendPasswordResetEmail(auth, employeeEmail)
          .then(() => console.log(`Password reset email sent to ${employeeEmail}`))
          .catch((e: Error) => alert('Error while sneding the request to the server: ' + String(e.message)));
      },
    },

    {
      label: 'Suspend User Access',
      onClick: (employeeId: string): void => {
        suspendUserAccess(employeeId)
          .then(() => console.log(`User access suspended for user with UID ${employeeId}`))
          .catch((error) => console.error(`Error suspending access for user with UID ${employeeId}:`, error));
      },
    },
    {
      label: 'Activate Access',
      onClick: (employeeId: string): void => {
        activateUserAccess(employeeId)
          .then(() => console.log(`User access activated for user with UID ${employeeId}`))
          .catch((error) => console.error(`Error activating access for user with UID ${employeeId}:`, error));
      },
    },

    {
      label: 'Edit User Profile',
      onClick: (employeeId: string) => {
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
          setSelectedEmployee(employee);
          setCurrentSection(Section.Edit);
        } else {
          alert('Employee not found!');
        }
      },
    },
  ];
  let currentForm: JSX.Element = <></>;
  if (currentSection === Section.Delete) {
    currentForm = (
      <DeleteForm onSubmit={handleEmployeeDeletion} employees={employees} />
    );
  } else if (currentSection === Section.Add) {
    currentForm = <AddForm onSubmit={handleEmployeeCreation} />;
  } else if (currentSection === Section.Edit && selectedEmployee) {
    const formData: IFormData = {
      employeeFirstName: selectedEmployee.firstName,
      employeeLastName: selectedEmployee.lastName,
      employeeEmail: selectedEmployee.email,
      role: selectedEmployee.role,
    };
    currentForm = (
      <EditForm
        onSubmit={handleEmployeeEditing}
        employeeData={formData}
      />
    );
  } else {
    currentForm = (
      <Table rowsData={employees} headerContent={employeeTableHeader} rowActions={rowActions} />
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
              onClick={() => { }}
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
