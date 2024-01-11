import React, { FC } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, useReactFlow } from 'reactflow';
import { relationType } from '../Constant/constant';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {

  const { setEdges } = useReactFlow();

	const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;
  const midPointX = (sourceX + targetX) / 2;

  const edgePathStep = `
    M ${sourceX},${sourceY}
    L ${midPointX},${sourceY}
    L ${midPointX},${targetY}
    L ${targetX},${targetY}
  `;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const style = {
    position: 'absolute',
    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
    background: '#ffcc00',
    padding: 5,
    borderRadius: 5,
    fontSize: 9,
    fontWeight: 500,
    display:'flex',
    pointerEvents: 'all',
    justifyContent: 'space-around'
  }

  const onMoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = e.target.id;
    document.getElementById(`style-${id}`).style.display = "block";
  }

  const onTypeSelect = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const clickedId = e.target.id;
    const label = e.target.innerText;

    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === clickedId) {
          edge.data = {
            ...edge.data,
            label: label
          };
        }
        return edge;
      })
    );
  }

  return (
    <>
      <BaseEdge id={id} path={edgePathStep} />
      <EdgeLabelRenderer>
        {data.isClicked && <div style={style} className="nodrag nopan" >
          <div>{data.label}</div>
          <span className='three-dots three-dots-for-edge' id={id} onClick={onMoreClick}></span>
          <div className='options-wrapper' id={`style-${id}`} onClick={onTypeSelect}>
            {relationType.map((type)=>{
              return(<div id={id} className='type-styls'>{type}</div>)
            })}
          </div>
        </div>}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
