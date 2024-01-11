import { MarkerType } from "reactflow";

export const initialNodes = [
  {
		id: '1',
		type:"table",
		position: { x: 50, y: 100 },
		data: 
			{
				tableName:"roles", 
				isChecked:false,
				renderConnection:true,
				tableColor:"#d900ff",
				columns : [
					{
						id:"1",
						name : "role_id",
						dataType: "long"
					},
					{
						id:"2",
						name : "role_name",
						dataType: "varchar2(n)"
					},
					{
						id:"3",
						name : "createAt",
						dataType: "timestamp"
					},
					{
						id:"3",
						name : "isDisable",
						dataType: "boolean"
					}
				],
			}
  },
  {
	id: '2',
	type:"table",
	position: { x: 700, y: 100 },
	data: 
		{
			tableName:"permissions", 
			isChecked:false,
			renderConnection:true,
			tableColor:"#a989ff",
			columns : [
				{
					id:"1",
					name : "permissions_id",
					dataType: "long"
				},
				{
					id:"2",
					name : "permissions_name",
					dataType: "varchar2(n)"
				},
				{
					id:"3",
					name : "is_disable",
					dataType: "boolean"
				}
			],
		}
},
{
	id: '3',
	type:"table",
	position: { x:450, y: 300 },
	data: 
		{
			tableName:"user", 
			isChecked:false,
			renderConnection:true,
			tableColor:"#0980ff",
			columns : [
				{
					id:"4",
					name : "username",
					dataType: "varchar2(n)"
				},
				{
					id:"1",
					name : "user_id",
					dataType: "long"
				},
				{
					id:"2",
					name : "role_id",
					dataType: "long"
				},
				{
					id:"3",
					name : "permissions_id",
					dataType: "long"
				},
				{
					id:"5",
					name : "is_disable",
					dataType: "boolean"
				}
			],
		}
}
];

export const initialEdges = [
	{
		id: '1',
		source: '1',
		target: '3',
		type: 'custom',
		data: {
			label: 'many to one',
			isClicked:false
		}
	},
	{
		id: '2',
		source: '2',
		target: '3',
		type: 'custom',
		data: {
			label: 'many to one',
			isClicked:false
		}
	}
];

