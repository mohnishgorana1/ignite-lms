import { CommonFormProps, FormControl } from "@/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiLoader } from "react-icons/fi";

interface FormErrors {
  [key: string]: string;
}

function CommonForm({
  formControls,
  schema,
  formData,
  setFormData,
  isButtonLoading,
  handleFileChange,
  btnClassNames,
  btnText,
  resetButton,
  submitButton,
  onSubmit,
  btnType,
  isDisabled,
}: CommonFormProps) {
  const [formErrors, setFormErrors] = useState<string[]>([]); // To store Zod validation errors

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // zod validations
    const result = schema.safeParse(formData);
    if (!result.success) {
      // collect validation errors
      const errors: FormErrors = {};

      result.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        errors[fieldName] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    // Clear previous errors
    setFormErrors({});

    // Continue with form submission if valid
    onSubmit(formData);
  };

  const renderControlByComponentType = (getCurrentControl: FormControl) => {
    let content = null;

    const fieldError = formErrors[getCurrentControl.name];

    switch (getCurrentControl.componentType) {
      case "INPUT":
        content = (
          <div
            key={getCurrentControl.name}
            className="grid grid-cols-3 md:grid-cols-12 w-full items-center justify-between mt-8"
          >
            <Label className="col-span-1 md:col-span-3 text-sm sm:text-lg md:text-xl text-start ">
              {getCurrentControl.label}
            </Label>

            <Input
              type={getCurrentControl.type}
              min={getCurrentControl.type === "number" ? "0" : undefined}
              required={getCurrentControl?.required}
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData?.[getCurrentControl.name] || ""}
              onChange={(event) => {
                const { name, value, type } = event.target;
                let newValue: any = value;
                if (type === "number") {
                  newValue = value === "" ? "" : Number(value);
                }
                setFormData({
                  ...formData,
                  [name]: newValue,
                });
              }}
              className="col-span-2 md:col-span-9 min-w-full rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border 
                                      bg-[#101213] text-xs md:text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#333637]  focus:drop-shadow-lg focus-visible:outline-none 
                                      focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;

      case "FILE":
        content = (
          <Label
            key={getCurrentControl.name}
            htmlFor={getCurrentControl.name}
            className="flex bg-[#101213] items-center px-3 py-3 mx-auto mt-6 text-center
                             border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
            />
          </Label>
        );
        break;

      case "SELECT":
        content = (
          <div
            className="grid grid-cols-3 md:grid-cols-12 w-full items-center justify-between mt-8"
            key={getCurrentControl.name}
          >
            <Label className="col-span-1 md:col-span-3 text-sm sm:text-lg md:text-xl  text-start">
              {getCurrentControl.label}
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData &&
                setFormData({
                  ...formData,
                  [getCurrentControl.name]: value,
                })
              }
              value={formData?.[getCurrentControl.name] || ""}
            >
              <SelectTrigger
                className="col-span-2 md:col-span-9 min-w-full rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border 
                            bg-[#101213] text-xm md:text-lg outline-none drop-shadow-sm 
                            transition-all duration-200 ease-in-out 
                            focus:bg-[#333637] focus:drop-shadow-lg focus-visible:outline-none 
                            focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder={getCurrentControl.placeholder} />
              </SelectTrigger>
              <SelectContent className="z-30 bg-[#e4e5e6] text-black">
                <SelectGroup>
                  {getCurrentControl.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-[#151616] hover:text-white font-semibold"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
        break;

      default:
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurrentControl.name}
          >
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full dark:bg-black rounded-md h-[60px] px-4 border bg-[#101213] text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#333637] focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;
    }

    return content;
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full flex flex-col sm:justify-between"
    >
      {formControls.map((control) => renderControlByComponentType(control))}

      <section className="mt-12 w-full">
        {btnType === "SUBMIT" && (
          <Button
            disabled={isDisabled}
            type={btnType || "submit"}
            className={`${
              isDisabled && "opacity-50 cursor-not-allowed"
            } w-full bg-white text-black font-bold hover:bg-[#d7d7de]`}
          >
            {isButtonLoading ? <FiLoader className="animate-spin" /> : btnText}
          </Button>
        )}
      </section>

      {/* Render any validation errors */}
      {/* Render any validation errors */}
      {Object.keys(formErrors).length > 0 && (
        <ul className="text-red-500 mt-4">
          {Object.values(formErrors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default CommonForm;
