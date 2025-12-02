import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;



const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  margin-top: 10px;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Giriş yapılamadı: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage('');
      }, 3000);
    } catch (err) {
      setError('Şifre sıfırlama başarısız: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {!showForgotPassword ? (
        <>
          <Title>Giriş Yap</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="E-posta Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
            <ForgotPasswordLink onClick={() => setShowForgotPassword(true)}>
              Şifremi Unuttum
            </ForgotPasswordLink>
          </Form>
          <LinkText>
            Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
          </LinkText>
        </>
      ) : (
        <>
          <BackButton onClick={() => setShowForgotPassword(false)}>
            ← Geri Dön
          </BackButton>
          <Title>Şifre Sıfırlama</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {resetMessage && <SuccessMessage>{resetMessage}</SuccessMessage>}
          <Form onSubmit={handlePasswordReset}>
            <Input
              type="email"
              placeholder="E-posta Adresi"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Login;
