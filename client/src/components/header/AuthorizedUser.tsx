import React from 'react';
import headerModule from '../../styles/header.module.css';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { unLogin } from '../../redux/features/user.reducer';
import { useDispatch } from 'react-redux';

function AuthorizedUser() {
  const dispatch = useDispatch();

  return (
    <header className={headerModule.header}>
      <div className={headerModule.title}>Шапка сайта</div>
      <div className={headerModule.userItems}>
        <ShoppingCartIcon className={headerModule.cardIcon} />
        <div className={headerModule.personIcon}>
          <PersonIcon fontSize="large" />
        </div>
        <Button
          onClick={() => dispatch(unLogin())}
          variant="outlined"
          color="warning"
        >
          Выйти
        </Button>
      </div>
    </header>
  );
}

export default AuthorizedUser;
