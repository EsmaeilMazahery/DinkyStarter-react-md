import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitForgetPassword } from '../../_actions/auth'
import { to } from '../../_actions/navigation'
import { required, mobile } from '../../_validators/forms';
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textWithAdornment from '../../_components/fields/textWithAdornment'
import AuthForm from '../../_components/auth-form'
import styles from './forgetPassword.module.scss';
import { withStyles } from '@material-ui/core/styles';

const requiredmobile=required("mobile")

export default withStyles(styles)(connectTo(
  state => ({
    enabledSubmit: isValid(state, 'forgetPassword')
  }),
  { to, submitForgetPassword },
  reduxForm({ form: 'forgetPassword' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitForgetPassword,
      to
    }) => {
      const fields = [
        <Field
          name="mobile"
          key="mobile"
          component={textWithAdornment}
          label="mobile"
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
          submitText='send'
          linkTextClick='/login'
          bottomText="login"
        />
      )
    }
  )
)
)
