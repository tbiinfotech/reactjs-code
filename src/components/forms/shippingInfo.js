import React from 'react'
import { RegionDropdown } from 'react-country-region-selector'

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col s6">
        <label>First Name</label>
        <input id="firstName" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
      </div>
      <div className="col s6">
        <label>Last Name</label>
        <input id="lastName" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
      </div>
    </div>
    <div className="row">
      <div className="col s9">
        <label>Street Address</label>
        <input id="streetAddress" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.streetAddress} />
      </div>
      <div className="col s3">
        <label>Apt/Suite</label>
        <input id="aptSuite" type="text" onChange={handleChange} onBlur={handleBlur} value={values.aptSuite} />
      </div>
    </div>
    <div className="row">
      <div className="col s5">
        <label>City</label>
        <input id="city" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.city} />
      </div>
      <div className="col s3">
        <label>State</label>
        <RegionDropdown country="US" value={values.state} onChange={(val) => setFieldValue('state',val)} countryValueType="short" labelType="short" valueType="short" defaultOptionLabel="Select..." />
      </div>
      <div className="col s4">
        <label>Zip</label>
        <input id="zip" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.zip} />
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <br />
        <button className="btn btn-block btn-l black" type="submit" disabled={isSubmitting}>CONTINUE</button>
      </div>
    </div>
  </form>
);

export default Form