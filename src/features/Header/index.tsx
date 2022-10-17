import Button from '../../components/Button';

const Header = (): JSX.Element => {
  return (
    <div className='flex flex-row justify-end items-center gap-1'>
      <span className='hover:border-b-2 border-brand-orange cursor-pointer box-border'>Features</span>
      <span>Pricing</span>
      <span>Blog</span>
      <Button
        text='Login'
        onClick={() => {}}
        variant='outline'
        margin='left'
      />
      <Button
        text='Getting start'
        onClick={() => {}}
        margin='left'
      />
    </div>
  );
};

export default Header;
