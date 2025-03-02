import { TestBed } from '@angular/core/testing';
import { Movie, MoviesStore } from './movies.store';

describe('MoviesStore', () => {
  let moviesStore: MoviesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesStore],
    });

    moviesStore = TestBed.inject(MoviesStore);
  });

  it('should create', () => {
    expect(moviesStore).toBeTruthy();
  });

  it('should initialize movies', () => {
    expect(moviesStore.movies$).toBeTruthy();
  });

  it('should initialize latestMovieId', () => {
    expect(moviesStore.latestMovieId$).toBeTruthy();
  });

  it('should add movie', () => {
    const movie: Movie = {
      id: 1,
      title: 'Test Movie',
      year: 2025,
      rating: 5,
    };

    moviesStore.addMovie(movie);

    moviesStore.movies$.subscribe((movies) => {
      expect(movies).toContain(movie);
    });
  });
});
