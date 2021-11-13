export type NodeData = Record<string, any>;
export type Nodes = Map<string, NodeData>;
export type SuccessorSet = Set<string>;
export type Edges = Map<string, SuccessorSet>;
export type SerializableNodes = [string, NodeData][];
export type SerializableSuccessorSet = Array<string>;
export type SerializableEdges = [string, SerializableSuccessorSet][];

interface RichNode {
  data: NodeData,
  edges: SuccessorSet,
  inDegree: number,
  node: string,
  outDegree: number,
}

interface ISimpleDirectedGraph {
  edges: SerializableEdges,
  nodes: SerializableNodes,
}

interface IDirectedGraphData {
  edges: Edges,
  nodes: Nodes,
}

interface IDirectedGraph extends IDirectedGraphData {
  deleteEdge(predecessor: string): IDirectedGraph;
  deleteEdgeSuccessor(predecessor: string, successor: string): IDirectedGraph;
  deleteNode(node: string): IDirectedGraph;
  fromJSON(directedGraph: ISimpleDirectedGraph): IDirectedGraphData;
  get(node: string): RichNode;
  getInDegree(node: string): number;
  getOutDegree(node: string): number;
  removeNodeFromEdgeSuccessors(node: string): IDirectedGraph;
  setEdge(predecessor: string, successor: string): IDirectedGraph;
  setNode(key: string, content: object): IDirectedGraph;
  toJSON(): ISimpleDirectedGraph;
}


export default class DirectedGraph implements IDirectedGraph {
  edges: Edges;
  nodes: Nodes;

  constructor(simpleDirectedGraph?: ISimpleDirectedGraph) {
    if (simpleDirectedGraph) {
      const { edges, nodes } = this.fromJSON(simpleDirectedGraph);
      this.edges = edges;
      this.nodes = nodes;
    } else {
      this.edges = new Map();
      this.nodes = new Map();
    }
  }

  setEdge(predecessor: string, successor: string): IDirectedGraph {
    const {edges, nodes} = this;

    if (nodes.has(predecessor) && nodes.has(successor)) {
      if (edges.has(predecessor)) {
        edges.set(predecessor, edges.get(predecessor).add(successor));
      } else {
        edges.set(predecessor, new Set([successor]));
      }
    }

    return this;
  }

  setNode(key: string, content: NodeData = {}): IDirectedGraph {
    this.nodes.set(key, content);

    return this;
  }

  deleteEdge(predecessor: string): IDirectedGraph {
    this.edges.delete(predecessor);

    return this;
  }

  deleteEdgeSuccessor(predecessor: string, successor: string): IDirectedGraph {
    this.edges.get(predecessor).delete(successor);

    return this;
  }

  deleteNode(node: string): IDirectedGraph {
    this.nodes.delete(node);
    this.deleteEdge(node);
    this.removeNodeFromEdgeSuccessors(node);

    return this;
  }

  removeNodeFromEdgeSuccessors(node: string): IDirectedGraph {
    this.edges.forEach((edge, key) => {
      edge.delete(node);
    });

    return this;
  }

  fromJSON(directedGraph: ISimpleDirectedGraph): IDirectedGraphData {
    return {
      edges: directedGraph.edges.reduce((acc, curr) => {
        return acc.set(curr[0], new Set([...curr[1]]));
      }, new Map()),

      nodes: directedGraph.nodes.reduce((acc, cur) => {
        return acc.set(cur[0], cur[1]);
      }, new Map()),
    };
  }

  toJSON(): ISimpleDirectedGraph {
    return {
      edges: [...this.edges].reduce((acc, cur) => acc.concat([[cur[0], [...cur[1]]]]), []),
      nodes: [...this.nodes],
    }
  }

  getInDegree(node: string): number {
    let inDegree: number = 0;

    this.edges.forEach((successors, key) => {
      if (successors.has(node)) {
        inDegree = inDegree + 1;
      }
    });

    return inDegree;
  }

  getOutDegree(node: string): number {
    return this.edges.has(node) ? this.edges.get(node).size : 0;
  }

  get(node: string): RichNode {
    return {
      data: this.nodes.get(node),
      edges: this.edges.get(node) || new Set(),
      inDegree: this.getInDegree(node),
      node,
      outDegree: this.getOutDegree(node),
    };
  }
}
