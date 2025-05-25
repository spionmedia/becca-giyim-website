import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${props => props.checked 
    ? props.theme.colors.primary 
    : props.theme.colors.background};
  border: 1px solid ${props => props.checked 
    ? props.theme.colors.primary 
    : props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  margin-right: ${props => props.theme.spacing.sm};
  flex-shrink: 0;
  
  ${props => props.disabled && `
    background: ${props.theme.colors.surface};
    cursor: not-allowed;
    opacity: 0.7;
  `}
  
  &:hover {
    border-color: ${props => !props.disabled && props.theme.colors.primary};
  }
  
  &:focus {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  visibility: ${props => props.checked ? 'visible' : 'hidden'};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.primary};
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const HelperText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
  margin-left: 28px;
  display: block;
  color: ${props => props.error 
    ? props.theme.colors.error 
    : props.theme.colors.text.secondary};
`;

const Checkbox = forwardRef(({ 
  label, 
  id, 
  name, 
  checked, 
  onChange, 
  helperText, 
  error,
  disabled = false,
  required = false,
  ...rest 
}, ref) => {
  return (
    <div>
      <CheckboxContainer>
        <HiddenCheckbox
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          ref={ref}
          {...rest}
        />
        <Label htmlFor={id} disabled={disabled}>
          <StyledCheckbox checked={checked} disabled={disabled}>
            <CheckIcon viewBox="0 0 24 24" checked={checked}>
              <polyline points="20 6 9 17 4 12" />
            </CheckIcon>
          </StyledCheckbox>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Label>
      </CheckboxContainer>
      {helperText && (
        <HelperText error={error}>{helperText}</HelperText>
      )}
    </div>
  );
});

export default Checkbox;
