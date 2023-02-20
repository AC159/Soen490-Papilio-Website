import {
  screen,
  render,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';

import ActivityDashboard from '.';
import * as constants from './constant';
import { AuthProvider } from '../../../context/employeeContext';
import * as hooks from '../../../hooks/useEmployee';
import * as API from '../../../api/apiLayer';
import { formatDate } from '../../../utils';

let mockData: any;

jest.mock('firebase/auth');
jest.mock('firebase/app');

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useParams: jest.fn(),
}));

jest.mock('./AddForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any): JSX.Element => (
    <button data-testid="addForm" onClick={() => onSubmit(mockData)} />
  ),
}));

jest.mock('../../../api/apiLayer', () => ({
  __esModule: true,
  addActivity: jest.fn(),
  getActivities: jest.fn(),
}));

describe('Activity dashboard test', () => {
  beforeEach(() => {
    (hooks.useAuth as jest.MockedFunction<typeof hooks.useAuth>) = jest
      .fn()
      .mockReturnValue({
        employee: {
          firstName: 'John',
          lastName: 'Doe',
          role: 'Admin',
          firebaseId: 'firebase-id',
        },
      });
    (
      API.getActivities as jest.MockedFunction<typeof API.getActivities>
    ).mockResolvedValue([
      {
        id: 'activity_id',
        title: 'title',
        startTime: formatDate(Date()),
        endTime: '',
        address: '1234 Main St.',
        status: 'inactive',
      },
    ]);

    (API.addActivity as jest.MockedFunction<typeof API.addActivity>)
      // @ts-expect-error
      .mockResolvedValue(null);

    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({
      businessId: '',
    });
    mockData = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('open add employee form test', async () => {
    render(
      <AuthProvider>
        <ActivityDashboard />
      </AuthProvider>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constants.ADD_ACTIVITY_BUTTON));

    expect(await screen.findByTestId('addForm')).toBeInTheDocument();
  });

  it('calls getActivities with the businessId when page load', async () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValueOnce({
      businessId: 'businessId',
    });
    render(
      <AuthProvider>
        <ActivityDashboard />
      </AuthProvider>,
    );
    expect(API.getActivities).toHaveBeenCalledWith('businessId');
    await act(async () => await Promise.resolve());
  });

  it('calls addActivity with the correct information when add form is submit', async () => {
    mockData = {
      title: 'Test Run Activity',
      description: "Let's RUNNNNNNN",
      costPerIndividual: 0.99,
      costPerGroup: 7.99,
      groupSize: 10,
      startTime: '2022-13-16 10:05:00+00',
      address: '201 Main Street, Montreal, QC EXM PLE',
    };

    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({
      businessId: 'businessId',
    });
    render(
      <AuthProvider>
        <ActivityDashboard />
      </AuthProvider>,
    );

    userEvent.click(screen.getByText(constants.ADD_ACTIVITY_BUTTON));
    userEvent.click(await screen.findByTestId('addForm'));

    expect(API.addActivity).toHaveBeenCalledWith('businessId', {
      activity: expect.objectContaining({
        title: 'Test Run Activity',
        description: "Let's RUNNNNNNN",
        costPerIndividual: 0.99,
        costPerGroup: 7.99,
        groupSize: 10,
        startTime: '2022-13-16 10:05:00+00',
        address: '201 Main Street, Montreal, QC EXM PLE',
      }),
    });
    await act(async () => await Promise.resolve());
  });

  it('close the add activity form after successfull submit', async () => {
    render(
      <AuthProvider>
        <ActivityDashboard />
      </AuthProvider>,
    );

    userEvent.click(screen.getByText(constants.ADD_ACTIVITY_BUTTON));
    userEvent.click(await screen.findByTestId('addForm'));

    await waitForElementToBeRemoved(() => screen.queryByTestId('addForm'));
    expect(screen.queryByTestId('addForm')).not.toBeInTheDocument();
  });
});
