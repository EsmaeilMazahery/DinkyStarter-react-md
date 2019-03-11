import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitForgetPassword } from '../../_actions/auth'
import { required, mobile } from '../../_validators/forms';
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textWithAdornment from '../../_components/fields/textWithAdornment/textWithAdornment'
import AuthForm from '../../_components/authForm/authForm'
import styles from './forgetPassword.module.scss';
import { withStyles } from '@material-ui/core/styles';

const requiredmobile=required("موبایل")

export default withStyles(styles)(connectTo(
  state => ({
    enabledSubmit: isValid(state, 'forgetPassword')
  }),
  { submitForgetPassword },
  reduxForm({ form: 'forgetPassword' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitForgetPassword,
    }) => {
      const fields = [
        <Field
          name="mobile"
          key="mobile"
          component={textWithAdornment}
          label="موبایل"
          type="text"
          adornment="mobile-alt"
          validate={[requiredmobile, mobile]}
        />,
      ]
      return (
        <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          enabledSubmit={enabledSubmit}
          onSubmit={submitForgetPassword}
          submitText='ارسال'
          linkTextClick='/login'
          bottomText="ورود"
        />
      )
    }
  )
)
)
