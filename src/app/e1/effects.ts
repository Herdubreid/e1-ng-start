import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { E1Actions, E1ActionTypes } from 'e1-service';
import { of as ObservableOf } from 'rxjs/observable/of';
import { tap, switchMap } from 'rxjs/operators';

import { AppActions, ActionTypes } from '../store/actions';

/**
 * E1 Effects Service
 */

@Injectable()
export class E1EffectsService {
    @Effect({ dispatch: false })
    signOn$ = this.actions$
        .pipe(
            ofType<E1Actions.AuthResponseAction>(E1ActionTypes.AUTH_RESPONSE),
            tap(authResponse => {
                /** TODO: Respond to successful sign-on */
                console.log('Signed-on:', authResponse);
            })
        );
    @Effect()
    reset$ = this.actions$
        .pipe(
            ofType<AppActions.ResetAction>(ActionTypes.RESET),
            switchMap(() => ObservableOf(new E1Actions.ResetAction('sign-out')))
        );
    constructor(
        private actions$: Actions
    ) { }
}
