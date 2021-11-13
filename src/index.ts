export type NodeData = Record<string, any>;
export type Nodes = Map<string, NodeData>;
export type SuccessorSet = Set<string>;
export type Edges = Map<string, SuccessorSet>;
export type SerializableNodes = [string, NodeData][];
export type SerializableSuccessorSet = Array<string>;
export type SerializableEdges = [string, SerializableSuccessorSet][];

export type RichNode = {
  data: NodeData;
  edges: SuccessorSet;
  inDegree: number;
  node: string;
  outDegree: number;
}

export type SerializableDirectedGraph = {
  edges: SerializableEdges;
  nodes: SerializableNodes;
}

export type DirectedGraphData = {
  edges: Edges;
  nodes: Nodes;
}

export type RichDirectedGraph = DirectedGraphData & {
  deleteEdge(predecessor: string): RichDirectedGraph;
  deleteEdgeSuccessor(predecessor: string, successor: string): RichDirectedGraph;
  deleteNode(node: string): RichDirectedGraph;
  fromJSON(directedGraph: SerializableDirectedGraph): DirectedGraphData;
  get(node: string): RichNode;
  getInDegree(node: string): number;
  getOutDegree(node: string): number;
  removeNodeFromEdgeSuccessors(node: string): RichDirectedGraph;
  setEdge(predecessor: string, successor: string): RichDirectedGraph;
  setNode(key: string, content: object): RichDirectedGraph;
  toJSON(): SerializableDirectedGraph;
}


export default class RDG implements RichDirectedGraph {
  edges: Edges;
  nodes: Nodes;

  constructor(serializableDirectedGraph?: SerializableDirectedGraph) {
    if (serializableDirectedGraph) {
      const { edges, nodes } = this.fromJSON(serializableDirectedGraph);
      this.edges = edges;
      this.nodes = nodes;
    } else {
      this.edges = new Map();
      this.nodes = new Map();
    }
  }

  setEdge(predecessor: string, successor: string): RichDirectedGraph {
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

  setNode(key: string, content: NodeData = {}): RichDirectedGraph {
    this.nodes.set(key, content);

    return this;
  }

  deleteEdge(predecessor: string): RichDirectedGraph {
    this.edges.delete(predecessor);

    return this;
  }

  deleteEdgeSuccessor(predecessor: string, successor: string): RichDirectedGraph {
    this.edges.get(predecessor).delete(successor);

    return this;
  }

  deleteNode(node: string): RichDirectedGraph {
    this.nodes.delete(node);
    this.deleteEdge(node);
    this.removeNodeFromEdgeSuccessors(node);

    return this;
  }

  removeNodeFromEdgeSuccessors(node: string): RichDirectedGraph {
    this.edges.forEach((edge, key) => {
      edge.delete(node);
    });

    return this;
  }

  fromJSON(directedGraph: SerializableDirectedGraph): DirectedGraphData {
    return {
      edges: directedGraph.edges.reduce((acc, curr) => {
        return acc.set(curr[0], new Set([...curr[1]]));
      }, new Map()),

      nodes: directedGraph.nodes.reduce((acc, cur) => {
        return acc.set(cur[0], cur[1]);
      }, new Map()),
    };
  }

  toJSON(): SerializableDirectedGraph {
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
