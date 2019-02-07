import React, { Component } from 'react'
import styles from './textLoginPassword.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, FormControl, InputLabel,IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import renderFromHelper from '../renderFromHelper';


export class renderPasswordField extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        showPassword: false,
      };
    }

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

  render() {
    const { input, label,className, meta: { touched, error }, ...custom } = this.props

// export const renderPasswordField = ({ input, label,className, meta: { touched, error }, ...custom }) => {
  return <FormControl className={className} required>
    <InputLabel htmlFor="userName">{label}</InputLabel>
    <Input
      {...input}
      {...custom}
      type={this.state.showPassword ? 'text' : 'password'}
      endAdornment={
          <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={this.handleClickShowPassword}
          >
            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
     {renderFromHelper({ touched, error })}
  </FormControl>
}
}


export default withStyles(styles)(renderPasswordField)
