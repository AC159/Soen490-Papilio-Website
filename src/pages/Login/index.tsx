import Header from '../../features/Header';
import AdminForm from './AdminForm';
import BusinessForm from './BusinessForm';

export declare interface ILoginPage {
  type: 'business' | 'admin' | 'login'
}

const LoginPage = ({ type }: ILoginPage): JSX.Element => {
  let content: React.ReactNode;

  switch (type) {
    case 'business':
      content = (<BusinessForm onSubmit={() => {}}/>);
      break;
    case 'admin':
      content = (<AdminForm onSubmit={() => {}}/>);
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
