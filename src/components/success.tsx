// import React from 'react';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const SuccessMessage = styled.div`
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  font-size: 1rem;
`;

const Success = () => {
  return (
    <SuccessContainer>
      <SuccessMessage>
        <Title>Success!</Title>
        <img
          src="/assets/cover.jpeg"
          alt="Success Image"
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            marginBottom: '1rem'
          }}
        />
        <Message>You have successfully logged in.</Message>
      </SuccessMessage>
    </SuccessContainer>
  );
};

export default Success;
