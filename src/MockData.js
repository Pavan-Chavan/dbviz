export const initialNodes = [
  {
		id: '1',
		type:"table",
		position: { x: 0, y: 0 },
		data: 
			{
				tableName:"student", 
				isChecked:false,
				tableColor:"red",
				columns : [
					{
						id:"1",
						name : "name",
						dataType: "char"
					},
					{
						id:"2",
						name : "age",
						dataType: "Int"
					},
					{
						id:"3",
						name : "address",
						dataType: "varchar"
					}
				],
			}
  }
];

export const initialEdges = [];

