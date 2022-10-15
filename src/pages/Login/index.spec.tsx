// import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as auth from 'firebase/auth';

import LoginPage from '.';
import * as businessConstant from './BusinessForm/constant';
import * as adminConstant from './AdminForm/constant';

jest.mock('firebase/auth');

describe('logic test', () => {
  global.fetch = jest.fn(async () =>
    await Promise.resolve({
      json: async () => await Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  beforeEach(() => {
    // @ts-expect-error
    global.fetch.mockClear();
  });

  test('login page business test', async () => {
    // @ts-expect-error
    fetch.mockResolvedValueOnce({
      status: 201,
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path='' element={<LoginPage type='business' />} />
          <Route path='admin' element={<div>ADMIN PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(businessConstant.FORM_HEADING)).toBeInTheDocument();
    userEvent.click(screen.getByText(businessConstant.SUBMIT_BUTTON_TEXT));

    expect(await screen.findByText(/ADMIN PAGE/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
  });

  test('login page admin test', async () => {
    // @ts-expect-error
    fetch.mockResolvedValueOnce({
      status: 201,
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        uid: 'firebase-id',
      },
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<LoginPage type='admin' />} />
          {/* // TODO: REMOVE HARD CODED PATH */}
          <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(adminConstant.FORM_HEADING)).toBeInTheDocument();

    expect(screen.getByText(adminConstant.FORM_HEADING)).toBeInTheDocument();
    userEvent.click(screen.getByText(adminConstant.SUBMIT_BUTTON_TEXT));

    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(await screen.findByText(/DASHBOARD PAGE/)).toBeInTheDocument();
  });
});
