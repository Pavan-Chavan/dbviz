import React from "react";
import "./model.css";
import { oracleDataTypes } from "../../Constant/constant";

const Model = ({onClose, nodes=[], onFieldUpdate, deleteColumn, addColumn, addNewTable, onTableNameUpdate, onAccordionUpdate, deleteTable}) => {
	
	const updateStyleOfMoreInfoModel = (id,style) => {
		document.getElementById(id).style.display = style;
	}

	const deleteAndDerenderModelColumn = (id,colId,TableId) => {
		updateStyleOfMoreInfoModel(id,"none");
		deleteColumn(colId,TableId);
	}

	const renderMoreInfoModel = (col,table) => {
		return(
		<div className="column-model" id={`more-info-${col.id}-${table.id}`}>
			<div className="header-wrapper">
				<div className="header-text">Column Options</div>
				<span className="cross-icon" onClick={()=>{updateStyleOfMoreInfoModel(`more-info-${col.id}-${table.id}`,"none")}}></span>
			</div>
			<div className="info-box">
				<div className="header-text">Actions</div>
				<button className="button-8 danger" onClick={(e)=>{deleteAndDerenderModelColumn(`more-info-${col.id}-${table.id}`,col.id,table.id)}} role="button">Delete Column</button>
			</div>
		</div>
	)};
	
	const getDataTypesOptions = () => {
		return(
			<datalist id="DataTypes">
				{oracleDataTypes.map((dataType)=>(
					<option value={dataType}/>
				))}
			</datalist>
		);
	};

	const renderColumns = (table) => {
		return (table.data.columns.map((col)=>{
			const dataTypeClass =  oracleDataTypes.includes(col.dataType) ? "" : "danger-form-field"
			return (
				<div>
					{renderMoreInfoModel(col,table)}
					<div className="form-group" key={col.id}>
						<input className="form-field"  type="text" field="name" value={col.name} onChange={(e)=>{onFieldUpdate(table.data.tableName, col.id, e.target.value, "name")}} placeholder="Column Name"/>
						<input list="DataTypes" className={`form-field ${dataTypeClass}`} onChange={(e)=>{onFieldUpdate(table.data.tableName, col.id, e.target.value, "dataType")}} value={col.dataType} id="myHouse" name="myHouse" placeholder="Data Type" />
						{getDataTypesOptions()}
						<div className="three-dots-wrapper" onClick={(e)=>{updateStyleOfMoreInfoModel(`more-info-${col.id}-${table.id}`,"block")}}>
							<div className="three-dots"></div>
						</div>
					</div>
				</div>
			) 
		}))
	}

	const renderTable = () => {
		return (
			<>
				{nodes.map((table)=>{
					return (
						<div className="accordion" key={table.id}>
							<div>
								<input type="checkbox" checked={table.data.isChecked}  className="accordion__input"/>
								<div id={table.id} onClick={onAccordionUpdate}>
									<label for={table.id} key={table.data.tableName} style={{backgroundColor:table.data.tableColor}} id={table.id} className="accordion__label">{table.data.tableName}</label>
								</div>
								<div className="accordion__content">
									<div className="no-gap form-group">
										<input className="form-field" onChange={(e)=>{onTableNameUpdate(table.id, e.target.value)}} type="text" field="tableName" value={table.data.tableName} placeholder="Table Name"/>
									</div>
									{renderColumns(table)}
									<div className="add-column">
										<button className="button-8" name={table.data.tableName} onClick={(e)=>{addColumn(e.target.name)}} role="button">Add Column</button>
										<button className="button-8 delete-icon" name={table.id} onClick={(e)=>{deleteTable(e.target.name)}} role="button"></button>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</>
		)
	}
	return(
		<div id="myModal" className="modal">
			<div className="modal-content">
				<div className="button-wrapper">
					<button onClick={addNewTable} type="button" className="button-62">New Table</button>
					<div onClick={onClose} className="left-arrow">
						<span className="left-arrow-icon"></span>
					</div>
				</div>
				<div className="content-wrapper">
					{renderTable()}
				</div>
			</div>
		</div>
	);
};

export default Model;