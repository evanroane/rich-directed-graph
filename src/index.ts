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

  setNode(key: string, content: object): IDirectedGraph {
    this.nodes.set(key, content);

    return this;
  }

  deleteEdge(predecessor: string): IDirectedGraph {
    this.edges.delete(predecessor);

    return this;
  }

  deleteEdgeSuccessor(predecessor: string, successor: string): IDirectedGraph {
    return this;
  }

  deleteNode(node: string): IDirectedGraph {
    this.nodes.delete(node);
    this.deleteEdge(node);

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
    return NaN;
  }

  getOutDegree(node: string): number {
    return NaN;
  }
}

export default DirectedGraph;