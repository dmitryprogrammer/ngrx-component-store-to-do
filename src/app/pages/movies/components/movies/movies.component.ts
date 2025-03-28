import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Movie, MoviesStore } from '../../store/movies.store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddMovieComponent } from '../add-movie/add-movie.component';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, AddMovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MoviesStore],
})
export class MoviesComponent {
  movies$: Observable<Movie[]>;
  constructor(private readonly moviesStore: MoviesStore) {
    this.movies$ = this.moviesStore?.movies$;
  }
}
