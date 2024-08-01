import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartApiService {
  private readonly http = inject(HttpClient);

  public getProcessorInfo(): Observable<ProcessorInformation> {
    return this.http.get<ProcessorInformation>('https://localhost:7043/api/part/processor');
  }

  public getMemoryInfo(): Observable<MemoryInformation> {
    return this.http.get<MemoryInformation>('https://localhost:7043/api/part/memory');
  }

  public getLiveProcessorUsage() {}
}

export interface ProcessorInformation {
  name: string;
  coreCount: number;
  logicalProcessorCount: number;
  maxClockSpeed: number;
  l2CacheSize: number;
  l3CacheSize: number;
}

export interface MemoryInformation {
  totalCapacity: number;
  voltage: number;
  clockSpeed: number;
}
