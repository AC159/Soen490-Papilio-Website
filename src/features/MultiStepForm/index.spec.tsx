import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import MultiStepForm, { Progress, Step } from '.';

let mockData = {};

jest.mock('./ProfileForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <div data-testid="profile">
      <button onClick={() => onSubmit(mockData)} />
    </div>
  ),
}));

jest.mock('./AdminForm', () => ({
  __esModule: true,
  default: ({ onSubmit, onBack }: any) => (
    <div data-testid="adminAccount">
      <button onClick={() => onSubmit(mockData)}>next</button>
      <button onClick={() => onBack()}>back</button>
    </div>
  ),
}));

const progress: Progress[] = [
  {
    icon: 'feed',
    text: 'Business profile',
  },
  {
    icon: 'admin_panel_settings',
    text: 'Root accout',
  },
  {
    icon: 'done_all',
    text: 'Validation',
  },
];

const steps: Step[] = [
  {
    stepId: 'profile',
    caption: "Let's create your business profile",
    last: false,
  },
  {
    stepId: 'adminAccount',
    caption: "Let's create your main account",
    last: false,
  },
  {
    stepId: 'validation',
    // title: 'Your business is being created',
    caption: "Let's create your business",
    last: true,
  },
];

const defaultProps = {
  steps,
  progress,
  onSubmit: async () => {},
};

const TestWrapper = ({ children }: any): JSX.Element => (
  <MemoryRouter initialEntries={[{ state: { businessId: 'business1' } }]}>
    {children}
  </MemoryRouter>
);

describe('multi step form test', () => {
  const itDisplaysPageInCorrectOrder = (
    name: string,
    id: string,
    pageNumber: number,
  ): void =>
    it(`displays ${name} page in the ${pageNumber} place`, async () => {
      render(
        <TestWrapper>
          <MultiStepForm {...defaultProps} />
        </TestWrapper>,
      );

      for (let i = 1; i < pageNumber; i++) {
        expect(screen.getByRole('button')).toBeInTheDocument();
        await act(async () =>
          userEvent.click(await screen.findByRole('button')),
        );
      }

      expect(await screen.findByTestId(id)).toBeInTheDocument();
    });

  itDisplaysPageInCorrectOrder('Profile', 'profile', 1);
  itDisplaysPageInCorrectOrder('Admin Form', 'adminAccount', 2);

  it('returns to the previous page on back', async () => {
    const mockOnSubmit = jest.fn();
    mockData = { ...mockData, businessName: 'Awesome Business' };
    render(
      <TestWrapper>
        <MultiStepForm {...defaultProps} onSubmit={mockOnSubmit} />
      </TestWrapper>,
    );

    userEvent.click(await screen.findByRole('button'));
    userEvent.click(await screen.findByRole('button', { name: 'back' }));

    expect(await screen.findByTestId('profile')).toBeInTheDocument();
  });

  it('display a finish message when reaching the last page', async () => {
    render(
      <TestWrapper>
        <MultiStepForm {...defaultProps} />
      </TestWrapper>,
    );

    await act(async () => userEvent.click(await screen.findByRole('button')));
    await act(async () =>
      userEvent.click(await screen.findByText('next', { selector: 'button' })),
    );

    expect(await screen.findByTestId('last')).toBeInTheDocument();
  });
});
