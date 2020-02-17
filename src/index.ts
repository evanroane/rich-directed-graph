type Edges = Map<string, Set<string>>
type Nodes = Map<string, object>;
// make a type for fromJSON and toJSON

interface IDirectedGraph {
  edges: Edges,
  nodes: Nodes,
}

class DirectedGraph implements IDirectedGraph {
  edges: Edges;
  nodes: Nodes;

  constructor() {
    // make a constructor that hydrates based on array data using this.fromJSON
    this.edges = new Map();
    this.nodes = new Map();
  }

  setEdge(predecessor: string, successor: string): void {
    if (this.nodes.has(predecessor) && this.nodes.has(successor)) {
      if (this.edges.has(predecessor)) {
        this.edges.set(predecessor, this.edges.get(predecessor).add(successor));
      } else {
        this.edges.set(predecessor, new Set(successor));
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

  fromJSON(): void {}

  toJSON = () => ({
    edges: [...this.edges],
    nodes: [...this.nodes],
  });
}

export default DirectedGraph;