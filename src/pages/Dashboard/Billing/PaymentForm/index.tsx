import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import Button from '../../../../components/Button';
import { useLocation } from 'react-router-dom';

type Focused = 'name' | 'number' | 'expiry' | 'cvc';

const PaymentForm: React.FC = (): JSX.Element => {
  const [creditNumber, setCreditNumber] = useState('');
  const [creditName, setCreditName] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState<Focused | undefined>();
  const [saveCreditCardInfo, setSaveCreditCardInfo] = useState(false); // new state for saving credit card info
  const location = useLocation();
  const packageInfo = {
    packageName: (location?.search.includes('package=') ? new URLSearchParams(location.search).get('package') : '') ?? '',
    cost: (location?.search.includes('cost=') ? new URLSearchParams(location.search).get('cost') : '') ?? '',
  };

  const timeOfpayment = new Date();
  const processPayment = async (): Promise<void> => {
    const paymentData = {
      creditNumber,
      creditName,
      cvc,
      expiry,
      saveCreditCardInfo,
      packageInfo,
      timeOfpayment,
    };

    // replace this with your own API call or method for sending the payment data to your backend
    fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async response => await response.json())
      .then(data => {
        console.log('Payment successful:', data);
      })
      .catch(error => {
        console.error('Error processing payment:', error);
      });
  };
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Payment Information </h2>
          <div className="mb-2">
            <span className="text-gray-700">Package Name:</span>{' '}
            <span className="font-bold">{packageInfo.packageName}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700">Cost:</span>{' '}
            <span className="font-bold">{packageInfo.cost}</span>
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
                <TextField
                  label="CVC"
                  variant="outlined"
                  className="w-full"
                />
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
            <label htmlFor="save-credit-card-info" className="flex items-center space-x-2">
              <input type="checkbox" id="save-credit-card-info" checked={saveCreditCardInfo} onChange={() => setSaveCreditCardInfo(!saveCreditCardInfo)} className="form-checkbox" />
              <span>Do you want to save the credit card information for recurring payments?</span>
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
          <Button
            size="md"
            text="Pay"
            onClick={processPayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
