import React, { memo } from "react";
import tableStyle from "./table.module.css";
import { Handle, Position, useReactFlow } from "reactflow";
import { SelectedMarkerStyle, selectedEdgeStyle } from "../Constant/constant";

const Table = ({data}) => {
	const { addNodes, addEdges } = useReactFlow();
	const createEdge = (params) => {
		addEdges({ 
			id: `${params.sourceHandle}->${params.targetHandle}`,
			type: 'custom',
			data: {
				label: 'One to One',
			},
			source: params.source, 
			sourceHandle:params.sourceHandle,
			targetHandle:params.targetHandle,
			markerEnd : SelectedMarkerStyle, 
			target: params.target,
			style:selectedEdgeStyle
		})
	}
	const renderConnection = (baseHeight, col, display) => {
		return(<>
			<Handle
				type="source"
				id={`${data.tableName}-${col.id}-left`}
				position={Position.Left}
				style={{top:baseHeight, display:display}}
				onConnect={createEdge}
				isConnectable={true}
			/>
			<Handle
				type="target"
				id={`${data.tableName}-${col.id}-right`}
				position={Position.Right}
				style={{top:baseHeight, display:display}}
				onConnect={createEdge}
				isConnectable={true}
			/>
			<Handle
				type="target"
				id={`${data.tableName}-${col.id}-left`}
				position={Position.Left}
				style={{top:baseHeight, display:display}}
				onConnect={createEdge}
				isConnectable={true}
			/>
			<Handle
				type="source"
				id={`${data.tableName}-${col.id}-right`}
				position={Position.Right}
				style={{top:baseHeight, display:display}}
				onConnect={createEdge}
				isConnectable={true}
			/>
		</>)
	}
	const renderRows = () => {
		let baseHeight = 31;
		return(
			<>
			{data.columns.map((col)=>{
				baseHeight+=21;
				const display = data.renderConnection ? "block" : "none";
				return(
					<div className={tableStyle.rowWrapper}>
						<div className={tableStyle.columnName}>{col.name}</div>
						<div className={tableStyle.dataTypeWrapper}>{col.dataType}</div>
						{renderConnection(baseHeight, col, display)}
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