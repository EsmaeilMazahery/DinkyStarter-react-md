import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitLogin } from '../../_actions/auth'
import { required, minLength, lengthLessThan } from '../../_validators/forms';
import { connectTo } from '../../_utils/generic';
import { isValid} from '../../_utils/forms'
import textLoginUser from '../../_components/fields/textLoginUser'
import textLoginPassword from '../../_components/fields/textLoginPassword'
import hiddenfield from '../../_components/fields/hiddenfield'
import AuthForm from '../../_components/auth-form'
import styles from './login.module.scss';
import { withStyles } from '@material-ui/core/styles';

const requiredusername=required("نام کاربری")
const requiredpassword=required("گذرواژه")
const lengthLessThan40 = lengthLessThan(40)
const minLength6 = minLength(6)

export default withStyles(styles)(connectTo(
  state => ({
    enabledSubmit: isValid(state, 'login'),
  }),
  { submitLogin },
  reduxForm({ form: 'login' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitLogin,
      location
    }) => {
      let { from } = location.state || { from: { pathname: "/" } };
      const fields = [
        <Field
          name="username"
          key="username"
          component={textLoginUser}
          label="username"
          type="text"
          validate={[requiredusername]}
        />,
        <Field
          name="password"
          key="password"
          component={textLoginPassword}
          label="password"
          type="password"
          validate={[requiredpassword, minLength6, lengthLessThan40]}
        />,
        <Field
          name="from"
          key="from"
          component={hiddenfield}
          label="from"
          type="hidden"
          val={from.pathname}
        />
      ]
      return (
        <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          enabledSubmit={enabledSubmit}
          onSubmit={submitLogin}
          submitText='login'
          linkTextClick='/forgetPassword'
          bottomText="forgetPassword"
        />
      )
    }
  )
)
)