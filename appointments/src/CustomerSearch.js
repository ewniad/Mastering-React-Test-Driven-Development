import React, { useEffect, useState, useCallback } from 'react';

/*
const SearchButtons = ({ handleNext, handlePrevious }) => (
  <div className="button-bar">
    <button
      role="button"
      id="previous-page"
      onClick={handlePrevious}>
      Previous
    </button>
    <button role="button" id="next-page" onClick={handleNext}>
      Next
    </button>
  </div>
);
*/
const SearchButtons = ({handleNext}) => (
  <div className="button-bar">
    <button role="button" id="next-page" onClick={handleNext}>
      Next
    </button>
  </div>
);


const CustomerRow = ({ customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td />
  </tr>
);

export const CustomerSearch = () => {
  const [customers, setCustomers] = useState([]);

  const handleNext = useCallback(() => {
    const after = customers[customers.length - 1].id;
    const url = `/customers?after=${after}`;
    window.fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    });
    //const queryString = `?after=${after}`;
    //setQueryStrings([...queryStrings, queryString]);
  //}, [customers, queryStrings]);
  }, [customers]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.fetch('/customers', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      });
      setCustomers(await result.json());
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <SearchButtons handleNext={handleNext} />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <CustomerRow customer={customer} key={customer.id} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
/*
 return (
    <React.Fragment>
      <SearchButtons
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <CustomerRow customer={customer} key={customer.id} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
  */

