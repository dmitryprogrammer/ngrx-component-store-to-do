import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
}

export interface IMoviesStore {
  movies: Movie[];
}

@Injectable()
export class MoviesStore extends ComponentStore<IMoviesStore> {
  constructor() {
    super({
      movies: [],
    });
  }

  readonly movies$: Observable<Movie[]> = this.select(
    ({ movies }: IMoviesStore) => movies
  );
}
