import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable()
export class LightConfigService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/light-config';
  private _config = signal<boolean[][]>([]);

  constructor() {
    this.createNewConfig(100, 100);
  }

  public get config() {
    return this._config.asReadonly();
  }

  public createNewConfig(length: number, width: number) {
    const config: boolean[][] = [];

    for (let y = 0; y < length; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row.push(false);
      }
      config.push(row);
    }

    this._config.set(config);
  }

  public performInstruction(
    instruction: string,
    sourceX: number,
    sourceY: number,
    destinationX: number,
    destinationY: number
  ) {
    const body = {
      config: this._config(),
      instruction,
      sourceX,
      sourceY,
      destinationX,
      destinationY,
    };

    this.http.post<boolean[][]>(this.baseUrl, body).subscribe(this._config.set);
  }
}
