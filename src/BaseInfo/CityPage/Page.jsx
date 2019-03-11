import React, { PureComponent } from 'react'
import { connectTo } from '../../_utils/generic';
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { List, Delete } from '../../_actions/baseInfo/city'
import { changeRowsPerPage } from '../../_actions/generic'
import { Filter as FilterRegions } from '../../_actions/baseInfo/region'
import { Paper, TableRow, Fab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Filter from './Filter'
import { Link } from "react-router-dom";
import { CustomTableCell, ActionTableCell,Table } from '../../_components/table/table';

class Page extends PureComponent {
  handleChangePage = (event, page) => {
    const { List, rowsPerPage, name, region } = this.props
    List({ name: name, region: region, page: page, rowsPerPage });
  };

  handleChangeRowsPerPage = event => {
    const { changeRowsPerPage } = this.props
    changeRowsPerPage(event.target.value)
  };

  render() {
    const { list, allRows, page, rowsPerPage } = this.props
    return (
      <div className={styles.container}>
        <Paper className={styles.filterarea}>
          <Filter></Filter>
        </Paper>
        <br />
        <Paper className={styles.table}>
          <Table TableCellHeaders={
            [<CustomTableCell align="left" key="0">ردیف</CustomTableCell>,
            <CustomTableCell align="center" key="1">نام</CustomTableCell>,
            <CustomTableCell align="center" key="2">مرکز</CustomTableCell>,
            <CustomTableCell align="center" key="3">دکل</CustomTableCell>,
            <ActionTableCell align="center" key="4">نمایش</ActionTableCell>,
            <ActionTableCell align="center" key="5">حذف</ActionTableCell>,
            <ActionTableCell align="center" key="6">پکیج</ActionTableCell>]
          }
            rows={list.map((row, index) => (
              <TableRow className={styles.row} key={row.cityId}>
                <CustomTableCell align="left" component="th" scope="row">
                  {index + 1 + page * rowsPerPage}
                </CustomTableCell>
                <CustomTableCell align="center">{row.name}</CustomTableCell>
                <CustomTableCell align="center">{row.stationCount}</CustomTableCell>
                <CustomTableCell align="center">{row.antennaCount}</CustomTableCell>
                <ActionTableCell align="center">
                  <Link to={"/city/" + row.cityId} className={styles.link}>
                    <Fab size="small" color="primary" aria-label="Detail" className={styles.margin}>
                      <FontAwesomeIcon icon="file-alt" />
                    </Fab>
                  </Link>
                </ActionTableCell>
                <ActionTableCell align="center">
                  <Fab size="small" color="secondary" onClick={() => { alert('You clicked user ') }} aria-label="Delete" className={styles.margin}>
                    <FontAwesomeIcon icon="trash-alt" />
                  </Fab>
                </ActionTableCell>
                <ActionTableCell align="center">
                  <a href={"/" + row.cityId}>
                    <Fab size="small" aria-label="package" className={styles.margin}>
                      <FontAwesomeIcon icon="cubes" />
                    </Fab>
                  </a>
                </ActionTableCell>
              </TableRow>
            ))} allrows={allRows} rowsPerPage={rowsPerPage} page={page} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage}></Table>
        </Paper>
      </div>
    );
  }
}

export default connectTo(
  state => ({
    list: state.city.list,
    allRows: state.city.allRows,
    page: state.city.page,
    name: state.city.name,
    region: state.city.region,
    rowsPerPage: state.generic.rowsPerPage,
  }),
  { List, Delete, FilterRegions, changeRowsPerPage },
  withStyles(styles)(Page)
)