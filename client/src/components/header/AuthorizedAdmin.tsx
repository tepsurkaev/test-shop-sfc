import React from 'react';
import headerModule from '../../styles/header.module.css';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import { unLogin } from '../../redux/features/user.reducer';
import { useDispatch } from 'react-redux';

function AuthorizedAdmin() {
  const dispatch = useDispatch();

  return (
    <header className={headerModule.header}>
      <div className={headerModule.title}>Шапка сайта</div>
      <div className={headerModule.adminItems}>
        <p>Админ</p>
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

export default AuthorizedAdmin;
