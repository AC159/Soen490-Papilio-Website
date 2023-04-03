/* eslint-disable multiline-ternary */
// @ts-nocheck
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import Button from '../../../../components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Focused = 'name' | 'number' | 'expiry' | 'cvc';

const bundleCost = (bundle): string => {
  switch (bundle) {
    case 'PRO':
      return '$14.99/month';
    case 'ULTIMATE':
      return '$19.99/month';
    default:
      return '$9.99/month';
  }
};

const bundleValue = (bundle): number => {
  switch (bundle) {
    case 'PRO':
      return 2;
    case 'ULTIMATE':
      return 3;
    default:
      return 1;
  }
};

const PaymentForm: React.FC = (): JSX.Element => {
  const [creditNumber, setCreditNumber] = useState('');
  const [creditName, setCreditName] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState<Focused | undefined>();
  const [saveCreditCardInfo, setSaveCreditCardInfo] = useState(false); // new state for saving credit card info
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const timeOfpayment = new Date();
  const processPayment = async (): Promise<void> => {
    const businessId = searchParams.get('id');
    const data = {
      adTier: bundleValue(searchParams.get('package')),
    };
    await fetch(`/api/business/${businessId ?? ''}/registerAdTier`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      navigate(`/${businessId ?? ''}/dashboard/billing`);
    });
  };
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Payment Information </h2>
          <div className="mb-2">
            <span className="text-gray-700">Package Name:</span>{' '}
            <span className="font-bold">{searchParams.get('package')}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700">Cost:</span>{' '}
            <span className="font-bold">
              {bundleCost(searchParams.get('package'))}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <InputMask
              mask="9999 9999 9999 9999"
              value={creditNumber}
              onChange={(event) => {
                setCreditNumber(event.target.value);
                setFocus('number');
              }}
            >
              {() => (
                <TextField
                  label="Credit Number"
                  variant="outlined"
                  className="w-full"
                />
              )}
            </InputMask>
          </div>
          <div className="relative">
            <TextField
              label="Credit Name"
              variant="outlined"
              value={creditName}
              onChange={(event) => {
                setCreditName(event.target.value);
                setFocus('name');
              }}
              className="w-full"
            />
          </div>
          <div className="relative">
            <InputMask
              mask="999"
              value={cvc}
              onChange={(event) => {
                setCvc(event.target.value);
                setFocus('cvc');
              }}
            >
              {() => (
                <TextField label="CVC" variant="outlined" className="w-full" />
              )}
            </InputMask>
          </div>
          <div className="relative">
            <InputMask
              mask="99/99"
              value={expiry}
              onChange={(event) => {
                setExpiry(event.target.value);
                setFocus('expiry');
              }}
            >
              {() => (
                <TextField
                  label="Expiry"
                  variant="outlined"
                  className="w-full"
                />
              )}
            </InputMask>
          </div>
          <div className="relative">
            <label
              htmlFor="save-credit-card-info"
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                id="save-credit-card-info"
                checked={saveCreditCardInfo}
                onChange={() => setSaveCreditCardInfo(!saveCreditCardInfo)}
                className="form-checkbox"
              />
              <span>
                Do you want to save the credit card information for recurring
                payments?
              </span>
            </label>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Cards
            cvc={cvc}
            expiry={expiry}
            name={creditName}
            number={creditNumber}
            focused={focus}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <Button size="md" text="Pay" onClick={processPayment} />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
