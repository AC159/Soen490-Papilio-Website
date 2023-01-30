import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onClick = (path: string): void => {
    navigate(path, {
      replace: true,
    });
  };

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-[#053f5c]"
      >
        <div className="space-y-2">
          <div className="w-8 h-0.5 bg-[#053f5c]"></div>
          <div className="w-8 h-0.5 bg-[#053f5c]"></div>
          <div className="w-8 h-0.5 bg-[#053f5c]"></div>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => { onClick('/'); }}>Features</MenuItem>
        <MenuItem onClick={() => { onClick('/'); }}>Blog</MenuItem>
        <MenuItem onClick={() => { onClick('/'); }}>Pricing</MenuItem>
        <MenuItem onClick={() => { onClick('/login'); }}>Login</MenuItem>
        <MenuItem onClick={() => { onClick('/signup'); }}>Get Started</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
