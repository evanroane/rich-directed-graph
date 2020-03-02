import getPopulatedGraph from './populated-graph';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('deleteEdge', () => {
  it('should do something', () => {
    const graph = getPopulatedGraph();

    //assert where hate is
    expect(graph.edges.has('hate')).to.be.true;
    expect(graph.nodes.has('hate')).to.be.true;
    expect(graph.edges.get('mockery')).to.include('hate');

    // remove hate
    graph.deleteNode('hate');

    // assert where hate is not
    expect(graph.edges.has('hate')).to.be.false;
    expect(graph.nodes.has('hate')).to.be.false;
    expect(graph.edges.get('mockery')).to.not.include('hate');
  });
});