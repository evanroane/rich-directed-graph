import getPopulatedGraph from './populated-graph';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('getOutDegree', () => {
  it('should get the out degree of mockery', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getOutDegree('mockery');

    expect(inDegree).to.equal(3);
  });

  it('should get the out degree of devotion', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getOutDegree('devotion');

    expect(inDegree).to.equal(2);
  });

  it('should get the out degree of desire', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getOutDegree('desire');

    expect(inDegree).to.equal(0);
  });
});