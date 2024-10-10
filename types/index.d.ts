import { ReactNode } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ButtonType {
  SUBMIT: "Submit";
  RESET: "Reset";
}

interface FormControl {
  componentType:
    | "INPUT"
    | "FILE"
    | "TEXTAREA"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"; // Supported component types

  name: string; // Name of the form control
  type?: string;
  label?: string; // Optional label for controls
  placeholder?: string; // Placeholder text (for inputs)
  disabled?: boolean; // Whether the input is disabled
  value?: string; // Initial value for the input
  required?: boolean;
  options?: SelectOption[]; // For select, radio, checkbox
}

interface CommonFormProps {
  formControls: FormControl[];
  schema: ZodType<T>;
  formData?: { [key: string]: any }; // Object for form field values
  submitButton?: ReactNode;
  resetButton?: ReactNode;
  btnClassNames?: string;
  btnText?: string;
  btnType?: "SUBMIT" | "RESET";
  isButtonLoading?: boolean;
  isDisabled: boolean;

  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // File input change handler
  onSubmit: (data: T) => void | Promise<void>;
  setFormData?: (data: { [key: string]: any }) => void; // Function to update form data
}

interface CreateProfile {
  name: string;
  role: string;
  userAuthId: string;
  email: string;
}

interface CreateCourse {
  instructor: string;
  instructorAuthId: string;
  title: string;
  welcomeMessage: string;
  description: string;
  category: string;
  pricing: number;
  courseThumbnailFile: File | null;
}
