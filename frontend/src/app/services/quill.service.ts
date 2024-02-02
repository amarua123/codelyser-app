import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root'
})
export class QuillService {
  public createEditor(selector: string): Quill {
    return new Quill(selector, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{header: '1'}, {header: '2'}, {header: [3, 4, 5, 6]}, {font:[]}],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike'],
          [{list:'ordered'}, {list:'bullet'}],
          ['image'],
          [{script: 'sub'}, {script: 'super'}],
          ['code-block'],
          [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}]
      ],
      },
    });
  }
}