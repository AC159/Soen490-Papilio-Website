import '../Header/index.css';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import BasicMenu from '../../components/BasicMenu';
import { useNavigate } from 'react-router-dom';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const onClick = (path: string): void => {
    navigate(path, {
      replace: true,
    });
  };
  return (
    <header className='static'>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Logo size='lg' hasText/>
      </div>
      <div>
        <BasicMenu/>
        <ul className='flex item-center space-x-10 hidden md:flex'>
          <li className='headerLink' onClick={() => { onClick('/'); }}>Features</li>
          <li className='headerLink' onClick={() => { onClick('/'); }}>Blog</li>
          <li className='headerLink' onClick={() => { onClick('/'); }}>Pricing</li>
          <div className='flex item-center space-x-3'>
            <li>
              <Button
                text='Login'
                variant='outline-dark'
                onClick={() => { onClick('/login'); }}
                margin='left'
              />
            </li>
            <li>
              <Button
                text='Get Started'
                onClick={() => { onClick('/signup'); }}
                margin='left'
              />
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
