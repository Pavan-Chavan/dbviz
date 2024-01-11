import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Table from './Table/Table';
import { initialEdges, initialNodes } from './MockData';
import Model from './Components/Model/Model';
import "./App.css";
import 'reactflow/dist/style.css';
import { getNewColorCode, getUniqueId } from './Utilities';
import CustomEdge from './Table/CustomEdge';

const nodeTypes = {
  table: Table,
};

const edgeTypes = {
  custom: CustomEdge
};
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const DbViz = ({}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { addNodes } = useReactFlow();
  const initBgColor = '#1A192B';
  const [nodeName, setNodeName] = useState('Node 1');
  const [bgColor, setBgColor] = useState(initBgColor);
  const [nodeHidden, setNodeHidden] = useState(false);
  const [model, setModel] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  const onClose = () => {
    setModel(false);
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style };
        }

        return node;
      })
    );
  }, [setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);
  
  const openModel = () => {
    setModel(true);
  }

  const updateFields = (tableName, colId, value, field) => {
    setNodes((nds) =>
      nds.map((node) => {
        let udpatedCols = {};
        if (node.data.tableName === tableName) {
          udpatedCols = node.data.columns.map((col)=>{
            if(col.id === colId) {
              col[field] = value;
            }
            return {...col};
          })
        }
        node.data = {...node.data,...udpatedCols};
        return node;
      })
    );
  }

  const renderModelOpenButton = () => {
    return(
      <div onClick={openModel} className="model-button-wrapper">
        <span className='right-arrow'></span>
      </div>
    )
  }

  const addColumn = (tableName) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.tableName === tableName) {
          node.data.columns.push({id: getUniqueId(), name:"", dataType:""})
          node.data = {
            ...node.data
          }
        }
        return node;
      })
    );
  }

  const addNewTable = () => {
		addNodes({
			id: getUniqueId(),
			type:"table",
			position: { x: 150, y: 150 },
      style: {visibility: "visible"},
			data: 
				{ 
					tableName:"New Table", 
          isChecked:true,
          renderConnection:false,
          tableColor: `${getNewColorCode()}`,
					columns : [
						{
							id:getUniqueId(),
							name : "Id",
							dataType: "LONG"
						}
					],
				}
		});
	}
 
  const onTableNameUpdate = (Id,value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === Id) {
          node.data = {
            ...node.data,
            tableName:value
          }
        }
        return node;
      })
    );
  }

  const onAccordionUpdate = (e) => {
    const tableId = e.target.id;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === tableId) {
          node.data = {
            ...node.data,
            isChecked: !node.data.isChecked
          }
        }
        return node;
      })
    );
  }

  const deleteColumn = (colId,tableId) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === tableId) {
          const cols  = node.data.columns.filter((col)=>{return col.id !== colId});
          node.data = {
            ...node.data,
            columns: cols
          }
        }
        return node;
      })
    );
  }

  const onTableColorChange = (tableId, colorCode) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === tableId) {
          node.data = {
            ...node.data,
            tableColor: `${colorCode}`
          }
        }
        return node;
      })
    );
  }

  const deleteTable = (tableId) => {
    setNodes((prevNodes) => prevNodes.filter((table) => table.id !== tableId));
  }

  const onEdgeClick = (event,clickedEdge) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === clickedEdge.id) {
          edge.data = {
            ...edge.data,
            isClicked:true
          };
        }
        return edge;
      })
    );
  }
  
  const onPaneClick = () => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.data.isClicked) {
          edge.data = {
            ...edge.data,
            isClicked:false
          };
        }
        return edge;
      })
    );
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.renderConnection) {
          node.data = {
            ...node.data,
            renderConnection:false
          }
        }
        return node;
      })
    );
  }

  const onNodeClick = (e,clickedNode) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === clickedNode.id) {
          node.data = {
            ...node.data,
            renderConnection:true
          }
        }
        return node;
      })
    );
  }
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={1}
      maxZoom={4}
      nodeTypes={nodeTypes}
      fitView
      className={"viewport"} 
      edgeTypes={edgeTypes}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick}
      onNodeClick={onNodeClick}
      attributionPosition="bottom-left"
    >
    </ReactFlow>
    {model && <Model 
      onClose={onClose} 
      nodes={nodes} 
      onFieldUpdate={updateFields} 
      addColumn={addColumn} 
      addNewTable={addNewTable}
      onTableColorChange={onTableColorChange}
      deleteColumn={deleteColumn}
      onTableNameUpdate={onTableNameUpdate}
      onAccordionUpdate={onAccordionUpdate}
      deleteTable={deleteTable}/>}
    {!model && renderModelOpenButton()}
    </div>

  );
};

function App(props) {
  return (<ReactFlowProvider>
    <DbViz {...props}/>
  </ReactFlowProvider>);
}

export default App;
