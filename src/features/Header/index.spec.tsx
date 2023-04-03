import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

import Header from '.';

describe('Header tests', () => {
  it('should navigate to login page when login is clicked', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Header />} />
          <Route path="/login" element={<p>Login Page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await act(async () => userEvent.click(await screen.findByText('Login')));
    expect(await screen.findByText(/Login Page/)).toBeInTheDocument();
  });

  it('should navigate to admin form page when getting start is clicked', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Header />} />
          <Route path="/signup" element={<p>Admin Page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await act(async () =>
      userEvent.click(await screen.findByText(/Get Started/)),
    );

    expect(await screen.findByText(/Admin Page/)).toBeInTheDocument();
  });

  it('navigates back to the home page when visiting the pricing page', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Header />} />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await act(async () => userEvent.click(await screen.findByText(/Pricing/)));

    expect(await screen.findByText(/Pricing/)).toBeInTheDocument();
  });

  it('navigates back to the home page when visiting the features page', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Header />} />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await act(async () => userEvent.click(await screen.findByText(/Features/)));

    expect(await screen.findByText(/Features/)).toBeInTheDocument();
  });

  it('navigates back to the home page when visiting the blog page', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<Header />} />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await act(async () => userEvent.click(await screen.findByText(/Blog/)));

    expect(await screen.findByText(/Blog/)).toBeInTheDocument();
  });
});
