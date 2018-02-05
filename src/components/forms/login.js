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
      {errors.error && <div className="col s12">
        <p className="xsmall bold red-text text-darken-3 form-error">{errors.error}</p>
      </div>}
      <div className="col s12">
        <label>Email</label>
        <input id="email" type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} required />
      </div>
      <div className="col s12">
        <label>Password</label>
        <input id="password" type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} required />
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <button className="btn btn-block btn-l black" type="submit" disabled={isSubmitting}>Login</button>
      </div>
    </div>
  </form>
);

export default Form