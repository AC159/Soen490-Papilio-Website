import classNames from 'classnames';
import Button from '../../components/Button';
import { IconNames } from '../../components/Icon';

export declare interface ISearchBar {
  placeholder: string
  size?: 'sm' | 'md' | 'lg'
  margin?: 'right' | 'left'
  onClick: () => void
}

const SearchBar = ({ placeholder, size = 'md', margin, onClick }: ISearchBar): JSX.Element => {
  const inputStyle = classNames(
    'w-full p-2 focus:outline-none border border-gray-300 pr-9 rounded-sm',
    {
      'pt-1 pb-1': size === 'sm',
      'pt-1.5 pb-1.5': size === 'md',
      'pl-3 pt-2 pb-2': size === 'lg',

    }
  );

  const style = classNames('relative', {
    'mr-2': margin === 'right',
    'ml-2': margin === 'left',
  });

  return (
    <div className={style}>
      <span className='absolute top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2'>
        <Button
          hasText={false}
          onClick={onClick}
          hasIcon={true}
          icon={IconNames.SEARCH}
          variant='ghost'
        />
      </span>
      <input
        placeholder={placeholder}
        className={inputStyle}
      />
    </div>
  );
};

export default SearchBar;
