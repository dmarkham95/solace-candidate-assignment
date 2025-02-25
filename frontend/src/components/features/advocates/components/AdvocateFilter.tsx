import { useState, useRef, forwardRef } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import { FormItem, FormContainer } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import { Field, Form, Formik, FormikProps, FieldProps } from "formik";
import type { MouseEvent } from "react";
import Select from "@/components/ui/Select";

type FormModel = {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  degree?: string;
  minYearsOfExperience?: number;
  maxYearsOfExperience?: number;
};

type AdvocateFilterFormProps = {
  onSubmitComplete?: (values: FormModel) => void;
  filterData: FormModel;
};

type DrawerFooterProps = {
  onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onCancel: (event: MouseEvent<HTMLButtonElement>) => void;
};

const degrees = [
  { value: "MD", label: "MD" },
  { value: "PhD", label: "PhD" },
  { value: "MSW", label: "MSW" },
];

const AdvocateFilterForm = forwardRef<
  FormikProps<FormModel>,
  AdvocateFilterFormProps
>(({ onSubmitComplete, filterData }, ref) => {
  const handleSubmit = (values: FormModel) => {
    onSubmitComplete?.(values);
  };

  return (
    <Formik
      enableReinitialize
      innerRef={ref}
      initialValues={filterData}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem
              invalid={errors.firstName && touched.firstName}
              errorMessage={errors.firstName}
            >
              <h6 className="mb-4">First Name</h6>
              <Field
                type="text"
                autoComplete="off"
                name="firstName"
                placeholder="First Name"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              invalid={errors.lastName && touched.lastName}
              errorMessage={errors.lastName}
            >
              <h6 className="mb-4">Last Name</h6>
              <Field
                type="text"
                autoComplete="off"
                name="lastName"
                placeholder="Last Name"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              invalid={errors.city && touched.city}
              errorMessage={errors.city}
            >
              <h6 className="mb-4">City</h6>
              <Field
                type="text"
                autoComplete="off"
                name="city"
                placeholder="City"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              invalid={errors.state && touched.state}
              errorMessage={errors.state}
            >
              <h6 className="mb-4">State</h6>
              <Field
                type="text"
                autoComplete="off"
                name="state"
                placeholder="State"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              asterisk
              label="Degree"
              invalid={(errors.degree && touched.degree) as boolean}
              errorMessage={errors.degree}
            >
              <Field name="degree">
                {({ field, form }: FieldProps) => (
                  <Select
                    className="min-w-[120px]"
                    field={field}
                    form={form}
                    options={degrees}
                    value={degrees.filter((c) => c.value === field.value)}
                    onChange={(option) => {
                      form.setFieldValue(field.name, option?.value);
                    }}
                    isClearable={true}
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              invalid={
                errors.minYearsOfExperience && touched.minYearsOfExperience
              }
              errorMessage={errors.minYearsOfExperience}
            >
              <h6 className="mb-4">Min Years Of Experience</h6>
              <Field
                type="number"
                autoComplete="off"
                name="minYearsOfExperience"
                placeholder="Min Years Of Experience"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              invalid={
                errors.maxYearsOfExperience && touched.maxYearsOfExperience
              }
              errorMessage={errors.maxYearsOfExperience}
            >
              <h6 className="mb-4">Max Years Of Experience</h6>
              <Field
                type="number"
                autoComplete="off"
                name="maxYearsOfExperience"
                placeholder="Max Years Of Experience"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Query
      </Button>
    </div>
  );
};

const AdvocateFilter = (props: AdvocateFilterFormProps) => {
  const { filterData, onSubmitComplete } = props;
  const formikRef = useRef<FormikProps<FormModel>>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setIsOpen(false);
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const handleSubmit = (values: FormModel) => {
    if (onSubmitComplete) {
      onSubmitComplete(values);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
        icon={<HiOutlineFilter />}
        onClick={() => openDrawer()}
      >
        Filter
      </Button>
      <Drawer
        title="Filter"
        isOpen={isOpen}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
      >
        <AdvocateFilterForm
          ref={formikRef}
          onSubmitComplete={handleSubmit}
          filterData={filterData}
        />
      </Drawer>
    </>
  );
};

AdvocateFilterForm.displayName = "AdvocateFilterForm";

export default AdvocateFilter;
