import DirectedGraph from '../src/index';
import { data } from '../src/data';
import { describe, it } from 'mocha';
import { difference } from 'lodash';
// import { expect } from 'chai';

describe('Linked list to graph', () => {
  it('should add an edge', () => {
    const graph = new DirectedGraph();

    data.forEach(({child, parent}: {child: string, parent: string}) => {
      graph.setNode(child);
      graph.setNode(parent);
    });

    data.forEach(({child, parent}: {child: string, parent: string}) => {
      graph.setEdge(parent, child);
    });

    const edgeKeys = Array.from(graph.edges.keys());
    const nodeKeys = Array.from(graph.nodes.keys());



    const nodesWithoutEdges = difference(nodeKeys, edgeKeys);
    // console.log(nodesWithoutEdges.sort());

    console.log(graph.get('3P07'))

  });
});
