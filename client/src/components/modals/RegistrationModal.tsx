import React, { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { registration, login } from '../../redux/features/user.reducer';

const useStyles = makeStyles((theme: any) => {
  return {
    form: {
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    registrationTitle: {
      textAlign: 'center',
    },
  };
});

function RegistrationModal() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(
    useSelector((state) => state.user.isRegistered)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegistration = () => {
    dispatch(registration({ email, password }));
    handleClose();
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
    handleClose();
  };

  if (!isRegistered) {
    return (
      <div>
        <PersonIcon fontSize="large" onClick={handleClickOpen} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.registrationTitle}>
            Регистрация
          </DialogTitle>
          <DialogContent className={classes.form}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="filled-basic"
              label="Введите почту"
              variant="filled"
              size="small"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="filled-basic"
              label="Введите пароль"
              size="small"
              variant="filled"
            />
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => isRegistered(setIsRegistered(true))}
            >
              У меня уже есть аккаунт
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Отмена
            </Button>
            <Button
              onClick={handleRegistration}
              variant="outlined"
              color="inherit"
            >
              Зарегистрироватся
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <PersonIcon fontSize="large" onClick={handleClickOpen} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.registrationTitle}>
            Авторизация
          </DialogTitle>
          <DialogContent className={classes.form}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="filled-basic"
              label="Введите почту"
              variant="filled"
              size="small"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="filled-basic"
              label="Введите пароль"
              size="small"
              variant="filled"
            />
            <Button
              onClick={() => isRegistered(setIsRegistered(false))}
              variant="outlined"
              color="inherit"
            >
              Зарегистрироватся
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleLogin} variant="outlined" color="inherit">
              Войти
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RegistrationModal;
