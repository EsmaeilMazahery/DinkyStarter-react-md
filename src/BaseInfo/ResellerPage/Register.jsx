import React, { PureComponent } from 'react'
import { Field, reduxForm, change } from 'redux-form'

import { Register } from '../../_actions/baseInfo/city'
import { connectTo } from '../../_utils/generic';
import { isValid, getFormValues } from '../../_utils/forms'
import textfield from '../../_components/fields/textfield/textfield'
import selectField from '../../_components/fields/selectField/selectField'
import checkbox from '../../_components/fields/checkbox/checkbox'
import RegisterForm from '../../_components/registerForm/registerForm'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Filter as FilterResellers } from '../../_actions/baseInfo/reseller'
import { Filter as FilterRegions } from '../../_actions/baseInfo/region'
import { Filter as FilterCities } from '../../_actions/baseInfo/city'
import { Filter as FilterAccounting } from '../../_actions/baseInfo/accounting'
import { uploadStart } from '../../_actions/upload'


import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { Break } from '../../_components/Break';
import filefield from '../../_components/fields/filefield/filefield';

const formName = "RegisterForm"

class RegisterPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = { runUpload: null }
    }

    componentDidMount() {
        const { FilterResellers, FilterRegions, FilterCities, FilterAccounting, updateField } = this.props
        FilterResellers({
            name: "", afterCall: (id) => {
                updateField("parent", id);
            }
        });
        FilterAccounting({
            name: "", afterCall: (id) => {
                updateField("AAA", id);
            }
        });
        FilterRegions({
            name: "", afterCall: (regionId) => {
                updateField("region", regionId);
                FilterCities({
                    name: "", regions: [regionId], afterCall: (cityId) => {
                        updateField("cityCode", cityId);
                    }
                })
            }
        })
    }

    render() {
        const { handleSubmit, enabledSubmit, listFilterParents, listFilterRegions, listFilterCities, listFilterAccountings, FilterCities, updateField, uploadStart } = this.props

        const fields =
            <>
                <Paper className={styles.base} elevation={1}>
                    <Field
                        name="name"
                        key="name"
                        component={textfield}
                        label="نام"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="parent"
                        key="parent"
                        component={selectField}
                        label="والد"
                        className={styles.formControl}
                        validate={[]}
                        list={listFilterParents}
                        allItem={false}
                    />
                    <Field
                        name="userName"
                        key="userName"
                        component={textfield}
                        label="پیشوند نام کاربری"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="canNegetive"
                        key="canNegetive"
                        component={textfield}
                        label="حداقل اعتبار نماینده"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="minHazineNasbADSL"
                        key="minHazineNasbADSL"
                        component={textfield}
                        label="ADSL حداقل هزینه رانژه"
                        className={classNames({ [styles.formControl]: true, [styles.bigControl]: true })}
                        validate={[]}
                    />
                    <Field
                        name="minHazineNasbWireless"
                        key="minHazineNasbWireless"
                        component={textfield}
                        label="WIRELESS حداقل هزینه رانژه"
                        className={classNames({ [styles.formControl]: true, [styles.bigControl]: true })}
                        validate={[]}
                    />
                    <Field
                        name="startDateHazineNasb"
                        key="startDateHazineNasb"
                        component={textfield}
                        label="تاریخ اعمال هزینه نصب و رانژه"
                        className={classNames({ [styles.formControl]: true, [styles.bigControl]: true })}
                        validate={[]}
                    />
                    <Field
                        name="tax"
                        key="tax"
                        component={checkbox}
                        label="اعمال مالیات"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="active"
                        key="active"
                        component={checkbox}
                        label="فعال"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Break />
                    <Field
                        name="region"
                        key="region"
                        component={selectField}
                        label="استان"
                        className={styles.formControl}
                        validate={[]}
                        list={listFilterRegions}
                        allItem={false}
                        onChange={(a) => { FilterCities({ name: "", regions: [a.target.value], afterCall: (cityId) => { updateField("cityCode", cityId); } }); }}
                    />
                    <Field
                        name="cityCode"
                        key="cityCode"
                        component={selectField}
                        label="شهر"
                        className={styles.formControl}
                        validate={[]}
                        list={listFilterCities}
                        allItem={false}
                    />
                    <Field
                        name="AAA"
                        key="AAA"
                        component={selectField}
                        label="اکانتینگ"
                        className={styles.formControl}
                        validate={[]}
                        list={listFilterAccountings}
                        allItem={false}
                    />
                </Paper>
                <Paper className={styles.base} elevation={1}>
                    <Field
                        name="companyName"
                        key="companyName"
                        component={textfield}
                        label="نام شرکت"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="siteUrl"
                        key="siteUrl"
                        component={textfield}
                        label="سایت مشترکین"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Break />
                    <Field
                        name="logo"
                        key="logo"
                        folder="ResellerLogo"
                        component={filefield}
                        label="لوگو"
                        multiselect={false}
                        className={classNames({ [styles.formControl]: true, [styles.full]: true })}
                        validate={[]}
                    />
                    <Field
                        name="EconomicCode"
                        key="EconomicCode"
                        component={textfield}
                        label="کد اقتصادی"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="companyAddress"
                        key="companyAddress"
                        component={textfield}
                        label="آدرس شرکت"
                        className={styles.formControl}
                        validate={[]}
                    />

                    <Field
                        name="smsText"
                        key="smsText"
                        component={textfield}
                        label="متن پیامک"
                        className={classNames({ [styles.formControl]: true, [styles.full]: true })}
                        validate={[]}
                    />
                    <Field
                        name="CompanyPostalCode"
                        key="CompanyPostalCode"
                        component={textfield}
                        label="کدپستی"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="CompanyPhone"
                        key="CompanyPhone"
                        component={textfield}
                        label="تلفن"
                        className={styles.formControl}
                        validate={[]}
                    />
                    <Field
                        name="CompanyNationalCode"
                        key="CompanyNationalCode"
                        component={textfield}
                        label="شناسه ملی"
                        className={styles.formControl}
                        validate={[]}
                    />
                </Paper>
            </>

        return (
            <RegisterForm
                fields={fields}
                handleSubmit={handleSubmit}
                enabledSubmit={enabledSubmit}
                onSubmit={({ logo }) => {
                    uploadStart({
                        afterCall: () => {
                            Register({ logo: logo, })
                        }
                    });
                }}
                backBtn={true}
                backLink='/reseller'
            />
        )
    }
}

export default withStyles(styles)(connectTo(
    state => ({
        listFilterParents: state.reseller.listFilter,
        listFilterRegions: state.region.listFilter,
        listFilterCities: state.city.listFilter,
        listFilterAccountings: state.accounting.listFilter,
        enabledSubmit: isValid(state, formName),
        formData: getFormValues(state, formName),
    }),
    { Register, FilterResellers, FilterRegions, FilterCities, FilterAccounting, uploadStart, updateField: (field, data) => change(formName, field, data) },
    reduxForm({ form: formName, enableReinitialize: true })(RegisterPage)))
