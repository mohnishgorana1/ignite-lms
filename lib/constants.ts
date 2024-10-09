import { FormControl } from "@/types/index";

export const onboardFormControls: FormControl[] = [
  {
    componentType: "SELECT",
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select your Role",
    options: [
      { label: "Student", value: "STUDENT" },
      { label: "Instructor", value: "INSTRUCTOR" },
    ],
    required: true,
  },
  {
    componentType: "INPUT",
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
    required: true,
  },
];

export const initialOnboardFormData = {
  role: "STUDENT",
  name: "",
};
