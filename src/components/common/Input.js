import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.md};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const StyledInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.error 
    ? props.theme.colors.error 
    : props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.background};
  transition: all 0.2s ease-in-out;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error 
      ? props.theme.colors.error 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? props.theme.colors.error + '33' 
      : props.theme.colors.primary + '33'};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.disabled};
  }
  
  ${props => props.disabled && css`
    background-color: ${props => props.theme.colors.surface};
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

const HelperText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
  color: ${props => props.error 
    ? props.theme.colors.error 
    : props.theme.colors.text.secondary};
`;

const Input = forwardRef(({ 
  label, 
  id, 
  name, 
  type = 'text', 
  placeholder, 
  helperText, 
  error, 
  fullWidth = false,
  disabled = false,
  required = false,
  ...rest 
}, ref) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Label>
      )}
      <StyledInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        ref={ref}
        required={required}
        {...rest}
      />
      {helperText && (
        <HelperText error={error}>{helperText}</HelperText>
      )}
    </InputWrapper>
  );
});

export default Input;
