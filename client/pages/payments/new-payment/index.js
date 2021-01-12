import React from "react";

import styles from "./new-payment.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DownArrowIcon } from "../../../components/Icons";
const DownArrow = () => {
  return (
    <DownArrowIcon
      width={12}
      height={12}
      fill="grey"
      style={{
        position: "absolute",
        marginTop: "9px",
        right: "10px",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Name is required.")
    .min(2, "* Name is too short"),
  surname: yup
    .string()
    .required("* Surname is required.")
    .min(2, "* Surname is too short"),
  email: yup.string().email().required("* Email is required."),
  phone: yup
    .string()
    .notRequired()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
      message: "* Invalid Phone Number",
      excludeEmptyString: true,
    }),
});

export default function NewPayment() {
  const user = null;
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Layout>
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Payment Details</h4>
              <div className={styles.inputContainer}>
                <span>Repairment ID</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Total Cost</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Payment Method</span>
                <div className={styles.selectContainer}>
                  <select id="type" name="type">
                    <option value="DESC">Desc</option>
                    <option value="ASC">Asc</option>
                  </select>
                  <DownArrow />
                </div>
              </div>
              
              {errors.name && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.name}
                </p>
              )}
              {errors.surname && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.surname}
                </p>
              )}
              {errors.email && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.email}
                </p>
              )}
              {errors.phone && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
         
            <Button type="submit" name="update_button" value="Update">
              Create New Payment
            </Button>
            
        </form>
      </main>
    </Layout>
  );
}
