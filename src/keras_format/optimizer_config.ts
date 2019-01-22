/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */

import {BaseSerialization} from './types';
import {stringDictToArray} from './utils';

// TODO(soergel): This is a stopgap that needs further thought.
// Does it belong here?
// Does it belong in tfjs-core?
// See https://github.com/tensorflow/tfjs-core/pull/1404

export type AdadeltaOptimizerConfig = {
  learning_rate: number; rho: number; epsilon: number;
};

export type AdadeltaSerialization =
    BaseSerialization<'AdadeltaOptimizer', AdadeltaOptimizerConfig>;

export type AdagradOptimizerConfig = {
  learning_rate: number; initial_accumulator_value: number;
};

export type AdagradSerialization =
    BaseSerialization<'AdagradOptimizer', AdagradOptimizerConfig>;

export type AdamOptimizerConfig = {
  learning_rate: number; beta1: number; beta2: number; epsilon: number;
};

export type AdamSerialization =
    BaseSerialization<'AdamOptimizer', AdamOptimizerConfig>;

export type AdamaxOptimizerConfig = {
  learning_rate: number; beta1: number; beta2: number; epsilon: number;
  decay?: number;
};

export type AdamaxSerialization =
    BaseSerialization<'AdamaxOptimizer', AdamaxOptimizerConfig>;

export type MomentumOptimizerConfig = {
  // extends SGDOptimizerConfig {
  learning_rate: number; momentum: number; use_nesterov: boolean;
};

export type MomentumSerialization =
    BaseSerialization<'MomentumOptimizer', MomentumOptimizerConfig>;

export type RMSPropOptimizerConfig = {
  learning_rate: number;
  decay?: number;
  momentum?: number;
  epsilon?: number;
  centered?: boolean;
};

export type RMSPropSerialization =
    BaseSerialization<'RMSPropOptimizer', RMSPropOptimizerConfig>;

export type SGDOptimizerConfig = {
  learning_rate: number;
};

export type SGDSerialization =
    BaseSerialization<'SGDOptimizer', SGDOptimizerConfig>;

export type OptimizerSerialization = AdadeltaSerialization|AdagradSerialization|
    AdamSerialization|AdamaxSerialization|MomentumSerialization|
    RMSPropSerialization|SGDSerialization;

export type OptimizerClassName = OptimizerSerialization['class_name'];

/**
 * List of all known initializer names, along with a string description.
 *
 * Representing this as a class allows both type-checking using the keys and
 * generating an appropriate options array for use in select fields.
 */
export class OptimizerOptions {
  [key: string]: string;
  // tslint:disable:variable-name
  public readonly AdadeltaOptimizer = 'Adadelta';
  public readonly AdagradOptimizer = 'Adagrad';
  public readonly AdamOptimizer = 'Adam';
  public readonly AdamaxOptimizer = 'Adamax';
  public readonly MomentumOptimizer = 'Momentum';
  public readonly RMSPropOptimizer = 'RMSProp';
  public readonly SGDOptimizer = 'SGD';
  // tslint:enable:variable-name
}

/**
 * An array of `{value, label}` pairs describing the valid optimizers.
 *
 * The `value` is the serializable string constant, and the `label` is a more
 * user-friendly description (e.g. for use in UIs).
 */
export const optimizerOptions = stringDictToArray(new OptimizerOptions());

export const optimizerClassNames = optimizerOptions.map((x) => x.value);

/**
 * A type representing the strings that are valid optimizer names.
 */
// TODO(soergel): test assert this is identical to OptimizerClassName
// export type OptimizerIdentifier = keyof OptimizerOptions;
