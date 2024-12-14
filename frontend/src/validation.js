import * as Yup from "yup";


export const registerValidationSchema=Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    address:Yup.string().required('Address is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    // role:Yup.string().oneOf(["Seller", "Buyer"], "invalid option").required("Select a role")
    role:Yup.string(),

})

export const loginValidationSchema=Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
   
})


export const vegetableValidationSchema=Yup.object({
  name: Yup.string().required('Name is required'),
  pricePerKg: Yup.number().required('Price per kg is required').positive(),
  availableQuantity: Yup.number().required('Quantity is required').min(1),
  price: Yup.number(),
  nutrients: Yup.string().required('Nutrients are required'),
  producedLocation: Yup.string().required('Produced location is required'),

})

export const jobValidationSchema=Yup.object({
  

})



const supportedFormats = ['image/png', 'image/jpeg', 'image/webp'];
export const applicatioFormSchema=Yup.object({
    name:Yup.string().required("name is required"),
    address:Yup.string().required("address is required"),
    phone:Yup.string().required("phone is required"),
    cv:Yup.mixed().required('CV is required').test('fileFormat', 'Unsupported file format', value => {
      if (!value) return true; // No file uploaded is valid
      return supportedFormats.includes(value.type);
    })
    .test('fileSize', 'File size too large', value => {
      if (!value) return true; // No file uploaded is valid
      return value.size <= 10485760; // 10MB in bytes
    }),
    

})