import { getPopulatedGraph, serializedGraphData } from './graph-data';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('toSerializable', () => {
  it('should return the full graph in JSON serializable form', () => {
    const serializedGraph = getPopulatedGraph().toSerializable();

    expect(serializedGraph).to.deep.equal(serializedGraphData);
  });
});