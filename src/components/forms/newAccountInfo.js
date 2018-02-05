import React from 'react'

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col s6">
        <label>First Name</label>
        <input id="firstName" type="text" onChange={handleChange} onBlur={handleBlur} value={values.firstName} required />
      </div>
      <div className="col s6">
        <label>Last Name</label>
        <input id="lastName" type="text" onChange={handleChange} onBlur={handleBlur} value={values.lastName} required />
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <label>Email</label>
        <input id="email" type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} required />
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <label>Password</label>
        <input id="password" type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} required />
        {touched.password && errors.password && <p className="xsmall bold red-text text-darken-3 form-error">{errors.password}</p>}
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <label>Confirm Password</label>
        <input id="confirmPassword" type="password" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} required />
        {touched.confirmPassword && errors.confirmPassword && <p className="xsmall bold red-text text-darken-3 form-error">{errors.confirmPassword}</p>}
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