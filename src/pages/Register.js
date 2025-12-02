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

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const numericPhone = phone.replace(/\D/g, '');

        if (numericPhone.length < 10) {
            return setError('Lütfen geçerli bir telefon numarası giriniz.');
        }

        if (password !== confirmPassword) {
            return setError('Şifreler eşleşmiyor.');
        }

        if (password.length < 6) {
            return setError('Şifre en az 6 karakter olmalıdır.');
        }

        setError('');
        setLoading(true);
        try {
            await signUp(email, password, { full_name: fullName, phone: numericPhone });
            // Supabase default is email confirmation, but we can redirect or show message
            alert('Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.');
            navigate('/login');
        } catch (err) {
            setError('Kayıt oluşturulamadı: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Kayıt Ol</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Ad Soyad"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <Input
                    type="tel"
                    placeholder="Telefon Numarası"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
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
                <Input
                    type="password"
                    placeholder="Şifre Tekrar"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                </Button>
            </Form>
            <LinkText>
                Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
            </LinkText>
        </Container>
    );
};

export default Register;
