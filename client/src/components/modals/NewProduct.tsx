import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, allProducts } from '../../redux/features/product.reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const useStyles = makeStyles((theme: any) => {
  return {
    form: {
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

function NewProduct() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    dispatch(addProduct({ name, price }));
    handleClose();
  };

  return (
    <div>
      <AddCircleOutlineIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>Новый товар</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="filled-basic"
            label="Введите название товара"
            variant="filled"
            size="small"
          />
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            id="filled-basic"
            label="Введите цену товара"
            size="small"
            variant="filled"
          />
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={handleAddProduct} variant="outlined" color="inherit">
            Добавить
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewProduct;
