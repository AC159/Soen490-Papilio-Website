import { useNavigate } from 'react-router-dom';

import BusinessForm, { IFormData as BusinessFormData } from './BusinessForm';
import MultiStepForm, { Progress, Step } from '../../features/MultiStepForm';

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

const LoginPage = ({ type }: ILoginPage): JSX.Element => {
  const navigate = useNavigate();
  let content: React.ReactNode;
  let onSubmit;

  switch (type) {
    case 'businessLogic':
      content = (<MultiStepForm steps={steps} progress={progress} />);
      break;
    case 'business':
      onSubmit = async (data: BusinessFormData) => {
        await fetch('/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ businessId: data.businessId }),
        }).then(res => {
          if (res.status === 201) {
            navigate('admin', {
              replace: true,
            });
          }
          if (res.status === 400) {
            console.log(res);
          }
        });
      };
      content = (<BusinessForm onSubmit={onSubmit}/>);
      break;
    // case 'admin':
    //   onSubmit = async (data: AdminFormData) => {
    //     const businessId = 1234;
    //     createUserWithEmailAndPassword(auth, data.adminEmail, data.adminPassword)
    //       .then(async (userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         const reqData = {
    //           firebaseId: user.uid,
    //           email: data.adminEmail,
    //           name: data.adminName,
    //           businessId,
    //           root: true, // True only while creating the business
    //         };
    //         await fetch(`/business/${businessId}/user`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(reqData),
    //         }).then(res => {
    //           console.log(res);
    //           navigate('/1234/dashboard', {
    //             replace: true,
    //             relative: 'route',
    //           });
    //         });
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode, errorMessage);
    //       });
    //   };
    //   content = (<AdminForm onSubmit={onSubmit}/>);
    //   break;
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
