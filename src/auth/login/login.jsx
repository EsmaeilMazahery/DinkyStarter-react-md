import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitLogin } from '../../_actions/auth'
import { required, minLength, lengthLessThan } from '../../_validators/forms';
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textLoginUser from '../../_components/fields/textLoginUser/textLoginUser'
import textLoginPassword from '../../_components/fields/textLoginPassword/textLoginPassword'
import hiddenfield from '../../_components/fields/hiddenfield/hiddenfield'
import AuthForm from '../../_components/authForm/authForm'
import styles from './login.module.scss';
import { withStyles } from '@material-ui/core/styles';

const requiredusername = required("نام کاربری")
const requiredpassword = required("گذرواژه")
const lengthLessThan40 = lengthLessThan(40)
const minLength6 = minLength(6)

class LoginPage extends PureComponent {
  render() {
    const { handleSubmit,enabledSubmit,submitLogin } = this.props
    const fields = [
      <Field
        name="username"
        key="username"
        component={textLoginUser}
        label="نام کاربری"
        type="text"
        validate={[requiredusername]}
      />,
      <Field
        name="password"
        key="password"
        component={textLoginPassword}
        label="گذرواژه"
        type="password"
        validate={[requiredpassword, minLength6, lengthLessThan40]}
      />,
      <Field
        name="from"
        key="from"
        component={hiddenfield}
        label="مقصد"
        type="text"
        validate={[]}
      />,
    ]
    return (
      <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          enabledSubmit={enabledSubmit}
          onSubmit={submitLogin}
          submitText='ورود'
          linkTextClick='/forgetPassword'
          bottomText="فراموشی رمز عبور"
        />
    )
  }
}

export default withStyles(styles)(connectTo(
  state => ({
    enabledSubmit: isValid(state, 'login'),
    initialValues: { username: "", password: "", from: state.auth.backAddress },
  }),
  { submitLogin },
  reduxForm({ form: 'login', enableReinitialize: true })(LoginPage)))
