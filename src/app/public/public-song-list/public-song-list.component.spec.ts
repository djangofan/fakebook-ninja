import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PublicSongListComponent } from './public-song-list.component';
import { SongsService } from 'src/app/songs/songs.service';

describe('PublicSongsListComponent', () => {
  let component: PublicSongListComponent;
  let fixture: ComponentFixture<PublicSongListComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const activatedRouteStub = () => ({});
    const songServiceStub = () => ({
      songsChanged: { subscribe: f => f({}) },
      getSongs: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PublicSongListComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: SongsService, useFactory: songServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PublicSongListComponent);
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
