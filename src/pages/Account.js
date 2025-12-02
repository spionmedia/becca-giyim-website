import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const Section = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const Account = () => {
    const { user, profile, updateProfile, deleteAccount, signOut } = useAuth();
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
        }
    }, [profile]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile({ id: user.id, full_name: fullName });
            alert('Profil güncellendi!');
        } catch (error) {
            alert('Hata: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
            try {
                await deleteAccount();
                await signOut();
                navigate('/');
            } catch (error) {
                alert('Hata: ' + error.message);
            }
        }
    };

    if (!user) return <div>Lütfen giriş yapınız.</div>;

    return (
        <Container>
            <Title>Hesabım</Title>

            <Section>
                <SectionTitle>Profil Bilgileri</SectionTitle>
                <Form onSubmit={handleUpdateProfile}>
                    <Input
                        type="email"
                        value={user.email}
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                    />
                    <Input
                        type="text"
                        placeholder="Ad Soyad"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
                    </Button>
                </Form>
            </Section>

            <Section>
                <SectionTitle>Hesap İşlemleri</SectionTitle>
                <p style={{ marginBottom: '15px', color: '#666' }}>
                    Hesabınızı silerseniz tüm verileriniz kalıcı olarak silinecektir.
                </p>
                <DeleteButton onClick={handleDeleteAccount}>
                    Hesabı Sil
                </DeleteButton>
            </Section>
        </Container>
    );
};

export default Account;
