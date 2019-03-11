import React, { PureComponent } from 'react'
import { IconButton, Checkbox, Button, Popover, List, ListItem, ListItemText, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import styles from './FilterField.module.scss';
import { connectTo } from '../../../_utils/generic';
import { Filter as FilterRegions } from '../../../_actions/baseInfo/region'
import { to } from '../../../_actions/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state/index';

class FilterField extends PureComponent {
    state = {
        page: 0,
        rowsPerPage: 10,
        checked: [0],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };


    render() {
        // const { list, allRows, input,
        //     label,0
        //     meta: { active, error, warning },
        //     ...custom } = this.props
        // const { rowsPerPage, page } = this.state;
        // const message = !active ? error || warning : undefined
        // const showError = Boolean(message && input.value)
        return (
            <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                    <>
                        <Button className={styles.btn} variant="contained" {...bindTrigger(popupState)}>
                            Open Popover
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className={styles.box}>
                                <div className={styles.search}>
                                    <FormControl>
                                        <InputLabel htmlFor="userName">جستجو</InputLabel>
                                        <Input
                                            type='text'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                    >
                                                        <FontAwesomeIcon icon={['far', 'check-square']} />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                    >
                                                        <FontAwesomeIcon icon={['far', 'square']} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className={styles.navigate}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        aria-label="Add"
                                        className={styles.margin}
                                    >
                                        <FontAwesomeIcon icon='angle-right' />
                                    </Button >
                                    <span>
                                        1
                                    </span>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        aria-label="Add"
                                        className={styles.margin}
                                    >
                                        <FontAwesomeIcon icon='angle-left' />
                                    </Button >
                                </div>
                                <div className={styles.items}>
                                    <List>
                                        <ListItem className={styles.item} role={undefined} dense button onClick={this.handleToggle(0)}>
                                            <Checkbox className={styles.checkbox}
                                                checked={this.state.checked.indexOf(0) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                            <ListItemText primary={`Line item ${0 + 1}`} />
                                        </ListItem>
                                        {[1, 2, 3].map(value => (
                                            <ListItem className={styles.item} key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                                                <Checkbox className={styles.checkbox}
                                                    checked={this.state.checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                                <ListItemText primary={`Line item ${value + 1}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </div>
                        </Popover>
                    </>
                )}
            </PopupState>

        )
    }
}

export default connectTo(
    state => ({
        list: state.city.list,
        allRows: state.city.allRows
    }),
    { to, FilterRegions },
    withStyles(styles)(FilterField)
)


// const TextFieldForRender = ({
//     input,
//     label,
//     meta: { active, error, warning },
//     ...custom
// }) => {
//     const message = !active ? error || warning : undefined
//     const showError = Boolean(message && input.value)
//     return (

//   )
// }

// export default withStyles(styles)(TextFieldForRender)