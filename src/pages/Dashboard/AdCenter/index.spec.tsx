import { render } from '@testing-library/react';
import AdsDashboard from '.';
import * as constant from './contant';
import PageHeader from '../../../features/PageHeader';
import Ad from '../../../features/Ad';

jest.mock('../../../features/PageHeader', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../features/Ad', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AdsDashboard', () => {
  it('display a PageHeader at the top of the page with a header and subtitle', () => {
    render(<AdsDashboard />);
    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        header: constant.HEADER,
        subtitle: constant.SUBHEADER,
      }),
      expect.anything(),
    );
  });

  it('displays the ad information', () => {
    render(<AdsDashboard />);
    expect(Ad).toHaveBeenCalled();
  });
});
