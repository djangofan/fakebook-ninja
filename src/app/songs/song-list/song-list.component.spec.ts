import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../songs.service';
import { SongListComponent } from './song-list.component';

describe('SongsListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const activatedRouteStub = () => ({});
    const songServiceStub = () => ({
      songsChanged: { subscribe: f => f({}) },
      getSongs: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SongListComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: SongsService, useFactory: songServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls from getSongs', () => {
      const songServiceStub: SongsService = fixture.debugElement.injector.get(
        SongsService
      );
      spyOn(songServiceStub, 'getSongs').and.callThrough();
      component.ngOnInit();
      expect(songServiceStub.getSongs).toHaveBeenCalled();
    });
  });

  describe('onNewSong', () => {
    it('makes expected calls from navigate', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onNewSong();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
