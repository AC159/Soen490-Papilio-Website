import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../../features/Header';
import AdminForm, { IFormData as AdminFormData } from './AdminForm';
import BusinessForm, { IFormData as BusinessFormData } from './BusinessForm';
import { auth } from '../../firebase';

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
        if (data.adminEmail === 'jeffB@myAmazingBillionDollarCompanie.com') {
          createUserWithEmailAndPassword(auth, data.adminEmail, data.adminPassword)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        }
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
      <Header />
      <div className='flex-1 flex justify-center items-center'>
        {content}
      </div>
    </div>
  );
};

export default LoginPage;
