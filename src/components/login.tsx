// src/components/LoginForm.tsx
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #646cff;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-left: 0.6rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #535bf2;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #666;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const AdditionalLinks = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #646cff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// LoginForm component
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5100/api/login', formData);
      console.log(response.data);
      setError('');
      navigate('/success');
      
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormCard>
          <Title>Login</Title>
          {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Password</Label>
              <Input type="password" name="password" onChange={handleChange} />
            </InputGroup>
            <Button type="submit">Login</Button>
          </form>
          <Divider>Or</Divider>
          <GoogleButton>
            <FcGoogle style={{ fontSize: '1.2rem' }} />
            Continue with Google
          </GoogleButton>
          <AdditionalLinks>
            <a href="/forgot-password">Forgot Password?</a>
          </AdditionalLinks>
        </FormCard>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;