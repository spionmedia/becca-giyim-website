import React from 'react';
import styled, { css } from 'styled-components';

// Buton varyantları için stil tanımlamaları
const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}dd;
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary}dd;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}11;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}11;
    }
  `
};

// Buton boyutları için stil tanımlamaları
const buttonSizes = {
  small: css`
    font-size: ${props => props.theme.typography.fontSize.xs};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  `,
  medium: css`
    font-size: ${props => props.theme.typography.fontSize.sm};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  `,
  large: css`
    font-size: ${props => props.theme.typography.fontSize.md};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  `
};

// Temel StyledButton komponenti
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* Varyant stilleri */
  ${props => buttonVariants[props.variant || 'primary']}
  
  /* Boyut stilleri */
  ${props => buttonSizes[props.size || 'medium']}
  
  /* Tam genişlik */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Devre dışı durumu */
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      opacity: 0.6;
    }
  `}
  
  /* Icon ile kullanım için */
  ${props => props.hasIcon && css`
    gap: ${props => props.theme.spacing.xs};
  `}
`;

// Button komponenti
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  ...rest 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      hasIcon={leftIcon || rightIcon}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
    </StyledButton>
  );
};

export default Button;
