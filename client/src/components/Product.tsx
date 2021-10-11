import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allProducts } from '../redux/features/product.reducer';
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

  useEffect(() => {
    dispatch(allProducts());
  }, []);

  return products.map((item: any) => {
    return (
      <Card key={item.id} sx={{ width: 300, margin: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
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
  });
}

export default Products;
