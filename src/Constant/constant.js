import { MarkerType } from "reactflow";

export const oracleDataTypes = [
  'char(n)',
  'varchar2(n)',
  'number(p, s)',
  'date',
  'timestamp',
  'clob',
  'blob',
  'binary_integer',
  'boolean',
  'raw(n)',
  'long',
  'rowid',
  'urowid',
  'xmltype',
  'interval year to month',
  'interval day to second'
];

export const selectedEdgeStyle = {
	stroke : "#E11900",
	strokeWidth: "1px"
};

export const SelectedMarkerStyle =  {
  type: MarkerType.ArrowClosed,
  width: 10,
  height: 12,
  color: '#E11900',
}

export const relationType = ["one to one","one to many","many to one","many to many"]