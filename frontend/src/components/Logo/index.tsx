export declare type LogoInterface = {
  hasText?: boolean
  size?: 'sm'|'md'|'lg'
}

const Logo = ({hasText=false, size='md'}: LogoInterface) => {
  const className = {
    'sm': 'h-6',
    'md': 'h-10',
    'lg': 'h-14'
  };

  const imgUrl = hasText ? `${process.env.PUBLIC_URL}/logoText.png` : `${process.env.PUBLIC_URL}/logo.png`;

  return <img src={imgUrl} alt="papilio logo" className={className[size]}/>;
};

export default Logo;
