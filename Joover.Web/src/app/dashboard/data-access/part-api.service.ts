import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartApiService {
  private readonly http = inject(HttpClient);

  public getMemoryInfo() {
    return this.http.get<MemoryInformation>('https://localhost:7043/api/part/memory');
  }

  public getProcessorInfo() {
    return this.http.get<ProcessorInformation>('https://localhost:7043/api/part/processor');
  }
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
