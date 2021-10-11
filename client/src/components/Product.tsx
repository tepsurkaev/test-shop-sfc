import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allProducts, deleteProduct } from '../redux/features/product.reducer';
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    dispatch(allProducts());
  }, []);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return products.map((item: any) => {
    if (role === 'user') {
      return (
        <Card key={item.id} sx={{ width: 300, margin: 5 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 22 }}
              color="text.secondary"
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Цена: ${item.price}₽`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">В корзину</Button>
          </CardActions>
        </Card>
      );
    } else if (role === 'admin') {
      return (
        <Card key={item.id} sx={{ width: 300, margin: 5 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 22 }}
              color="text.secondary"
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Цена: ${item.price}₽`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Изменить</Button>
            <Button onClick={() => handleDeleteProduct(item.id)} color="warning" size="small">
              Удалить
            </Button>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Card key={item.id} sx={{ width: 300, margin: 5 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 22 }}
              color="text.secondary"
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Цена: ${item.price}₽`}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  });
}

export default Products;
