declare type Edges = Map<string, Set<string>>;
declare type Nodes = Map<string, object>;
interface IDirectedGraph {
    edges: Edges;
    nodes: Nodes;
}
declare class DirectedGraph implements IDirectedGraph {
    edges: Edges;
    nodes: Nodes;
    constructor();
    setEdge(predecessor: string, successor: string): void;
    setNode(key: string, content: object): void;
    deleteEdge(predecessor: string): void;
    deleteEdgeSuccessor(predecessor: string, successor: string): void;
    deleteNode(node: string): void;
    fromJSON(): void;
    toJSON: () => {
        edges: [string, Set<string>][];
        nodes: [string, object][];
    };
}
export default DirectedGraph;
