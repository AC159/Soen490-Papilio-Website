import { screen, render } from '@testing-library/react';
import DashboardContainer from '.';
import SideMenu from '../SideMenu';

jest.mock('../SideMenu', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DashboardContainer', () => {
  it('displays a sidemenu', () => {
    render(
      <DashboardContainer>
        <span>a</span>
      </DashboardContainer>,
    );
    // @ts-expect-error
    expect(SideMenu.mock.calls.length).toBeGreaterThan(0);
  });

  it('displays a component as child', () => {
    render(
      <DashboardContainer>
        <span>Children</span>
      </DashboardContainer>,
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
