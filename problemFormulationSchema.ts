export type ProblemFormulation = Problem;

/**
 * Represents a problem.
 */
export interface Problem {
  /** The initial state of the problem */
  initialState: State;

  /** The set of operators that can be applied to states */
  operators: Operator[];

  /** The goal condition of the problem */
  goalCondition: GoalCondition;

  /** The function that checks whether a state is legal or not */
  stateLegal: StateLegal;
}

/**
 * Represents a state of a problem. It's a part of the set of all possible states.
 */
type State = any;

/**
 * Represents an operator that can be applied to a state to produce a new state.
 */
type Operator = (state: State) => State;

/**
 * Represents a function that checks whether a state is a goal state or not.
 * A goal state is a state that satisfies the goal conditions of the problem.
 */
type GoalCondition = (state: State) => boolean;

/**
 * Represents a function that checks whether a state is legal or not.
 */
type StateLegal = (state: State) => boolean;

// Use this type for problems or problem subparts that match nothing else
export interface UnknownValue {
  type: 'unknown',
  text: string; // The text that wasn't understood
}