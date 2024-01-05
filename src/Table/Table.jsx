import React, { memo } from "react";
import tableStyle from "./table.module.css";

const Table = ({data}) => {
	const renderRows = () => {
		return(
			<>
			{data.columns.map((col)=>{
				return(
					<div className={tableStyle.rowWrapper}>
						<div className={tableStyle.columnName}><div>!</div>{col.name}</div>
						<div>{col.dataType}</div>
					</div>
				)
			})}
			</>
		)
	}
	return (
		<div className={tableStyle.tableWrapper}>
			<div style={{borderTop: `5px solid ${data.tableColor}`}} className={tableStyle.tableNameWrapper} >{data.tableName}</div>
			<div className={tableStyle.tableBodyWrapper}>
				{renderRows()}
			</div>
		</div>
	)
}

export default memo(Table);