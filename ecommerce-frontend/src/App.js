import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setMessage('Error fetching products. Please try again later.');
      }
    };

    fetchProducts();
  }, [apiUrl]);

  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && userId) {
        try {
          const response = await fetch(`${apiUrl}/cart/${userId}`);
          if (!response.ok) throw new Error('Failed to fetch cart');
          const data = await response.json();
          setCart(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error fetching cart:', error);
          setMessage('Error fetching cart. Please try again later.');
        }
      }
    };

    fetchCart();
  }, [isAuthenticated, userId, apiUrl]);

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${apiUrl}/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });

      if (!response.ok) throw new Error('Failed to add to cart');
      const updatedCart = await response.json();
      setCart(Array.isArray(updatedCart) ? updatedCart : []);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Error adding to cart. Please try again.');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/cart/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove from cart');
      const updatedCart = await response.json();
      setCart(Array.isArray(updatedCart) ? updatedCart : []);
    } catch (error) {
      console.error('Error removing from cart:', error);
      setMessage('Error removing from cart. Please try again.');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleSignIn = async (username, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Invalid credentials');
        alert(data.message || 'Invalid credentials');
        return;
      }

      const data = await response.json();
      setIsAuthenticated(true);
      setUserId(data.userId);
      setUsername(username);
      console.log('User authenticated:', data);
    } catch (error) {
      console.error('Error during sign-in:', error);
      setMessage('Error during sign-in. Please try again.');
    }
  };

  const handleSignUp = async (username, password) => {
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Sign-up failed. Please try again.');
        return;
      }

      alert('Sign-up successful! Please sign in.');
      setIsSignUp(false);
    } catch (error) {
      console.error('Error during sign-up:', error);
      setMessage('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">E-Commerce App</h1>
        {message && <p className="error-message">{message}</p>}
        {!isAuthenticated ? (
          isSignUp ? (
            <SignUp handleSignUp={handleSignUp} setIsSignUp={setIsSignUp} />
          ) : (
            <SignIn handleSignIn={handleSignIn} setIsSignUp={setIsSignUp} />
          )
        ) : (
          <div className="welcome-msg">Welcome, {username}!</div>
        )}
      </header>

      {isAuthenticated ? (
        <>
          <ProductList products={products} addToCart={addToCart} />
          <Cart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
        </>
      ) : (
        <div>Please sign in or sign up to access the products and your cart.</div>
      )}
    </div>
  );
}

export default App;
