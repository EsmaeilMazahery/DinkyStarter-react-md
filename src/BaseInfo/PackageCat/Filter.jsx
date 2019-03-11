import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { List } from '../../_actions/baseInfo/city'
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textfield from '../../_components/fields/textfield/textfield'
import selectField from '../../_components/fields/selectField/selectField'
import FilterForm from '../../_components/filterForm/filterForm'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Filter as FilterRegions } from '../../_actions/baseInfo/region'

class FilterPage extends PureComponent {

    componentDidMount() {
        const { List, FilterRegions, page, rowsPerPage } = this.props
        FilterRegions({ name: "", afterCall: (region) => { List({ name: "", region: region, page: page, rowsPerPage }) } });
    }

    render() {
        const { handleSubmit, enabledSubmit, List, listFilterRegion, page, rowsPerPage } = this.props
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
            <FilterForm
                fields={fields}
                handleSubmit={handleSubmit}
                enabledSubmit={enabledSubmit}
                onSubmit={({name,region,excel}) => { List({ name: name, region: region, page: page, rowsPerPage,excel:excel })}}
                excell={true}
                addBtn={true}
                addText="افزودن شهر"
                addlink='/city/register'
            />
        )
    }
}

export default withStyles(styles)(connectTo(
    state => ({
        listFilterRegion: state.region.listFilter,
        enabledSubmit: isValid(state, 'ListForm'),
        page: state.city.page,
        name: state.city.name,
        region: state.city.region,
        initialValues: { name: "", region: state.city.region },
        rowsPerPage: state.generic.rowsPerPage,
    }),
    { List, FilterRegions },
    reduxForm({ form: 'ListForm',enableReinitialize: true })(FilterPage)))
