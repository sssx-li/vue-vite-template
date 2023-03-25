import { Component } from 'vue';
import type { IFilters } from '../src/filters/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: IFilters;
  }
}
