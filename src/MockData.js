export const initialNodes = [
  {
		id: '1',
		type:"table",
		position: { x: 200, y: 200 },
		data: 
			{
				tableName:"student", 
				isChecked:false,
				tableColor:"red",
				columns : [
					{
						id:"1",
						name : "name",
						dataType: "CHAR(n)"
					},
					{
						id:"2",
						name : "age",
						dataType: "NUMBER(p, s)"
					},
					{
						id:"3",
						name : "address",
						dataType: "VARCHAR2(n)"
					}
				],
			}
  }
];

export const initialEdges = [];

