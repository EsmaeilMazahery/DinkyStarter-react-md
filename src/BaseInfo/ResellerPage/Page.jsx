import React, { PureComponent } from 'react'
import { connectTo } from '../../_utils/generic';
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { List, Delete } from '../../_actions/baseInfo/reseller'
import { changeRowsPerPage } from '../../_actions/generic'
import { Paper, TableRow, Fab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Filter from './Filter'
import { Link } from "react-router-dom";
import { CustomTableCell, ActionTableCell,Table } from '../../_components/table/table';

class Page extends PureComponent {

  handleChangePage = (event, page) => {
    const { List, rowsPerPage, name } = this.props
    List({ name: name, page: page, rowsPerPage });
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
            <CustomTableCell align="center" key="2">والد</CustomTableCell>,
            <ActionTableCell align="center" key="3">نمایش</ActionTableCell>,
            <ActionTableCell align="center" key="4">پکیج</ActionTableCell>]
          }
            rows={list.map((row, index) => (
              <TableRow className={styles.row} key={row.resellerId}>
                <CustomTableCell align="left" component="th" scope="row">
                  {index + 1 + page * rowsPerPage}
                </CustomTableCell>
                <CustomTableCell align="center">{row.name}</CustomTableCell>
                <CustomTableCell align="center">{row.parentName}</CustomTableCell>
                <ActionTableCell align="center">
                  <Link to={"/reseller/" + row.resellerId} className={styles.link}>
                    <Fab size="small" color="primary" aria-label="Detail" className={styles.margin}>
                      <FontAwesomeIcon icon="file-alt" />
                    </Fab>
                  </Link>
                </ActionTableCell>
                <ActionTableCell align="center">
                  <a href={"/" + row.resellerId}>
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
    list: state.reseller.list,
    allRows: state.reseller.allRows,
    page: state.reseller.page,
    name: state.reseller.name,
    rowsPerPage: state.generic.rowsPerPage,
  }),
  { List, Delete, changeRowsPerPage },
  withStyles(styles)(Page)
)