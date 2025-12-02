import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  text-align: center;
`;

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Şifreler eşleşmiyor.');
        }

        if (password.length < 6) {
            return setError('Şifre en az 6 karakter olmalıdır.');
        }

        setError('');
        setLoading(true);

        try {
            await updatePassword(password);
            setSuccess('Şifreniz başarıyla güncellendi!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError('Şifre güncellenemedi: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Yeni Şifre Belirle</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="Yeni Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Yeni Şifre Tekrar"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </Button>
            </Form>
        </Container>
    );
};

export default ResetPassword;
