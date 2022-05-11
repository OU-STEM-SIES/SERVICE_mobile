/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
// Here are stored all the possible locations on the table for the InnerCircle, MiddleCircle and OuterCircle
//  indexing ROWs and COLUMNs start from 0
//
// This is a version with places mixed up to give impression of ad hoc placement.
// The originals are in MyCircleHelper.txt

// stores available locations for OuterCircle (people most far away in the circle)
// 24 slots are available
export const available_locations_OUTER_CIRCLE: Array<{row: number; column: number}> = [
  // available locations at row 0 (the first row of the table)
  {row: 0, column: 0},
  {row: 6, column: 6},
  {row: 6, column: 0},
  {row: 0, column: 6},
  {row: 0, column: 3},
  {row: 3, column: 6},
  {row: 6, column: 3},
  {row: 3, column: 0},
  {row: 0, column: 1},
  {row: 6, column: 5},
  {row: 4, column: 0},
  {row: 0, column: 4},
  {row: 6, column: 1},
  {row: 4, column: 6},
  {row: 5, column: 0},
  {row: 0, column: 2},
  {row: 6, column: 4},
  {row: 2, column: 0},
  {row: 0, column: 5},
  {row: 6, column: 2},
  {row: 1, column: 0},
  {row: 5, column: 6},
  {row: 1, column: 6},
  {row: 2, column: 6},
]

// stores available locations for MiddleCircle (people that are placed betwwen OuterCircle and InnerCircle)
// 16 slots are available
export const available_locations_MIDDLE_CIRCLE: Array<{row: number; column: number}> = [
  // available locations at row 1 (the second row of the table)
  {row: 5, column: 5},
  {row: 5, column: 2},
  {row: 1, column: 1},
  {row: 1, column: 5},
  {row: 5, column: 3},
  {row: 3, column: 5},
  {row: 1, column: 3},
  {row: 3, column: 1},
  {row: 4, column: 5},
  {row: 2, column: 1},
  {row: 1, column: 2},
  {row: 4, column: 1},
  {row: 1, column: 4},
  {row: 2, column: 5},
  {row: 5, column: 1},
  {row: 5, column: 4},
]

// stores available locations for InnerCircle (people that are the closest)
// 8 slots are available
export const available_locations_INNER_CIRCLE: Array<{row: number; column: number}> = [
  // available locations at row 2 (the 3rd row of the table)
  {row: 2, column: 4},
  {row: 4, column: 2},
  {row: 2, column: 2},
  {row: 3, column: 4},
  {row: 2, column: 3},
  {row: 4, column: 3},
  {row: 3, column: 2},
  {row: 4, column: 4},
]

