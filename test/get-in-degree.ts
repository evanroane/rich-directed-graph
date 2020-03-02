import getPopulatedGraph from './populated-graph';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('getInDegree', () => {
  it('should get the in degree of sadness', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getInDegree('joy');

    expect(inDegree).to.equal(3);
  });

  it('should get the in degree of sadness', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getInDegree('sadness');

    expect(inDegree).to.equal(3);
  });

  it('should get the in degree of desire', () => {
    const graph = getPopulatedGraph();

    const inDegree = graph.getInDegree('desire');

    expect(inDegree).to.equal(0);
  });
});