import {useState} from 'react'
import {useQuery} from 'react-query';
import Item from './Item/Item';
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import GridList from 'material-ui/GridList';
import ActionAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Badge from '@mui/material/Badge';
import {Wrapper, StyledButton} from './App.styles';
import { AddShoppingCart } from '@mui/icons-material';
  

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
 }

const getProducts = async () => 
  await (await fetch('https://fakestoreapi.com/products')).json();



const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => {
    
  };

  const handleartItem = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} >
          <AddShoppingCart />
        </Badge>
      </StyledButton>
           <Grid container spacing={3}>
            {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleartItem}/>
                </Grid>
            ))}
           </Grid>


    </Wrapper>
  )
};

export default App;