import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesStore } from '../../store/movies.store';
import { lastValueFrom, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-movie',
  imports: [ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
  providers: [MoviesStore],
})
export class AddMovieComponent implements OnInit {
  private latestMovieId: number;
  public addMovieForm = new FormGroup<{
    movieName: FormControl<string>;
  }>({
    movieName: new FormControl('', Validators.required),
  });

  private get movieNameControl(): AbstractControl<string> {
    return this.addMovieForm?.get('movieName');
  }

  constructor(
    private readonly moviesStore: MoviesStore,
    private destroyRef: DestroyRef
  ) {
    this.destroyRef = inject(DestroyRef);
  }

  ngOnInit(): void {
    this.moviesStore?.latestMovieId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((latestMovieId) => {
        this.latestMovieId = latestMovieId;
      });
  }

  public addMovie(): void {
    this.moviesStore.addMovie({
      id: this.latestMovieId,
      title: this.movieNameControl?.value,
      year: 2025,
      rating: 5,
    });
  }
}
