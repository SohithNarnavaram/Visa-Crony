/**
 * Simple input sanitization utilities
 * These functions help prevent potential XSS and injection attacks
 */

/**
 * Sanitizes text input by removing potentially dangerous characters
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeTextInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim(); // Remove leading/trailing whitespace
}

/**
 * Sanitizes email input
 * @param email - The email string to sanitize
 * @returns Sanitized email
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Sanitizes phone number input
 * @param phone - The phone string to sanitize
 * @returns Sanitized phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  return phone
    .replace(/[^0-9+\-\s()]/g, '') // Keep only numbers, +, -, spaces, and parentheses
    .trim();
}

/**
 * Sanitizes address input
 * @param address - The address string to sanitize
 * @returns Sanitized address
 */
export function sanitizeAddress(address: string): string {
  if (!address) return '';
  
  return address
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}
