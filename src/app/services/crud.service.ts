import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestoreService: AngularFirestore) {}

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      take(1),
      map((value: DocumentReference) => value.id),
    );
  }

  public getObjectByRef(collectionName: string, id: string): Observable<any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(id)
      .get()
      .pipe(
        map((doc) => doc.data()),
        take(1),
      );
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }

  public findField<T>(collectionName: string, nameField: string, valueField: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where(nameField, '==', valueField);
      })
      .snapshotChanges()
      .pipe(
        map(
          (actions) =>
            actions.map((reference) => {
              const data: any = reference.payload.doc.data();
              const { id } = reference.payload.doc;
              return { id, ...data } as T;
            }),
          take(1),
        ),
      );
  }

  public updateObject(collectionName: string, id: string, data: {}, merge: boolean): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).set(data, { merge })).pipe(take(1));
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }

  public handleObjectByRef<T>(collectionName: string, id: string): Observable<any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((ref) => {
          const data: any = ref.payload.data();
          return { id, ...data };
        }),
      );
  }
}
