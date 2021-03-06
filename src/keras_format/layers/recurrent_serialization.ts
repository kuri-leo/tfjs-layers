/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */

import {ActivationIdentifier} from '../activation_config';
import {ConstraintSerialization} from '../constraint_config';
import {InitializerSerialization} from '../initializer_config';
import {RegularizerSerialization} from '../regularizer_config';
import {BaseLayerSerialization, LayerConfig} from '../topology_config';
import {BaseSerialization} from '../types';

export interface BaseRNNLayerConfig extends LayerConfig {
  cell?: RNNCellSerialization|RNNCellSerialization[];
  return_sequences?: boolean;
  return_state?: boolean;
  go_backwards?: boolean;
  stateful?: boolean;
  unroll?: boolean;
  input_dim?: number;
  input_length?: number;
}

export interface SimpleRNNCellConfig extends LayerConfig {
  units: number;
  activation?: ActivationIdentifier;
  use_bias?: boolean;
  kernel_initializer?: InitializerSerialization;
  recurrent_initializer?: InitializerSerialization;
  bias_initializer?: InitializerSerialization;
  kernel_regularizer?: RegularizerSerialization;
  recurrent_regularizer?: RegularizerSerialization;
  bias_regularizer?: RegularizerSerialization;
  kernel_constraint?: ConstraintSerialization;
  recurrent_constraint?: ConstraintSerialization;
  bias_constraint?: ConstraintSerialization;
  dropout?: number;
  recurrent_dropout?: number;
}

export type SimpleRNNCellSerialization =
    BaseSerialization<'SimpleRNNCell', SimpleRNNCellConfig>;

export interface SimpleRNNLayerConfig extends BaseRNNLayerConfig {
  units: number;
  activation?: ActivationIdentifier;
  use_bias?: boolean;
  kernel_initializer?: InitializerSerialization;
  recurrent_initializer?: InitializerSerialization;
  bias_initializer?: InitializerSerialization;
  kernel_regularizer?: RegularizerSerialization;
  recurrent_regularizer?: RegularizerSerialization;
  bias_regularizer?: RegularizerSerialization;
  kernel_constraint?: ConstraintSerialization;
  recurrent_constraint?: ConstraintSerialization;
  bias_constraint?: ConstraintSerialization;
  dropout?: number;
  recurrent_dropout?: number;
}

export type SimpleRNNLayerSerialization =
    BaseLayerSerialization<'SimpleRNN', SimpleRNNLayerConfig>;

export interface GRUCellConfig extends SimpleRNNCellConfig {
  recurrent_activation?: string;
  implementation?: number;
}

export type GRUCellSerialization = BaseSerialization<'GRUCell', GRUCellConfig>;

export interface GRULayerConfig extends SimpleRNNLayerConfig {
  recurrent_activation?: ActivationIdentifier;
  implementation?: number;
}

export type GRULayerSerialization =
    BaseLayerSerialization<'GRU', GRULayerConfig>;

export interface LSTMCellConfig extends SimpleRNNCellConfig {
  recurrent_activation?: ActivationIdentifier;
  unit_forget_bias?: boolean;
  implementation?: number;
}

export type LSTMCellSerialization =
    BaseSerialization<'LSTMCell', LSTMCellConfig>;

export interface LSTMLayerConfig extends SimpleRNNLayerConfig {
  recurrent_activation?: ActivationIdentifier;
  unit_forget_bias?: boolean;
  implementation?: number;
}
export type LSTMLayerSerialization =
    BaseLayerSerialization<'LSTM', LSTMLayerConfig>;

export interface StackedRNNCellsConfig extends LayerConfig {
  // TODO(soergel): consider whether we can avoid improperly mixing
  // Simple / LSTM / GRU cells here and in the above Layer serializations.
  cells: RNNCellSerialization[];
}

export type StackedRNNCellsSerialization =
    BaseSerialization<'StackedRNNCells', StackedRNNCellsConfig>;

export type RNNCellSerialization = SimpleRNNCellSerialization|
    GRUCellSerialization|LSTMCellSerialization|StackedRNNCellsSerialization;

export type RecurrentLayerSerialization =
    SimpleRNNLayerSerialization|LSTMLayerSerialization|GRULayerSerialization;
