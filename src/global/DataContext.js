import React from 'react';

const DataContext = React.createContext({});

const DataProvider = ({children}) => {
    const [data, setData] = React.useState([]);
  const [cartData, setCartData] = React.useState([]);
  const [added, setAdded] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <DataContext.Provider
      value={{
        data, setData,
        cartData,
        setCartData,
        added,
        setAdded,
        count,
        setCount,
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
