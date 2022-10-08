import Header from '../../features/Header';
import AdminForm from './AdminForm';
import BusinessForm from './BusinessForm';

export declare interface ILoginPage {
  type: 'business' | 'admin' | 'login'
}

const LoginPage = ({ type }: ILoginPage): JSX.Element => {
  let content;

  switch (type) {
    case 'business':
      content = (<BusinessForm />);
      break;
    case 'admin':
      content = (<AdminForm />);
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
