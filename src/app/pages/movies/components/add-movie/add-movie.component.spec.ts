import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';

import { DestroyRef } from '@angular/core';
import { MoviesStore } from '../../store/movies.store';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let moviesStore: MoviesStore;
  let destroyRef: DestroyRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      providers: [MoviesStore, DestroyRef],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    moviesStore = TestBed.inject(MoviesStore);
    destroyRef = TestBed.inject(DestroyRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize latestMovieId', () => {
    spyOn(moviesStore.latestMovieId$, 'pipe').and.returnValue(of(1));
    component.ngOnInit();
    expect(component.latestMovieId).toBe(1);
  });

  it('should add movie', () => {
    spyOn(moviesStore, 'addMovie');
    component.addMovie();
    expect(moviesStore.addMovie).toHaveBeenCalledWith({
      id: component.latestMovieId,
      title: component.movieNameControl.value,
      year: 2025,
      rating: 5,
    });
  });
});
