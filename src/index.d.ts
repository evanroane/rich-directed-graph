declare type SuccessorSet = Set<string>;
declare type SimpleSuccessorSet = Array<string>;
declare type Edges = Map<string, SuccessorSet>;
declare type SimpleEdges = [string, SimpleSuccessorSet][];
declare type Nodes = Map<string, object>;
declare type SimpleNodes = [string, object][];
interface ISimpleDirectedGraph {
    edges: SimpleEdges;
    nodes: SimpleNodes;
}
interface IDirectedGraph {
    edges: Edges;
    nodes: Nodes;
}
declare class DirectedGraph implements IDirectedGraph {
    edges: Edges;
    nodes: Nodes;
    constructor(simpleDirectedGraph: ISimpleDirectedGraph);
    setEdge(predecessor: string, successor: string): void;
    setNode(key: string, content: object): void;
    deleteEdge(predecessor: string): void;
    deleteEdgeSuccessor(predecessor: string, successor: string): void;
    deleteNode(node: string): void;
    fromJSON(directedGraph: ISimpleDirectedGraph): IDirectedGraph;
    toJSON(): ISimpleDirectedGraph;
}
export default DirectedGraph;
