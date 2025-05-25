import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const SelectWrapper = styled.div`
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

const StyledSelect = styled.select`
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${props => props.theme.spacing.md} center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error 
      ? props.theme.colors.error 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? props.theme.colors.error + '33' 
      : props.theme.colors.primary + '33'};
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

const Select = forwardRef(({ 
  label, 
  id, 
  name, 
  options = [], 
  placeholder, 
  helperText, 
  error, 
  fullWidth = false,
  disabled = false,
  required = false,
  ...rest 
}, ref) => {
  return (
    <SelectWrapper fullWidth={fullWidth}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Label>
      )}
      <StyledSelect
        id={id}
        name={name}
        disabled={disabled}
        error={error}
        ref={ref}
        required={required}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {helperText && (
        <HelperText error={error}>{helperText}</HelperText>
      )}
    </SelectWrapper>
  );
});

export default Select;
