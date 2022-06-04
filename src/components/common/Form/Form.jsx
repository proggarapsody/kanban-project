import React, { useState } from 'react';

const Form = ({ children }) => {
  const [formState, setFormState] = useState({});

  return <form>{children}</form>;
};

export default Form;
