export type SuccessorSet = Set<string>;
export type SimpleSuccessorSet = Array<string>;

export type Edges = Map<string, SuccessorSet>
export type SimpleEdges = [string, SimpleSuccessorSet][];

export type Nodes = Map<string, object>;
export type SimpleNodes = [string, object][];

export interface ISimpleDirectedGraph {
  edges: SimpleEdges,
  nodes: SimpleNodes
}

export interface IDirectedGraph {
  edges: Edges,
  nodes: Nodes,
}
