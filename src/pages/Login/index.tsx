import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import BusinessForm, { IFormData as BusinessFormData } from './BusinessForm';
import MultiStepForm, { Progress, Step, IFormData as InfoFormData } from '../../features/MultiStepForm';
import { auth } from '../../firebase';
import { addBusiness, getBusiness } from '../../api/apiLayer';
import { useAuth } from '../../hooks/useEmployee';

export declare interface ILoginPage {
  type: 'business' | 'businessLogic' | 'login'
}

const progress: Progress[] = [
  {
    icon: 'feed',
    text: 'Business profile',
  },
  {
    icon: 'admin_panel_settings',
    text: 'Root account',
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
    caption: "Let's create your business",
    last: true,
  },
];

const LoginPage = ({ type }: ILoginPage): JSX.Element => {
  const { register } = useAuth();
  const navigate = useNavigate();
  let content: React.ReactNode;
  let onSubmit;

  switch (type) {
    case 'businessLogic':
      onSubmit = async (data: InfoFormData) => {
        createUserWithEmailAndPassword(auth, data.adminAccount.adminEmail, data.adminAccount.adminPassword)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            const { businessName, addressLineOne, addressLineTwo, province, ...rest } = data.profile;
            const reqData = {
              business: {
                businessId: data.businessId,
                name: businessName,
              },
              address: {
                mention: businessName,
                lineOne: addressLineOne,
                lineTwo: addressLineTwo,
                state: province,
                ...rest,
              },
              employee: {
                firstName: data.adminAccount.adminName.split(' ')[0],
                lastName: data.adminAccount.adminName.split(' ')[1],
                email: data.adminAccount.adminEmail,
                firebase_id: user.uid,
                role: data.adminAccount.role,
                root: true,
              },
            };
            await addBusiness(reqData).then(res => {
              if (res.status === 400) {
                console.log(res);
              } else {
                register(res);
                navigate(`/${data.businessId}/dashboard`, {
                  replace: true,
                  relative: 'route',
                });
              }
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      };
      content = (<MultiStepForm steps={steps} progress={progress} onSubmit={onSubmit}/>);
      break;
    case 'business':
      onSubmit = async (data: BusinessFormData) => {
        await getBusiness(data.businessId).then(res => {
          if (res.status === 200) {
            navigate('admin', {
              replace: true,
              state: { businessId: data.businessId },
            });
          }
          if (res.status === 400) {
            console.log(res);
          }
        });
      };
      content = (<BusinessForm onSubmit={onSubmit}/>);
      break;
    case 'login':
      content = null;
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 flex justify-center items-center'>
        {content}
      </div>
    </div>
  );
};

export default LoginPage;
