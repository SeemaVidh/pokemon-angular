import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { pokemonReducer } from '../../store/reducers/pokemon.reducer';
import { loadPokemonDetail } from '../../store/actions/pokemon.actions';
import { AppState } from '../../store/app.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent],
      imports: [
        StoreModule.forRoot({ pokemon: pokemonReducer }),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPokemonDetail action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadPokemonDetail({ id: component.currentPokemonId }));
  });

  it('should select the correct tab', () => {
    component.selectTab('evolution');
    expect(component.selectedTab).toBe('evolution');
  });

  it('should navigate back to the home page', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
