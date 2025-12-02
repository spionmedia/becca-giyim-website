-- Admin kullanıcıları için RLS politikaları

-- Önce profiles tablosuna is_admin kolonu ekleyelim (eğer yoksa)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Admin kullanıcıları için orders tablosunda güncelleme yetkisi
CREATE POLICY "Admins can update all orders"
ON orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = TRUE
  )
);

-- Admin kullanıcıları için orders tablosunda tüm siparişleri görme yetkisi
CREATE POLICY "Admins can view all orders"
ON orders
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = TRUE
  )
  OR user_id = auth.uid()
);

-- Kullanıcılar sadece kendi siparişlerini görebilir (mevcut politika varsa güncelle)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders"
ON orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Telefon numarası için profiles tablosunu güncelle
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Profiles tablosu için RLS politikaları
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi profillerini görebilir
CREATE POLICY IF NOT EXISTS "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Kullanıcılar kendi profillerini güncelleyebilir
CREATE POLICY IF NOT EXISTS "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Kullanıcılar kendi profillerini oluşturabilir
CREATE POLICY IF NOT EXISTS "Users can insert own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Admin kontrolü için fonksiyon
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
