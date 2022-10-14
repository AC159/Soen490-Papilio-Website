// import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '.';
import * as businessConstant from './BusinessForm/constant';
import * as adminConstant from './AdminForm/constant';

describe('logic test', () => {
  test('login page business test', async () => {
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
  });

  test('login page admin test', async () => {
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

    expect(await screen.findByText(/DASHBOARD PAGE/)).toBeInTheDocument();
  });
});
