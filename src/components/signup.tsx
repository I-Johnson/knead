import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  overflow-x: hidden;

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

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
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

const GoogleButton = styled(Button)`
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

const TermsText = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.8rem;
  margin-top: 1.5rem;
`;

const FeaturesWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
  border-left: 1px solid #e9ecef;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 500px;
  margin: 0 auto;
`;

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
  margin-bottom: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 1.8rem;
  color: #646cff;
  padding: 1rem;
  background: rgba(100, 108, 255, 0.1);
  border-radius: 8px;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  h3 {
    color: #333;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    color: #666;
    margin: 0;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const SignUpForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData; 
    if (!username || !email || !password) {
      setError('Please fill out all fields');
      return false;
    }
    setError('');
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post('http://localhost:5100/api/signup', formData);
      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormCard>
          {success && <SuccessMessage>Account created successfully. Redirecting to login...</SuccessMessage>}
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
              <img
                src="/assets/kneadlogo.jpeg"
                alt="Company Logo"
                style={{ maxWidth: '150px', height: 'auto', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
              />
            </div>

            <Title>Sign up Knead</Title>
            <Subtitle>We just need a few details to get you started.</Subtitle>

            <InputGroup>
              <Label>Username</Label>
              <Input type="text" name="username" placeholder="Oppenheimer" onChange={handleChange} />
            </InputGroup>

            <InputGroup>
              <Label>Email</Label>
              <Input type="email" name="email" placeholder="build@nukes.com" onChange={handleChange} />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
            </InputGroup>

            <Button type="submit">Sign up</Button>
          </form>

          <Divider>Or</Divider>

          <GoogleButton>
            <FcGoogle style={{ fontSize: '1.2rem' }} />
            Continue with Google
          </GoogleButton>

          <TermsText>
            By signing up you agree to our Terms of Service and Privacy Policy
          </TermsText>
        </FormCard>
      </FormWrapper>

      <FeaturesWrapper>
        <FeatureList>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: '#333', fontWeight: 600, lineHeight: 1.2 }}>
            Transform Trades with Knead
          </h2>

          <FeatureItem>
            <FeatureIcon>
              <FaRocket />
            </FeatureIcon>
            <FeatureText>
              <h3>Automate Your Trading Strategy</h3>
              <p>Get started in minutes with our intuitive platform and pre-built templates.</p>
            </FeatureText>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureText>
              <h3>Bank-Level Security</h3>
              <p>Your data is protected with AES-256 encryption and 2FA support.</p>
            </FeatureText>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FaChartLine />
            </FeatureIcon>
            <FeatureText>
              <h3>Smart Insights</h3>
              <p>Real-time analytics and custom reports to optimize your workflow.</p>
            </FeatureText>
          </FeatureItem>
        </FeatureList>
      </FeaturesWrapper>
    </Container>
  );
};

export default SignUpForm;