import classNames from "classnames";

export declare interface ContainerInterface {
  children: React.ReactNode;
  border?: 'all'|'left'|'right'|'bottom'|'top'|'none';
  paddingClass?: string
}

const borderStyle: {
  all: string, 
  left: string,
  right: string,
  bottom: string,
  top: string,
  none: string
} = {
  'all': 'border-2', 
  'left': 'border-l-2',
  'right': 'border-r-2',
  'bottom': 'border-b-2',
  'top': 'border-t-2',
  'none': 'border-0'
};

const Container = ({children, paddingClass="", border='none'}: ContainerInterface) => {
  const divStyle = classNames(
    paddingClass,
    'box-border flex flex-row justify-between',
    borderStyle[border]
  );

  return (
    <div className={divStyle}>
      {children}
    </div>
  );
};

export default Container;
