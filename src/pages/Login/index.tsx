import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';
// import axios from 'axios';

import AdminForm, { IFormData as AdminFormData } from './AdminForm';
import BusinessForm, { IFormData as BusinessFormData } from './BusinessForm';

export declare interface ILoginPage {
  type: 'business' | 'admin' | 'login'
}

const LoginPage = ({ type }: ILoginPage): JSX.Element => {
  const navigate = useNavigate();
  let content: React.ReactNode;
  let onSubmit;

  switch (type) {
    case 'business':
      onSubmit = (data: BusinessFormData) => {
        console.log(data);
        navigate('admin', {
          replace: true,
        });
      };
      content = (<BusinessForm onSubmit={onSubmit}/>);
      break;
    case 'admin':
      onSubmit = (data: AdminFormData) => {
        // if (data.adminEmail === 'jeffB@myAmazingBillionDollarCompanie.com') { // TODO: REMOVE THIS IF STATEMENT
        //   createUserWithEmailAndPassword(auth, data.adminEmail, data.adminPassword)
        //     .then((userCredential) => {
        //       // Signed in
        //       const user = userCredential.user;
        //       console.log(user);
        //       // TODO: SAVE USER CREDENTIALS TO MEMORY
        //       // ...
        //     })
        //     .catch((error) => {
        //       const errorCode = error.code;
        //       const errorMessage = error.message;
        //       console.log(errorCode, errorMessage);
        //     });
        // }
        console.log(data);
        navigate('/1234/dashboard', {
          replace: true,
          relative: 'route',
        });
      };
      content = (<AdminForm onSubmit={onSubmit}/>);
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
