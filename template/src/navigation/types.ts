import React from 'react';

export type Screen<T> = {
  readonly name: T;
  readonly component: React.FC<any>;
}
