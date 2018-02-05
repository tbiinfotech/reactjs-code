import React from 'react'
import { CardElement } from 'react-stripe-elements';

const Form = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <form onSubmit={handleSubmit}>

      <div className="box">
        <div className="row order-summary">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h5>Order summary</h5>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col s8">
                <p className="medium">{props.parentComponent.state.selectedSubscription.name}</p>
              </div>
              <div className="col s4 text-right">
                <p className="medium text-right">${ (props.parentComponent.state.orderDetails.subtotal / 1e2).toFixed(2) }</p>
              </div>
            </div>
            { props.parentComponent.state.promoApplied && <div className="row red-text text-red-darken-3">
              <div className="col s8">
                <p className="medium">
                  {props.parentComponent.state.promoApplied.id}
                  {props.parentComponent.state.promoApplied.percent_off !== null && ' - ' + props.parentComponent.state.promoApplied.percent_off + '% OFF'}
                  {props.parentComponent.state.promoApplied.amount_off !== null && ' - $' + (props.parentComponent.state.promoApplied.amount_off / 1e2).toFixed(2) + ' OFF'}
                  &nbsp;
                  {props.parentComponent.state.promoApplied.duration === 'once' && '1st month'}
                  {props.parentComponent.state.promoApplied.duration === 'forever' && 'forever!'}
                  {props.parentComponent.state.promoApplied.duration === 'repeating' && 'first ' + props.parentComponent.state.promoApplied.duration_in_months + ' months'}
                </p>
              </div>
              <div className="col s4 text-right">
                <p className="medium text-right">- ${ (props.parentComponent.state.orderDetails.discount / 1e2).toFixed(2) }</p>
              </div>
            </div> }
            { props.parentComponent.state.promoApplied && <div className="row">
              <div className="col s8">
                <p className="medium">Discounted Subtotal</p>
              </div>
              <div className="col s4 text-right">
                <p className="medium text-right">${ (props.parentComponent.state.orderDetails.discountedSubtotal / 1e2).toFixed(2) }</p>
              </div>
            </div> }
            <div className="row">
              <div className="col s8">
                <p className="medium">Tax { props.parentComponent.state.orderDetails.tax > 0 && '('+(props.parentComponent.state.orderDetails.taxPercent*1e2).toFixed(0)+'%)' }</p>
              </div>
              <div className="col s4 text-right">
                <p className="medium text-right">${ (props.parentComponent.state.orderDetails.tax / 1e2).toFixed(2) }</p>
              </div>
            </div>
            <div className="row">
              <div className="col s8">
                <p className="medium">Shipping</p>
              </div>
              <div className="col s4 text-right">
                <p className="medium text-right">${ (props.parentComponent.state.orderDetails.shipping / 1e2).toFixed(2) }</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col s8">
                <p className="bold">Today's total</p>
              </div>
              <div className="col s4 text-right">
                <p className="bold text-right">${ (props.parentComponent.state.orderDetails.total / 1e2).toFixed(2) }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row promoEntry">
          <div className="col s9">
            <label>Promo Code</label>
            <input id="promoCode" type="text" />
          </div>
          <div className="col s3">
            <label>&nbsp;</label>
            <a className="btn gold-text white apply-promo-btn" onClick={()=>{props.parentComponent.applyPromo()}}>Apply</a>
          </div>
        </div>
      </div>

      <br />

      <div className="box">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h5>Payment Info</h5>
              </div>
            </div>
            <CardElement style={{base: {fontSize: '18px'}}} />
            { props.parentComponent.state.cardError && <div className="red-text marT-10">{ props.parentComponent.state.cardError.message }</div> }
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <br />
            <button className="btn btn-block btn-l black" type="submit" disabled={isSubmitting}>Join Now</button>
          </div>
        </div>
      </div>

    </form>
  );
}

export default Form