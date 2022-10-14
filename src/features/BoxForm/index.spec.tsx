import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BoxForm from '.';

const ButtonBoxForm = (): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <BoxForm
        heading='Heading'
        buttonText='Create'
        buttonOnClick={() => setIsClicked(!isClicked)}
      >
        <div>Form</div>
      </BoxForm>
      {isClicked && (<div>Clicked</div>)}
    </>
  );
};

describe('logic test', () => {
  test('button click', async () => {
    render(<ButtonBoxForm />);

    expect(screen.getByText(/Heading/)).toBeInTheDocument();
    expect(screen.getByText(/Form/)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Create/));
    expect(screen.getByText(/Clicked/)).toBeInTheDocument();
  });

  test('back link click', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BoxForm
                heading='Heading'
                buttonText='Create'
                buttonOnClick={() => {}}
                backButtonTo='/back'
                hasBack
              >
                <div>Form</div>
              </BoxForm>
            }
          />
          <Route path="/back" element={<div>Old page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Form/)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/back/));
    expect(await screen.findByText(/Old page/)).toBeInTheDocument();
  });
});
