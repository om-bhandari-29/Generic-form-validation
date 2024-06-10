export const FormErrors = {
  passwordMissMatchError: 'Passwords do not match',
  required: 'Required',
  email: 'Enter valid email',
  password: 'Must contain atleast one lower case, uppercase, number and special character',
  minLength: (minLength: number) => `Minimum length required is ${minLength}`
}