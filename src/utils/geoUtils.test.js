import test from 'node:test';
import assert from 'node:assert/strict';
import { degreesToRadians, radiansToDegrees, formatDistance, formatDuration, isValidCoordinates, calculateBounds } from './geoUtils.js';

test('converts degrees to radians', () => {
  assert.equal(degreesToRadians(180), Math.PI);
});

test('converts radians to degrees', () => {
  assert.equal(radiansToDegrees(Math.PI), 180);
});

test('formats distances', () => {
  assert.equal(formatDistance(1.5), '1.5 km');
  assert.equal(formatDistance(0.25), '250 m');
});

test('formats durations', () => {
  assert.equal(formatDuration(90), '1h 30min');
  assert.equal(formatDuration(15), '15 min');
});

test('validates coordinates', () => {
  assert.equal(isValidCoordinates(47.218, -1.553), true);
  assert.equal(isValidCoordinates(100, 0), false);
});

test('calculates bounds from coordinates', () => {
  const bounds = calculateBounds([[1, 2], [3, 4], [2, 3]]);
  assert.deepEqual(bounds, { minLat: 1, maxLat: 3, minLon: 2, maxLon: 4 });
});
