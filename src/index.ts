type SuccessorSet = Set<string>;
type SimpleSuccessorSet = Array<string>;

type Edges = Map<string, SuccessorSet>
type SimpleEdges = [string, SimpleSuccessorSet][];

type NodeData = { [key: string]: any; };
type Nodes = Map<string, NodeData>;
type SimpleNodes = [string, NodeData][];

interface ISimpleDirectedGraph {
  edges: SimpleEdges,
  nodes: SimpleNodes
}

interface IDirectedGraph {
  edges: Edges,
  nodes: Nodes,
}

class DirectedGraph implements IDirectedGraph {
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

  setEdge(predecessor: string, successor: string): void {
    const { edges, nodes } = this;

    if (nodes.has(predecessor) && nodes.has(successor)) {
      if (edges.has(predecessor)) {
        edges.set(predecessor, edges.get(predecessor).add(successor));
      } else {
        edges.set(predecessor, new Set([successor]));
      }
    }
  }

  setNode(key: string, content: object): void {
    this.nodes.set(key, content);
  }

  // Deletes an edge
  deleteEdge(predecessor: string): void {
    this.edges.delete(predecessor);
  }

  deleteEdgeSuccessor(predecessor: string, successor: string): void {}

  // Deletes a node, its associated edges, and any references to that node in all edges
  deleteNode(node: string): void {
    this.nodes.delete(node);
    this.deleteEdge(node);

    this.edges.forEach((edge, key) => {
      edge.delete(node);
    });
  }

  fromJSON(directedGraph: ISimpleDirectedGraph): IDirectedGraph {
    return {
      edges: directedGraph.edges.reduce((acc, curr) => {
        return acc.set(curr[0], new Set(curr[1]));
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

  // getInDegree
  // getOutDegree
}

export default DirectedGraph;