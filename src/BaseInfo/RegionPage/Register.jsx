import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Register } from '../../_actions/baseInfo/city'
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textfield from '../../_components/fields/textfield/textfield'
import selectField from '../../_components/fields/selectField/selectField'
import RegisterForm from '../../_components/registerForm/registerForm'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Filter as FilterRegions } from '../../_actions/baseInfo/region'

class RegisterPage extends PureComponent {
    componentDidMount() {
        const { FilterRegions } = this.props
        FilterRegions({ name: "", afterCall: () => { } });
    }

    render() {
        const { handleSubmit, enabledSubmit, listFilterRegion } = this.props
        const fields = [
            <Field
                name="name"
                key="name"
                component={textfield}
                label="نام"
                className={styles.formControl}
                validate={[]}
            />,
            <Field
                name="region"
                key="region"
                component={selectField}
                label="استان"
                className={styles.formControl}
                validate={[]}
                list={listFilterRegion}
                allItem={false}
            />,
        ]
        return (
            <RegisterForm
                fields={fields}
                handleSubmit={handleSubmit}
                enabledSubmit={enabledSubmit}
                onSubmit={({name,region}) => { Register({ name: name, region: region })}}
                backBtn={true}
                backLink='/city'
            />
        )
    }
}

export default withStyles(styles)(connectTo(
    state => ({
        listFilterRegion: state.region.listFilter,
        enabledSubmit: isValid(state, 'RegisterForm'),
    }),
    { Register, FilterRegions },
    reduxForm({ form: 'RegisterForm',enableReinitialize: true })(RegisterPage)))
