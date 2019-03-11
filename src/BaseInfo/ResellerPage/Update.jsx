import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Update,Get } from '../../_actions/baseInfo/city'
import { connectTo } from '../../_utils/generic';
import { isValid } from '../../_utils/forms'
import textfield from '../../_components/fields/textfield/textfield'
import selectField from '../../_components/fields/selectField/selectField'
import UpdateForm from '../../_components/updateForm/updateForm'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Filter as FilterRegions } from '../../_actions/baseInfo/region'

class UpdatePage extends PureComponent {
    componentDidMount() {
        const { FilterRegions,Get,match:{params:{cityId}} } = this.props
        FilterRegions({ name: "", afterCall: () => { Get({cityId}) } });
    }

    render() {
        const { handleSubmit, enabledSubmit, listFilterRegion,match:{params:{id}} } = this.props
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
            <UpdateForm
                fields={fields}
                handleSubmit={handleSubmit}
                enabledSubmit={enabledSubmit}
                onSubmit={({name,region}) => { Update({cityId:id, name: name, region: region })}}
                backBtn={true}
                backLink='/city'
            />
        )
    }
}

export default withStyles(styles)(connectTo(
    state => ({
        listFilterRegion: state.region.listFilter,
        enabledSubmit: isValid(state, 'UpdateForm'),
        initialValues: { name: state.city.name, region: state.city.region },
    }),
    { Update, FilterRegions,Get },
    reduxForm({ form: 'UpdateForm',enableReinitialize: true })(UpdatePage)))
