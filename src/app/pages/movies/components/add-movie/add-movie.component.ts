import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesStore } from '../../store/movies.store';
import { lastValueFrom } from 'rxjs';

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

  constructor(private readonly moviesStore: MoviesStore) {}

  async ngOnInit(): Promise<void> {
    this.latestMovieId = await lastValueFrom(this.moviesStore?.latestMovieId$);
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
