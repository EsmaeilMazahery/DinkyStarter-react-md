import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { List } from '../../_actions/baseInfo/reseller'
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textfield from '../../_components/fields/textfield/textfield'
import FilterForm from '../../_components/filterForm/filterForm'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';

class FilterPage extends PureComponent {
    componentDidMount() {
        const { List, page, rowsPerPage } = this.props
        List({ name: "", page: page, rowsPerPage });
    }

    render() {
        const { handleSubmit, enabledSubmit, List, page, rowsPerPage } = this.props
        const fields = [
            <Field
                name="name"
                key="name"
                component={textfield}
                label="نام"
                className={styles.formControl}
                validate={[]}
            />,
        ]
        return (
            <FilterForm
                fields={fields}
                handleSubmit={handleSubmit}
                enabledSubmit={enabledSubmit}
                onSubmit={({name,excel}) => { List({ name: name, page: page, rowsPerPage,excel:excel })}}
                excell={true}
                addBtn={true}
                addText="افزودن نماینده"
                addlink='/reseller/register'
            />
        )
    }
}

export default withStyles(styles)(connectTo(
    state => ({
        enabledSubmit: isValid(state, 'List'),
        page: state.region.page,
        name: state.region.name,
        initialValues: { name: "" },
        rowsPerPage: state.generic.rowsPerPage,
    }),
    { List },
    reduxForm({ form: 'List',enableReinitialize: true })(FilterPage)))
