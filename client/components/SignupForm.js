import React, { useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  Form,
  Label,
  Item,
  Input,
  Picker,
  Button,
  DatePicker,
} from "native-base";
import { CheckBox } from "react-native-elements";
import CustomButton from "./customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";

export default SignupForm = () => {
  const {
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      docType: "",
      docNumber: "",
      birth: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      locality: "",
      street: "",
      streetNumber: "",
      password: "",
      confirmPassword: "",
      passcode: "",
      role: "client",
    },
    onSubmit: (values) => {
      //Send values to database
      console.log(values);
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length <= 2) errors.name = "Must be a valid name";
      if (values.surname.length <= 2)
        errors.surname = "Must be a valid surname";
      if (!/^(?=.*\d)[0-9]{8,10}$/.test(values.docNumber))
        errors.docNumber = "Must be a valid document number";
      if (values.phone.length <= 10)
        errors.phone = "Must be a valid phone number";
      if (!values.birth) errors.birth = "Must be a valid birthdate";
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      )
        errors.email = "Must be a valid email.";
      if (!values.country) errors.country = "Must be a valid country.";
      if (!values.state) errors.state = "Must be a valid state.";
      if (!values.locality) errors.locality = "Must be a valid locality.";
      if (!values.street) errors.street = "Must be a valid street.";
      if (!values.streetNumber)
        errors.streetNumber = "Must be a valid street number.";
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.password))
        errors.password = "Must contain: 5-20 digits, A-Z and a-z.";
      if (values.confirmPassword !== values.password || !values.confirmPassword)
        errors.confirmPassword = "Must the same password.";
      if (!values.passcode) errors.passcode = "Must be a valid passcode.";
      return errors;
    },
  });
  const [check, setCheck] = useState(false);
  console.log(values);
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Form style={{ padding: 18 }}>
          <Item error={errors.name ? true : false}>
            <Input
              placeholder="Name"
              onBlur={handleBlur("name")}
              name="name"
              onChangeText={(text) => setFieldValue("name", text)}
              value={values.name}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.name && errors.name}
          </Text>
          <Item error={errors.surname ? true : false}>
            <Input
              placeholder="Surname"
              onBlur={handleBlur("surname")}
              name="surname"
              onChangeText={(text) => setFieldValue("surname", text)}
              value={values.surname}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.surname && errors.surname}
          </Text>
          <Item>
            <Picker
              onValueChange={(value) => setFieldValue("docType", value)}
              selectedValue={values.docType}
            >
              <Picker.Item label="DNI" value="dni" />
              <Picker.Item label="Passport" value="passport" />
            </Picker>
          </Item>
          <Item error={errors.docNumber ? true : false}>
            <Input
              placeholder="Document Number"
              onBlur={handleBlur("docNumber")}
              name="docNumber"
              onChangeText={(text) => setFieldValue("docNumber", text)}
              value={values.docNumber}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.docNumber && errors.docNumber}
          </Text>
          <Item error={errors.birth ? true : false}>
            {/*             <Input
              placeholder="Birthdate"
              onBlur={handleBlur("birth")}
              name="birth"
              onChangeText={(text) => setFieldValue("birth", text)}
              value={values.birth}
            /> */}
            <DatePicker
              /*               name="birth"
              onBlur={handleBlur("birth")} */
              defaultDate={new Date(2020, 6, 6)}
              maximumDate={new Date(2020, 6, 6)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select birthdate"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(date) =>
                setFieldValue("birth", date.toString().substr(4, 12))
              }
              disabled={false}
            />
            <Text>Date: {values.birth}</Text>
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.birth && errors.birth}
          </Text>
          <Item error={errors.phone ? true : false}>
            <Input
              placeholder="Phone Number"
              onBlur={handleBlur("phone")}
              name="phone"
              onChangeText={(text) => setFieldValue("phone", text)}
              value={values.phone}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.phone && errors.phone}
          </Text>
          <Item error={errors.email ? true : false}>
            <Input
              placeholder="Email"
              onBlur={handleBlur("email")}
              name="email"
              onChangeText={(text) => setFieldValue("email", text)}
              value={values.email}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.email && errors.email}
          </Text>
          <Item error={errors.country ? true : false}>
            <Input
              placeholder="Country"
              onBlur={handleBlur("country")}
              name="country"
              onChangeText={(text) => setFieldValue("country", text)}
              value={values.country}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.country && errors.country}
          </Text>
          <Item error={errors.state ? true : false}>
            <Input
              placeholder="State"
              onBlur={handleBlur("state")}
              name="state"
              onChangeText={(text) => setFieldValue("state", text)}
              value={values.state}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.state && errors.state}
          </Text>
          <Item error={errors.locality ? true : false}>
            <Input
              placeholder="Locality"
              onBlur={handleBlur("locality")}
              name="locality"
              onChangeText={(text) => setFieldValue("locality", text)}
              value={values.locality}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.locality && errors.locality}
          </Text>
          <Item error={errors.street ? true : false}>
            <Input
              placeholder="Street"
              onBlur={handleBlur("street")}
              name="street"
              onChangeText={(text) => setFieldValue("street", text)}
              value={values.street}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.street && errors.street}
          </Text>
          <Item error={errors.streetNumber ? true : false}>
            <Input
              placeholder="Street Number"
              onBlur={handleBlur("streetNumber")}
              name="streetNumber"
              onChangeText={(text) => setFieldValue("streetNumber", text)}
              value={values.streetNumber}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.streetNumber && errors.streetNumber}
          </Text>
          <Item error={errors.password ? true : false}>
            <Input
              placeholder="Password"
              onBlur={handleBlur("password")}
              name="password"
              onChangeText={(text) => setFieldValue("password", text)}
              value={values.password}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.password && errors.password}
          </Text>
          <Item error={errors.confirmPassword ? true : false}>
            <Input
              placeholder="Confirm Password"
              onBlur={handleBlur("confirmPassword")}
              name="confirmPassword"
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              value={values.confirmPassword}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.confirmPassword && errors.confirmPassword}
          </Text>
          <Item error={errors.passcode ? true : false}>
            <Input
              placeholder="Passcode"
              onBlur={handleBlur("passcode")}
              name="passcode"
              onChangeText={(text) => setFieldValue("passcode", text)}
              value={values.passcode}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.passcode && errors.passcode}
          </Text>
          <CheckBox
            center
            title="I accept the Terms of Use & Privacy Policy"
            checked={check}
            onPress={() => setCheck(!check)}
          />
          <Button
            onPress={handleSubmit}
            disabled={!check}
            block
            style={{ marginTop: 6 }}
          >
            <Text>SIGN UP</Text>
          </Button>
        </Form>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};